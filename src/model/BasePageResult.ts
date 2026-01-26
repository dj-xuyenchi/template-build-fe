export interface BasePageResult<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
}
