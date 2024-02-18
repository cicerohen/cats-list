import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

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
    const { id } = event.pathParameters;
    const { authorizer } = event.requestContext;

    const response = await docClient.send(
      new DeleteCommand({
        TableName: "react-aws-cats",
        Key: {
          id: id,
          owner_email: authorizer.jwt.claims.username,
        },
        ReturnValues: "ALL_OLD",
      })
    );
    return success(response.Attributes);
  } catch (err) {
    console.error(err);
    return error("Unable to delete the cat");
  }
};
