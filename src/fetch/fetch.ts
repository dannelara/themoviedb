export const fetch_data = async <T>(
  url: string,
  set_data: React.Dispatch<React.SetStateAction<T>>
) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}${url}?api_key=${process.env.REACT_APP_API_KEY}`
  );

  const jsonData = await response.json();
  set_data(jsonData);
};
