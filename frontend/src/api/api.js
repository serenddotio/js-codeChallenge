import axios from 'axios';

// APIs
export const amazon = axios.create({
	baseURL: 'http://localhost:5000'
});

export const db = axios.create({
	baseURL: 'http://localhost:3001'
});