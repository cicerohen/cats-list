import path from "path";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";
import { parse } from "lambda-multipart-parser";

import { error } from "../utils/request-error.js";
import { success } from "../utils/request-success.js";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

const s3Client = new S3Client({});

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { authorizer } = event.requestContext;
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
            TableName: "react-aws-cats",
            Key: {
              id: catId,
              owner_email: authorizer.jwt.claims.username,
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
      } catch (err) {
        console.error(err);
      }
    }

    return success(photo);
  } catch (err) {
    console.error(err);
    return error("Unable to update the cat photo");
  }
};
