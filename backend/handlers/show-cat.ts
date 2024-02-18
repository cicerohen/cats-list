import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

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

    const response = await docClient.send(
      new QueryCommand({
        TableName: "react-aws-cats",
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
          ":id": id,
        },
      })
    );

    return success(response.Items[0]);
  } catch (err) {
    console.error(err);
    return error("Unable to retrieve the cat");
  }
};
