export const fetch_data = async <T>(
  url: string,
  query?: string
): Promise<T> => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}${url}?api_key=${
      process.env.REACT_APP_API_KEY
    }${query || ""}`
  );

  const data = await response.json();
  return data;
};
