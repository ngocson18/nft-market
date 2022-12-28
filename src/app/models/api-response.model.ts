export interface APIResponseModel<T> {
  code: number;
  message: string;
  data: T;
}
