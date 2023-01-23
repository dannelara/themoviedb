export const fetch_data = async <T>(url: string): Promise<T> => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}${url}?api_key=${process.env.REACT_APP_API_KEY}`
  );

  console.log(response);
  const jsonData = await response.json();
  return jsonData;
};

// export const generateToken = async () => {
//   const response = await fetch(
//     `${process.env.REACT_APP_API_BASE_URL}/authentication/token/new?api_key=${process.env.REACT_APP_API_KEY}`
//   );
//   if (response.status === 200) {
//     const data = await response.json();

//     localStorage.setItem("token", data.request_token);
//   }
// };
