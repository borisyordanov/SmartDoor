import React from 'react';
import { shallow } from 'enzyme';

import '../../../enzymeSetup';
import TagList from './TagList';

const emptyItems = [];
const testItems = [
	{
		id: 1,
		name: 'Tag 1',
		tag: 'tag-1'
	},
	{
		id: 2,
		name: 'Tag 2',
		tag: 'tag-2'
	}
];

describe('Tag list test suite', () => {
	test('Check tag list with no data', () => {
		const tagList = shallow(<TagList items={emptyItems} />);
		const noDataRow = tagList.dive().find('#no-data-row');
		expect(noDataRow.children().text()).toEqual('Oops! No tags found');
	});

	test('Check tag list with 2 items', () => {
		const tagList = shallow(
			<TagList items={testItems} openItem={() => {}} />
		);
		const tags = tagList.dive().find('#tag-row');
		expect(tags).toHaveLength(2);
	});
});
