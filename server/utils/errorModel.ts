export const errorModel = (message: string, status: number|string, hasError: boolean) => {
  return {
    data: {},
    message,
    status,
    hasError,
  };
};
