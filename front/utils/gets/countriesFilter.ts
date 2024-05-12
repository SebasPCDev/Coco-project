const urlBase = process.env.NEXT_PUBLIC_API_URL;
const getCountriesfilter = async () => {
  const url = `${urlBase}/coworkings/countries`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
};

export default getCountriesfilter;
