export default function createObjectOfQueryParams(url: string) {
  const isQueryParams = url.split("?")?.[1];
  if (!isQueryParams) {
    return {};
  }

  const queryObject: { [k: string]: unknown } = {};
  isQueryParams?.split("&").forEach((query) => {
    queryObject[query.split("=")[0]] = query.split("=")[1];
  });
  return queryObject;
}
