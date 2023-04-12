const getApiUrl = (endpoint: string) => {
  return `${import.meta.env.VITE_BACKEND_HOST}/api/${endpoint}`;
};

export {getApiUrl};