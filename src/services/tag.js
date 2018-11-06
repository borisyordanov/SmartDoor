const getAllTags = () =>
	fetch('http://localhost:3001/tag')
		.then(response => response.json())
		.then(data => data);

const getTagDetails = id =>
	fetch('http://localhost:3001/tag/' + id)
		.then(response => response.json())
		.then(data => data)
		.catch(err => {
			console.warn('getTagDetails', err);
			return err;
		});
export { getAllTags, getTagDetails };
