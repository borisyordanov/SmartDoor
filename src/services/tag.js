import axios from 'axios';

const getAllTags = () =>
	axios
		.get('http://localhost:8080/api/tags')
		.then(data => {
			console.log(data.data);
			return data.data.map(tag => {
				tag.id = tag._id;
				delete tag._id;
				return tag;
			});
		})
		.catch(error => error);

const updateTag = tag =>
	axios
		.post('http://localhost:8080/api/edit', {
			id: tag.id,
			name: tag.name
		})
		.then(response => response)
		.catch(error => error);

export { getAllTags, updateTag };
