export const request = async (url, type, data) => {
  const response = await fetch(url, {
    method: type,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};
