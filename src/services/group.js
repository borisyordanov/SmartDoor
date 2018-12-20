import axios from 'axios';

const getAllGroups = () =>
	axios
		.get('http://localhost:8080/api/groups')
		.then(data => {
			console.log(data.data);
			return data.data;
		})
		.catch(error => error);

export { getAllGroups };
