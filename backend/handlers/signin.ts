import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  AdminInitiateAuthCommand,
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
    const { email, password } = JSON.parse(event.body || "{}");

    if (!email || !password) {
      return error("Invalid input", 400);
    }

    const response = await cognitoClient.send(
      new AdminInitiateAuthCommand({
        AuthFlow: "ADMIN_NO_SRP_AUTH",
        UserPoolId: process.env.USER_POOL,
        ClientId: process.env.USER_CLIENT,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      })
    );

    const userResponse = await cognitoClient.send(
      new AdminGetUserCommand({
        UserPoolId: process.env.USER_POOL,
        Username: email,
      })
    );

    return success({
      AuthenticationResult: response.AuthenticationResult,
      UserAttributes: normalizeUserAttributes(userResponse.UserAttributes),
      Username: userResponse.Username,
    });
  } catch (err) {
    console.error(err);
    return error("Unable to signin");
  }
};
