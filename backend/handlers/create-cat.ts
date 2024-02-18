import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { nanoid } from "nanoid";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

import { error } from "../utils/request-error.js";
import { success } from "../utils/request-success.js";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { authorizer } = event.requestContext;
    const { name, breed, age, description, photo } = JSON.parse(
      event.body || "{}"
    );

    const id = nanoid();

    await docClient.send(
      new PutCommand({
        TableName: "react-aws-cats",
        Item: {
          id,
          owner_email: authorizer.jwt.claims.username,
          name,
          breed,
          age,
          description,
          photo,
        },
      })
    );

    const response = await docClient.send(
      new QueryCommand({
        TableName: "react-aws-cats",
        KeyConditionExpression: "id = :id AND owner_email = :owner_email",
        ExpressionAttributeValues: {
          ":id": id,
          ":owner_email": authorizer.jwt.claims.username,
        },
      })
    );

    return success(response.Items[0]);
  } catch (err) {
    console.error(err);
    return error("Unable to create a cat");
  }
};
