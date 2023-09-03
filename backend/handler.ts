import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import path from "path";
import { parse } from "lambda-multipart-parser";
import { nanoid } from "nanoid";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

const s3Client = new S3Client({});

const error = (
  message: string = "Something wrong happened",
  statusCode: number = 500
) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    error: {
      code: statusCode,
      type: "ApiError",
      message,
    },
  }),
});

const success = (data?: any, statusCode: number = 200) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    status: "success",
    data,
  }),
});

export const createCat = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { name, breed, age, description, photo } = JSON.parse(
      event.body || "{}"
    );

    const id = nanoid();

    const putCommand = new PutCommand({
      TableName: "Cats",
      Item: {
        id,
        name,
        breed,
        age,
        description,
        photo,
      },
    });

    await docClient.send(putCommand);

    const getCommand = new GetCommand({
      TableName: "Cats",
      Key: {
        id: id,
      },
    });

    const response = await docClient.send(getCommand);

    return success(response.Item);
  } catch (err) {
    return error("Error when trying to add a cat");
  }
};

export const listCats = async (): Promise<APIGatewayProxyResult> => {
  try {
    const response = await docClient.send(
      new ScanCommand({
        TableName: "Cats",
      })
    );

    return success(response.Items);
  } catch (err) {
    return error("Error retrieving the list of cats");
  }
};

export const showCat = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters;

    const command = new GetCommand({
      TableName: "Cats",
      Key: {
        id: id,
      },
    });

    const response = await docClient.send(command);

    return success(response.Item);
  } catch (err) {
    return error("Error when trying to retrieve the cat");
  }
};

export const editCat = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters;
    const { name, breed, age, description } = JSON.parse(event.body ?? "{}");

    const response = await docClient.send(
      new UpdateCommand({
        TableName: "Cats",
        Key: {
          id,
        },
        UpdateExpression:
          "set #name = :name, breed = :breed, age = :age, description= :description",
        ConditionExpression: "id = :id",
        ExpressionAttributeValues: {
          ":id": id,
          ":name": name,
          ":breed": breed,
          ":age": age,
          ":description": description,
        },
        ExpressionAttributeNames: {
          "#name": "name",
        },
        ReturnValues: "ALL_NEW",
      })
    );

    return success(response.Attributes);
  } catch (err) {
    return error("Error when trying to update the cat");
  }
};

export const deleteCat = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { id } = event.pathParameters;

    const command = new DeleteCommand({
      TableName: "Cats",
      Key: {
        id: id,
      },
      ReturnValues: "ALL_OLD",
    });

    const response = await docClient.send(command);
    return success(response.Attributes);
  } catch (err) {
    return error("Error when trying to delete the cat");
  }
};

