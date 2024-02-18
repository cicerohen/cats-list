import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: {
    removeUndefinedValues: true,
  },
});

import { error } from "../utils/request-error.js";
import { success } from "../utils/request-success.js";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { authorizer } = event.requestContext;
    const { id } = event.pathParameters;
    const { name, breed, age, description } = JSON.parse(event.body ?? "{}");

    const response = await docClient.send(
      new UpdateCommand({
        TableName: "react-aws-cats",
        Key: {
          id,
          owner_email: authorizer.jwt.claims.username,
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
    console.error(err);
    return error("Unable to update the cat");
  }
};
