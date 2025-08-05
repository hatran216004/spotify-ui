export type SuccessResponseApi<T> = {
  status: string;
  data: T;
};

export type ErrorResponseApi = {
  message: string;
  staus: string;
  statusCode: number;
};
