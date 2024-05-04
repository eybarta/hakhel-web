import { saveCemetery } from '/src/services/api/deceasedPeople';
import { CemeteryInterface } from '../../types/cemeteries.ts';
import api from '../apiService.ts';

export default async function fetchCemeteries() {
  try {
    const response = await api.get('cemeteries'); // Adjust the endpoint as needed
    return response.data;
  } catch (error) {
    console.error('error: ', error);
    throw error;
  }
}

export async function saveCemetery(data: CemeteryInterface) {
  console.log('saveCemetery: ', data);
  try {
    const response = await api.put('cemeteries', data); // Adjust the endpoint as needed
    console.log('response: ', response);
    return response.data;
  } catch (error) {
    console.error('error: ', error);
    throw error;
  }
}
