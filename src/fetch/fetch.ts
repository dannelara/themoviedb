export const fetch_data = async <T>(url: string): Promise<T> => {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${url}`);

  const jsonData = await response.json();
  return jsonData;
};
