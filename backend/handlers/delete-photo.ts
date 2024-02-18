import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

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
            TableName: "react-aws-cats",
            Key: {
              id: catId,
              owner_email: authorizer.jwt.claims.username,
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
      } catch (err) {
        console.error(err);
      }
    }
    return success();
  } catch (err) {
    console.error(err);
    return error("Unable to delete the cat photo");
  }
};
