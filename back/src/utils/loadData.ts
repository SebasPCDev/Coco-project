import { readFileSync } from 'fs';

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

export const loadDataRequest = () => {
  const data = readFileSync('src/utils/preloadRequests.json', 'utf8');
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
