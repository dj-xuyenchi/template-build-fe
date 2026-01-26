import { sexyIndexDefineRouter } from "@/router/sexyIndexDefineRouter";
type Params = Record<string, string | number | boolean>;
export const goPage = (key: string, params?: Params): string => {
  let uri = sexyIndexDefineRouter.find((item) => {
    return item === key;
  });
  if (params) {
    uri += queryString(params);
  }
  console.error(uri);
  return uri || "";
};

const queryString = (params: Params): string => {
  const query = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  return query ? `?${query}` : "";
};
