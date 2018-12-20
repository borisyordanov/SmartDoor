import axios from 'axios';

const register = (email, password) =>
	axios
		.post('http://localhost:8080/api/user/register', {
			email,
			password
		})
		.then(response => response)
		.catch(error => error);

const login = (email, password) =>
	axios
		.post('http://localhost:8080/api/user/login', {
			email,
			password
		})
		.then(response => response)
		.catch(error => error);

export { login, register };
