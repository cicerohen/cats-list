import { APIGatewayProxyResult } from "aws-lambda";

import { success } from "../utils/request-success.js";

export const handler = async (): Promise<APIGatewayProxyResult> => {
  return success([
    {
      id: 0,
      name: "Kitten(<1 year)",
    },
    {
      id: 1,
      name: "Adult(+1 year)",
    },
    {
      id: 2,
      name: "Senior(+7 years)",
    },
  ]);
};
