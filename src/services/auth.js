import axios from 'axios';

const register = (username, password) =>
	axios
		.post('http://localhost:8080/api/user/register', {
			username,
			password
		})
		.then(response => response)
		.catch(error => error);

const login = (username, password) =>
	axios
		.post('http://localhost:8080/api/user/login', {
			username,
			password
		})
		.then(response => response)
		.catch(error => error);

export { login, register };
