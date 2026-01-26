export interface BaseResponse<T> {
  data: T;
  message: string;
  code: string;
  errorCode: string;
  newToken: string;
}
