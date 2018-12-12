import React from 'react';
import Grid from '@material-ui/core/Grid';
import GroupCard from './GroupCard';

const GroupList = ({ groups, startScan, pauseScan, stopScan, openGroup }) =>
	groups.length
		? groups.map((group, i) => (
				<Grid item xs={12} sm={6} md={4} lg={3} key={`group-${i}`}>
					<GroupCard
						group={group}
						openGroup={openGroup}
						startScan={startScan}
						pauseScan={pauseScan}
						stopScan={stopScan}
					/>
				</Grid>
		  ))
		: 'Oops! No groups found';

export default GroupList;
