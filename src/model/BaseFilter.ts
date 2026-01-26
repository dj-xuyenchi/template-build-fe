export interface BaseFilter {
  pageSize: number | 5;
  pageNumber: number | 1;
  totalData: number | 0;
  keyword?: string;
}
export const ALL = "ALL";

export type ConvertArrayParam = string | number | number[];

export const convertArrayParam = (input: ConvertArrayParam[]) => {
  if (!input || input.length === 0 || input.includes(ALL)) {
    return null;
  }
  return input.join(",");
};
