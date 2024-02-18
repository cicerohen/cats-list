export const error = (
  message: string = "Something wrong happened",
  statusCode: number = 500
) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    error: {
      code: statusCode,
      type: "ApiError",
      message,
    },
  }),
});
