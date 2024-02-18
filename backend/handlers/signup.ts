import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import {
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
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
    const { name, email, password } = JSON.parse(event.body || "{}");

    await cognitoClient.send(
      new AdminCreateUserCommand({
        UserPoolId: process.env.USER_POOL,
        Username: email,
        MessageAction: "SUPPRESS",
        UserAttributes: [
          {
            Name: "name",
            Value: name,
          },
          {
            Name: "email",
            Value: email,
          },
          {
            Name: "email_verified",
            Value: "true",
          },
        ],
      })
    );

    await cognitoClient.send(
      new AdminSetUserPasswordCommand({
        UserPoolId: process.env.USER_POOL,
        Username: email,
        Permanent: true,
        Password: password,
      })
    );

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
    return error("Unable to signup");
  }
};
