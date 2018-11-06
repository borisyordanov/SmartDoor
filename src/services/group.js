import { getTagDetails } from './tag';

const getAllGroups = () =>
	fetch('http://localhost:3001/group')
		.then(response => response.json())
		.then(async groups => {
			const groupPromises = groups.map(async group => {
				if (group && group.tags) {
					const tags = group.tags.slice();
					group.tags = [];
					const tagPromises = tags.map(async tagId => {
						try {
							const tag = await getTagDetails(tagId);
							if (Object.keys(tag).length) {
								group.tags.push(tag);
							}
						} catch (e) {
							console.warn(e);
						}
					});
					await Promise.all(tagPromises);
				}
			});

			await Promise.all(groupPromises);

			return groups;
		});
export { getAllGroups };
