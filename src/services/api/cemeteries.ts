import { CemeteryInterface } from '@type/cemeteries';
import { CemeteryInterface } from '@type//cemeteries.ts';
import api from '@api/apiService.ts';

type CemeteryServerInterface = {
  cemetery: CemeteryInterface;
};

export async function fetchCemeteries() {
  try {
    const response = await api.get('cemeteries?include_all'); // Adjust the endpoint as needed

    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function fetchCemetery(id: number, withAddress: boolean = false) {
  try {
    const response = await api.get(
      `cemeteries/${id}${withAddress ? '?include_address=true' : ''}`
    ); // Adjust the endpoint as needed

    return response.data;
  } catch (error) {
    throw error;
  }
}

const parseCemeteryData = (data: CemeteryInterface) => {
  console.log(
    'parseCemeteryData >> data.address_attributes: ',
    data.address_attributes
  );
  if (data.address_attributes) {
    const hasAddressData = Object.values(data.address_attributes).some(
      value => value
    );

    if (!hasAddressData) {
      const { address_attributes, ...restData } = data;
      return restData;
    }
  }
  return data;
};
export async function saveCemetery(data: CemeteryServerInterface) {
  const {
    cemetery: { id },
  } = data;
  try {
    const method = id ? 'put' : 'post';
    data.cemetery = parseCemeteryData(data.cemetery);

    const url = `cemeteries${id ? `/${id}` : ''}`;
    const response = await api[method](url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteCemetery(id: number) {
  try {
    const response = await api.delete(`cemeteries/${id}`);

    if (response.status === 204) {
      return 'ok';
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}
