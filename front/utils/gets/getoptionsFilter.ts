const urlBase = process.env.NEXT_PUBLIC_API_URL;

interface IFilterOptions {
  country?: string;
  state?: string;
  city?: string;
}

const getoptions = async ({ filter }: { filter: IFilterOptions }) => {
  const { country, state, city } = filter;

  let url = `${urlBase}/coworkings`;

  if (country) {
    url += `/country/${country}`;
  }

  if (state) {
    url += `/state/${state}`;
  }

  if (city) {
    url += `/city/${city}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export default getoptions;