export const uploadPhoto = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const body = await parse(event);
    const file = body.files[0];
    const catId = body.catId;

    if (!file) {
      throw new Error("No files to upload");
    }

    if (file.content.length > 614400) {
      throw new Error("File is too large");
    }

    const ext = path.extname(file.filename);
    const key = `${nanoid()}${ext}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        Body: file.content,
        ContentType: file.contentType,
        Metadata: {
          catId,
        },
      })
    );

    const photo = {
      url: `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${key}`,
      key,
    };

    if (catId) {
      try {
        await docClient.send(
          new UpdateCommand({
            TableName: "Cats",
            Key: {
              id: catId,
            },
            UpdateExpression: "set photo = :photo",
            ConditionExpression: "id = :id",
            ExpressionAttributeValues: {
              ":id": catId,
              ":photo": photo,
            },
            ReturnValues: "ALL_NEW",
          })
        );
      } catch (_) {}
    }

    return success(photo);
  } catch (err) {
    return error("Error when trying to change photo");
  }
};

export const deletePhoto = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { key } = event.pathParameters;
    const { catId } = event.queryStringParameters || {};

    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: key,
      })
    );

    if (catId) {
      try {
        await docClient.send(
          new UpdateCommand({
            TableName: "Cats",
            Key: {
              id: catId,
            },
            UpdateExpression: "set photo = :photo",
            ConditionExpression: "id = :id",
            ExpressionAttributeValues: {
              ":id": catId,
              ":photo": {
                key: "",
                url: "",
              },
            },
            ReturnValues: "ALL_NEW",
          })
        );
      } catch (_) {}
    }
    return success();
  } catch (err) {
    return error("Error when trying to delete photo");
  }
};

export const listBreeds = async (): Promise<APIGatewayProxyResult> => {
  return success([
    {
      id: 1,
      name: "Abyssinian",
    },
    {
      id: 2,
      name: "Aegean",
    },
    {
      id: 3,
      name: "American Curl",
    },
    {
      id: 4,
      name: "American Bobtail",
    },
    {
      id: 5,
      name: "American Shorthair",
    },
    {
      id: 6,
      name: "American Wirehair",
    },
    {
      id: 7,
      name: "Arabian Mau",
    },
    {
      id: 8,
      name: "Australian Mist",
    },
    {
      id: 9,
      name: "Asian",
    },
    {
      id: 10,
      name: "Asian Semi-longhair",
    },
    {
      id: 11,
      name: "Balinese",
    },
    {
      id: 12,
      name: "Bambino",
    },
    {
      id: 13,
      name: "Bengal",
    },
    {
      id: 14,
      name: "Birman",
    },
    {
      id: 15,
      name: "Bombay",
    },
    {
      id: 16,
      name: "Brazilian Shorthair",
    },
    {
      id: 17,
      name: "British Semi-longhair",
    },
    {
      id: 18,
      name: "British Shorthair",
    },
    {
      id: 19,
      name: "British Longhair",
    },
    {
      id: 20,
      name: "Burmese",
    },
    {
      id: 21,
      name: "Burmilla",
    },
    {
      id: 22,
      name: "California Spangled",
    },
    {
      id: 23,
      name: "Chantilly-Tiffany",
    },
    {
      id: 24,
      name: "Chartreux",
    },
    {
      id: 25,
      name: "Chausie",
    },
    {
      id: 26,
      name: "Cheetoh",
    },
    {
      id: 27,
      name: "Colorpoint Shorthair",
    },
    {
      id: 28,
      name: "Cornish Rex",
    },
    {
      id: 29,
      name: "Cymric",
    },
    {
      id: 30,
      name: "Cyprus",
    },
    {
      id: 31,
      name: "Devon Rex",
    },
    {
      id: 32,
      name: "Donskoy",
    },
    {
      id: 33,
      name: "Dragon Li",
    },
    {
      id: 34,
      name: "Dwarf cat",
    },
    {
      id: 35,
      name: "Egyptian Mau",
    },
    {
      id: 36,
      name: "European Shorthair",
    },
    {
      id: 37,
      name: "Exotic Shorthair",
    },
    {
      id: 38,
      name: "Foldex",
    },
    {
      id: 39,
      name: "German Rex",
    },
    {
      id: 40,
      name: "Havana Brown",
    },
    {
      id: 41,
      name: "Highlander",
    },
    {
      id: 42,
      name: "Himalayan",
    },
    {
      id: 43,
      name: "Japanese Bobtail",
    },
    {
      id: 44,
      name: "Javanese",
    },
    {
      id: 45,
      name: "Karelian Bobtail",
    },
    {
      id: 46,
      name: "Khao Manee",
    },
    {
      id: 47,
      name: "Korat",
    },
    {
      id: 48,
      name: "Korean Bobtail",
    },
    {
      id: 49,
      name: "Korn Ja",
    },
    {
      id: 50,
      name: "Kurilian Bobtail",
    },
    {
      id: 51,
      name: "LaPerm",
    },
    {
      id: 52,
      name: "Lykoi",
    },
    {
      id: 53,
      name: "Maine Coon",
    },
    {
      id: 54,
      name: "Manx",
    },
    {
      id: 55,
      name: "Mekong Bobtail",
    },
    {
      id: 56,
      name: "Minskin",
    },
    {
      id: 57,
      name: "Munchkin",
    },
    {
      id: 58,
      name: "Nebelung",
    },
    {
      id: 59,
      name: "Napoleon",
    },
    {
      id: 60,
      name: "Norwegian Forest cat",
    },
    {
      id: 61,
      name: "Ocicat",
    },
    {
      id: 62,
      name: "Ojos Azules",
    },
    {
      id: 63,
      name: "Oregon Rex",
    },
    {
      id: 64,
      name: "Oriental Bicolor",
    },
    {
      id: 65,
      name: "Oriental Shorthair",
    },
    {
      id: 66,
      name: "Oriental Longhair",
    },
    {
      id: 67,
      name: "PerFold",
    },
    {
      id: 68,
      name: "Persian (Modern Persian Cat)",
    },
    {
      id: 69,
      name: "Persian (Traditional Persian Cat)",
    },
    {
      id: 70,
      name: "Peterbald",
    },
    {
      id: 71,
      name: "Pixie-bob",
    },
    {
      id: 72,
      name: "Raas",
    },
    {
      id: 73,
      name: "Ragamuffin",
    },
    {
      id: 74,
      name: "Ragdoll",
    },
    {
      id: 75,
      name: "Russian Blue",
    },
    {
      id: 76,
      name: "Russian White, Black and Tabby",
    },
    {
      id: 77,
      name: "Sam Sawet",
    },
    {
      id: 78,
      name: "Savannah",
    },
    {
      id: 79,
      name: "Scottish Fold",
    },
    {
      id: 80,
      name: "Selkirk Rex",
    },
    {
      id: 81,
      name: "Serengeti",
    },
    {
      id: 82,
      name: "Serrade petit",
    },
    {
      id: 83,
      name: "Siamese",
    },
    {
      id: 84,
      name: "Siberian",
    },
    {
      id: 85,
      name: "Singapura",
    },
    {
      id: 86,
      name: "Snowshoe",
    },
    {
      id: 87,
      name: "Sokoke",
    },
    {
      id: 88,
      name: "Somali",
    },
    {
      id: 89,
      name: "Sphynx",
    },
    {
      id: 90,
      name: "Suphalak",
    },
    {
      id: 91,
      name: "Thai",
    },
    {
      id: 92,
      name: "Thai Lilac",
    },
    {
      id: 93,
      name: "Tonkinese",
    },
    {
      id: 94,
      name: "Toyger",
    },
    {
      id: 95,
      name: "Turkish Angora",
    },
    {
      id: 96,
      name: "Turkish Van",
    },
    {
      id: 97,
      name: "Ukrainian Levkoy",
    },
  ]);
};

export const listAges = async () => {
  return success([
    {
      id: 0,
      name: "Kitten(<1 year)",
    },
    {
      id: 1,
      name: "Adult(+1 year)",
    },
    {
      id: 2,
      name: "Senior(+7 years)",
    },
  ]);
};
