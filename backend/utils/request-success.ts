export const success = (data?: any, statusCode: number = 200) => ({
  statusCode,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    status: "success",
    data,
  }),
});
