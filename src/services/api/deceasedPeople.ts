import { DeceasedPersonInterface } from '../../types/deceased.ts';
import api from '../apiService.ts';

export default async function fetchDeceasedPeople() {
  try {
    const response = await api.get('deceased_people'); // Adjust the endpoint as needed
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

type DeceasedPersonServerInterface = {
  deceased_person: DeceasedPersonInterface;
};

export async function saveDeceasedPerson(data: DeceasedPersonServerInterface) {
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
