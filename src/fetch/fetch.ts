export const fetch_data = async <T>(
  url: string,
  query?: string,
  abortSignal?: AbortSignal
): Promise<T> => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}${url}?api_key=${
      process.env.REACT_APP_API_KEY
    }${query || ""}`,
    {
      signal: abortSignal,
    }
  );

  if (!response.ok) {
    throw new Error("Bad request", {
      cause: response,
    });
  }

  const data = await response.json();
  return data;
};
