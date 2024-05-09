const urlBase = process.env.NEXT_PUBLIC_API_URL;
const GetCoworkings = async () => {
  const url = `${urlBase}/coworkings`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  return data;
};

export default GetCoworkings;
