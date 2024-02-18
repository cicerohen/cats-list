import { APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

import { error } from "../utils/request-error.js";
import { success } from "../utils/request-success.js";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const response = await docClient.send(
      new ScanCommand({
        TableName: "react-aws-cats",
      })
    );

    return success(response.Items);
  } catch (err) {
    console.error(err);
    return error("Unable to list the cats");
  }
};
