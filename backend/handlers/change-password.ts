import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  ChangePasswordCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

import { error } from "../utils/request-error.js";
import { success } from "../utils/request-success.js";

const cognitoClient = new CognitoIdentityProviderClient();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const { headers } = event;
    const { password, newPassword } = JSON.parse(event.body || "{}");
    const accessToken = headers["authorization"].split(" ")[1];

    await cognitoClient.send(
      new ChangePasswordCommand({
        AccessToken: accessToken,
        PreviousPassword: password,
        ProposedPassword: newPassword,
      })
    );

    return success({}, 201);
  } catch (err) {
    console.error(err);
    return error("Unable to change password", 422);
  }
};
