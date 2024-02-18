import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import {
  AdminGetUserCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

import { error } from "../utils/request-error.js";
import { success } from "../utils/request-success.js";
import { normalizeUserAttributes } from "../utils/normalize-users-attrs.js";

const cognitoClient = new CognitoIdentityProviderClient();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { authorizer } = event.requestContext;

    const response = await cognitoClient.send(
      new AdminGetUserCommand({
        UserPoolId: process.env.USER_POOL,
        Username: authorizer.jwt.claims.username,
      })
    );

    return success({
      UserAttributes: normalizeUserAttributes(response.UserAttributes),
      Username: response.Username,
    });
  } catch (err) {
    console.error(err);
    return error("Unable to retrieve the user");
  }
};
