import api from "../apiService.ts"


export default async function fetchDeceasedPeople() {
	try {
			const response = await api.get('deceased_people');  // Adjust the endpoint as needed
			return response.data;
	} catch (error) {
			throw error;
	}
}

export async function saveDeceasedPerson(data) {
	try {
		
			const response = await api.post('deceased_people', data);  // Adjust the endpoint as needed
			console.log('response: ', response);
			return response.data;
	} catch (error) {
			throw error;
	}
}