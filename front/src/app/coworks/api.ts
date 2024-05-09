
export const fetchCountries = async (authToken: string): Promise<any> => {
  const response = await fetch('https://www.universal-tutorial.com/api/countries', {
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  const latamCountries = [
    'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Costa Rica', 
    'Cuba', 'Ecuador', 'El Salvador', 'Guatemala', 'Honduras', 'México', 
    'Nicaragua', 'Panamá', 'Paraguay', 'Peru', 'Puerto Rico', 'República Dominicana', 
    'Uruguay', 'Venezuela'
  ];

  const filteredData = data.filter((country: any) => latamCountries.includes(country.country_name));

  return filteredData;
};


  
  export const generateAuthToken = async (): Promise<string> => {
    const email = 'hcguitarras@gmail.com';
    const apiToken = 'xH1FBnjiQmP6ZHrfq0alQAQ-WDAb7MIuEuNX3dLUHc-2QLmd1MpwmOMMwih_2x87vvs';
  
    const response = await fetch('https://www.universal-tutorial.com/api/getaccesstoken', {
      headers: {
        'Accept': 'application/json',
        'api-token': apiToken,
        'user-email': email
      }
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    return data.auth_token;
  };
  
  export const fetchStates = async (selectedCountry: string, authToken: string): Promise<any> => {
    const response = await fetch(`https://www.universal-tutorial.com/api/states/${selectedCountry}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json'
      }
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return await response.json();
  };
  
  export const fetchCities = async (selectedState: string, authToken: string): Promise<any> => {
    const response = await fetch(`https://www.universal-tutorial.com/api/cities/${selectedState}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json'
      }
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return await response.json();
  };
  