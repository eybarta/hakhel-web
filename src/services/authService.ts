// src/services/authService.js
import axios from 'axios';

const API_URL = 'https://hakhel-c99c0466c9a2.herokuapp.com/api/v1/auth';

// Function to log in the user
export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(API_URL, {
            email,
            password
        },{
					headers: {
							'Content-Type': 'application/json'
					}
			});
        if (response.data.token) {
            localStorage.setItem('hakhel_usertoken', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response.data);
				throw error;
    }
};

export const hasToken = () => !!getToken()
// Function to get the stored token
export const getToken = () => {
    return localStorage.getItem('hakhel_usertoken');
};

// Add to authService.js
export const logout = () => {
	localStorage.removeItem('hakhel_usertoken');
	window.location.href = '/login';
};
