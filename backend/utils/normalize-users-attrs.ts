import { AttributeType } from "@aws-sdk/client-cognito-identity-provider";

export const normalizeUserAttributes = (userAttributes: AttributeType[] = []) =>
  userAttributes.reduce((acc, curr) => {
    const notAllowedProperties = ["sub", "email_verified"];
    if (!notAllowedProperties.includes(curr.Name as string)) {
      acc[curr.Name as string] = curr.Value;
    }
    return acc;
  }, {});
