import axios from "axios";

const BASE_URL = "http://localhost:4000";
axios.defaults.timeoutErrorMessage = "TIMEOUT";
const httpService = (
  urlParam = "",
  type = "get",
  data = "",
  multipart = false,
  additionalHeaders = {},
  additionalConfig = {}
) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    ...additionalConfig,
  };
  if (additionalHeaders) {
    config.headers = { ...config.headers, ...additionalHeaders };
  }
  if (multipart) config.headers["Content-Type"] = "multipart/form-data";

  config.headers["x-timezone"] =
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (!additionalConfig.cancelToken) config.cancelToken = source.token;

  let url = "";
  url = `${BASE_URL}/${urlParam}`;
  switch (type) {
    case "get": {
      const promise = axios.get(url, config);
      promise.cancel = () => {
        source.cancel("Query was cancelled by React Query");
      };
      return promise;
    }
    case "post":
    case "put":
    case "patch":
      return axios[type](url, data, config);
    case "delete":
      if (data) config.data = data;
      return axios.delete(url, config);
    default: {
      break;
    }
  }
  return null;
};

export default httpService;
