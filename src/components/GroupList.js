import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ItemCard from './ItemCard';

const styles = theme => ({});

function GroupList(props) {
	const { classes, groups, startScan, pauseScan, stopScan } = props;

	return groups.map((item, i) => (
		<Grid item xs={12} sm={6} md={4} lg={3} key={`group-${i}`}>
			<ItemCard
				details={item}
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

export default withStyles(styles)(GroupList);
