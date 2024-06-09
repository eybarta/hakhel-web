import { CemeteryInterface } from '@type//cemeteries.ts';
import api from '@api/apiService.ts';

export async function fetchCemeteries() {
  try {
    console.log('fetchCemeteries<<<');
    const response = await api.get('cemeteries'); // Adjust the endpoint as needed
    return response.data;
  } catch (error) {
    console.error('error: ', error);
    throw error;
  }
}

type CemeteryServerInterface = {
  cemetery: CemeteryInterface;
};

export async function saveCemetery(data: CemeteryServerInterface) {
  console.log('saveCemetery: ', data);
  const {
    cemetery: { id },
  } = data;
  try {
    const method = id ? 'put' : 'post';
    const url = `cemeteries${id ? `/${id}` : ''}`;
    const response = await api[method](url, data);
    return response.data;
  } catch (error) {
    console.error('error: ', error);
    throw error;
  }
}

export async function deleteCemetery(id: number) {
  try {
    const response = await api.delete(`cemeteries/${id}`);
    console.log('DELETE response: ', response);
    if (response.status === 204) {
      return 'ok';
    }
    return response.data;
  } catch (error) {
    console.error('error: ', error);
    throw error;
  }
}
