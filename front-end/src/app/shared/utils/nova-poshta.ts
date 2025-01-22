import { environment } from 'environments/environment.development';

const URL = 'https://api.novaposhta.ua/v2.0/json/';
interface NovaPoshtaReq {
  apiKey: string;
  modelName: string;
  calledMethod: string;
}

export const getAddresses = (city: string) => {
  console.log(city);
  const reqCityAddresses = {
    apiKey: environment.novaPoshta,
    modelName: 'Address',
    calledMethod: 'getSettlements',
    methodProperties: {
      FindByString: city,
    },
  };

  return fetchPostReq(URL, reqCityAddresses);
};

export const getNovaPoshtaDepartment = (cityName: string, ref: string) => {
  const reqDepartments = {
    apiKey: environment.novaPoshta,
    modelName: 'Address',
    calledMethod: 'getWarehouses',
    methodProperties: {
      CityName: cityName,
      SettlementRef: ref,
      // Area: area,
      // RegionDescription: region,
    },
  };

  return fetchPostReq(URL, reqDepartments);
};

export const getNovaPoshtaStreet = (city: string) => {
  const reqStreet = {
    apiKey: environment.novaPoshta,
    modelName: 'Address',
    calledMethod: 'getStreet',
    methodProperties: {
      // FindByString: 'Київ',
      CityRef: 'e7207d1a-4b33-11e4-ab6d-005056801329',
    },
  };

  return fetchPostReq(URL, reqStreet);
};

const fetchPostReq = (url: string, data: NovaPoshtaReq): Promise<any> => {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data),
  });
};
