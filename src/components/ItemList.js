import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto'
	},
	table: {
		minWidth: 700
	},
	groupCell: {
		cursor: 'pointer'
	}
});

function ItemList(props) {
	const { classes, items, openGroup } = props;

	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Group</TableCell>
						<TableCell>Created At</TableCell>
						<TableCell>Description</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{items.map(item => (
						<TableRow key={item.id}>
							<TableCell>{item.name}</TableCell>
							<TableCell
								className={classes.groupCell}
								onClick={openGroup(item.group.id)}
							>
								{item.group.name}
							</TableCell>
							<TableCell>
								{new Date(item.date).toLocaleString()}
							</TableCell>
							<TableCell>
								{item.description.substr(
									0,
									item.description.length / 2
								) + '...'}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
}

ItemList.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemList);
