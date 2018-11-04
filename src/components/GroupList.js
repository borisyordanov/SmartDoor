import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import GroupCard from './GroupCard';

function GroupList(props) {
	const { groups, startScan, pauseScan, stopScan, openItem } = props;

	return groups.map((group, i) => (
		<Grid item xs={12} sm={6} md={4} lg={3} key={`group-${i}`}>
			<GroupCard
				group={group}
				openItem={openItem}
				startScan={startScan}
				pauseScan={pauseScan}
				stopScan={stopScan}
			/>
		</Grid>
	));
}

GroupList.propTypes = {
	classes: PropTypes.object.isRequired
};

export default GroupList;
