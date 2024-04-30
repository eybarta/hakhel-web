import api from "../apiService.ts"


export default async function fetchCemeteries() {
	try {
			const response = await api.get('cemeteries');  // Adjust the endpoint as needed
			return response.data;
	} catch (error) {
			throw error;
	}
}