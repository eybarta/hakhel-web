import {
  ContactInterface,
  ContactServerInterface,
} from '@type/contactsInterface';
import api from '@api/apiService.ts';

export async function fetchContacts() {
  try {
    const response = await api.get('contact_people'); // Adjust the endpoint as needed
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function saveContact(
  data: ContactServerInterface
): Promise<ContactInterface> {
  const {
    contact_person: { id },
  } = data;
  try {
    const method = id ? 'put' : 'post';
    const url = `contact_people${id ? `/${id}` : ''}`;
    const response = await api[method](url, data);
    return response.data;
  } catch (error) {
    console.error('error: ', error);
    throw error;
  }
}

export async function deleteContact(id: number) {
  try {
    const response = await api.delete(`contact_people/${id}`);
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
