import { readFileSync } from 'fs';

export const loadData = () => {
  const data = readFileSync('src/utils/preloadCoworkings.json', 'utf8');
  const parseData = JSON.parse(data);
  return parseData;
};
