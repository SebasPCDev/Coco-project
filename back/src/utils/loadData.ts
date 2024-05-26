import { readFileSync } from 'fs';

export const loadRequestCoworkings = () => {
  const data = readFileSync('src/utils/loadRequestCoworkings.json', 'utf8');
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
