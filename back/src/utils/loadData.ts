import { readFileSync } from 'fs';

export const loadRequestCoworkings = () => {
  const data = readFileSync('src/utils/loadRequestCoworkings.json', 'utf8');
  const parseData = JSON.parse(data);
  return parseData;
};

export const loadRequestCompanies = () => {
  const data = readFileSync('src/utils/loadRequestCompanies.json', 'utf8');
  const parseData = JSON.parse(data);
  return parseData;
};

export const loadEmployees = () => {
  const data = readFileSync('src/utils/loadEmployees.json', 'utf8');
  const parseData = JSON.parse(data);
  return parseData;
};

export const loadImagesCoworkings = () => {
  const data = readFileSync('src/utils/loadImagesCoworkings.json', 'utf8');
  const parseData = JSON.parse(data);
  return parseData;
};

export const loadReceptionists = () => {
  const data = readFileSync('src/utils/loadReceptionists.json', 'utf8');
  const parseData = JSON.parse(data);
  return parseData;
};

export const loadCountries = () => {
  const countries = readFileSync('src/utils/countries.json', 'utf8');
  return JSON.parse(countries);
};

export const loadStates = () => {
  const states = readFileSync('src/utils/states.json', 'utf8');
  return JSON.parse(states);
};

export const loadCities = () => {
  const cities = readFileSync('src/utils/cities.json', 'utf8');
  return JSON.parse(cities);
};

export const loadDataCoworkings = () => {
  const data = readFileSync('src/utils/preloadCoworkings.json', 'utf8');
  const parseData = JSON.parse(data);
  return parseData;
};

export const loadDataCompanies = () => {
  const data = readFileSync('src/utils/preloadCompanies.json', 'utf8');
  const parseData = JSON.parse(data);
  return parseData;
};

export const loadDataRequestCompany = () => {
  const data = readFileSync('src/utils/preloadRequestCompany.json', 'utf8');
  const parseData = JSON.parse(data);
  return parseData;
};

export const loadDataAmenities = () => {
  const data = readFileSync('src/utils/preloadAmenities.json', 'utf8');
  const parseData = JSON.parse(data);
  return parseData;
};
