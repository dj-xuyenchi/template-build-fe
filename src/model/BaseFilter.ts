import { DefaultOptionType } from "antd/es/select";

export interface BaseFilter {
  pageSize: number | 10;
  pageNumber: number | 1;
  totalData: number | 0;
  keyword?: string;
}

export const convertToOptionAll = (
  params: string[],
  options: DefaultOptionType[],
  optionAllValue: string | null,
) => {
  console.error(params);
  console.error(options);
  console.error(optionAllValue);

  if (!params || params.length === 0) {
    return true;
  }
  const validValues = options
    .map((opt) => opt.value)
    .filter((value) => value !== optionAllValue);
  console.error("22", validValues);

  return validValues.length == params.length;
};
