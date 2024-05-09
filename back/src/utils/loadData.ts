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
