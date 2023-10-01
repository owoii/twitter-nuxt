import { NitroFetchOptions } from "nitropack";
export default (url: string, options: NitroFetchOptions<string> = {}) => {
  const { useAuthToken } = useAuth();
  return $fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${useAuthToken().value}`,
    },
  });
};
