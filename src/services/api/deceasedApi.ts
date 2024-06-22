import {
  DeceasedPersonInterface,
  DeceasedPersonServerInterface,
} from '@type/deceasedInterface';
import api from '@api/apiService.ts';

export async function fetchAllDeceased() {
  try {
    const response = await api.get('deceased_people?include_all'); // Adjust the endpoint as needed
    console.log('DECEASED response: ', response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function saveDeceased(
  data: DeceasedPersonServerInterface
): Promise<DeceasedPersonInterface> {
  const {
    deceased_person: { id },
  } = data;
  try {
    const method = id ? 'put' : 'post';
    const url = `deceased_people${id ? `/${id}` : ''}`;
    const response = await api[method](url, data);
    return response.data;
  } catch (error) {
    console.error('error: ', error);
    throw error;
  }
}

export async function deleteDeceased(id: number) {
  try {
    const response = await api.delete(`deceased_people/${id}`);
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
