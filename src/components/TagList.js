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
	row: { cursor: 'pointer' },
	table: {
		minWidth: 700
	},
	groupCell: {
		cursor: 'pointer'
	}
});

const TagList = props => {
	const { classes, items, openItem } = props;
	console.log(items);
	
	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Code</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{items.map((item, index) => (
						<TableRow
							hover
							key={item.id}
							className={classes.row}
							onClick={openItem(item.id)}
						>
							<TableCell>{index}</TableCell>
							<TableCell>{item.name}</TableCell>
							<TableCell>{item.code}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
};

TagList.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TagList);
