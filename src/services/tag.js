import axios from 'axios';

const getAllTags = () =>
	axios
		.get('http://localhost:8080/api/tags')
		.then(data =>
			data.data.map(tag => {
				tag.id = tag._id;
				tag.description = tag.desc;
				delete tag._id;
				delete tag.desc;
				return tag;
			})
		)
		.catch(error => error);

const updateTag = tag =>
	axios
		.post('http://localhost:8080/api/edit', {
			id: tag.id,
			name: tag.name,
			desc: tag.description
		})
		.then(response => response)
		.catch(error => error);

export { getAllTags, updateTag };
