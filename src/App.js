import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Header from './components/Header';
import ItemCard from './components/ItemCard';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
	close: {
		padding: theme.spacing.unit / 2
	},
	root: {
		flexGrow: 1
	},
	container: {
		width: '100%',
		maxWidth: 1400,
		margin: '30px auto 0 auto'
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary
	},
	fabAddBtn: {
		margin: 0,
		right: 20,
		bottom: 20,
		position: 'fixed'
	}
});

class App extends Component {
	state = {
		showSnackbar: false,
		snackbarMsg: '',
		itemList: [
			{
				title: 'Test 1',
				date: 1453766400000,
				img: 'https://via.placeholder.com/400x225',
				description:
					'Lorem ipsum dolor sit amet, id sit fugit oporteat perfecto. Putant ornatus usu cu, munere legimus explicari per no. Eum inani graece similique id, putant perpetua aliquando an eam. Quem solum id pro. Errem consequuntur id his.'
			},
			{
				title: 'Test 2',
				date: 1485388800000,
				img: 'https://via.placeholder.com/400x225',
				description:
					'Lorem ipsum dolor sit amet, id sit fugit oporteat perfecto. Putant ornatus usu cu, munere legimus explicari per no. Eum inani graece similique id, putant perpetua aliquando an eam. Quem solum id pro. Errem consequuntur id his.'
			},
			{
				title: 'Test 3',
				date: 1516924800000,
				img: 'https://via.placeholder.com/400x225',
				description:
					'Lorem ipsum dolor sit amet, id sit fugit oporteat perfecto. Putant ornatus usu cu, munere legimus explicari per no. Eum inani graece similique id, putant perpetua aliquando an eam. Quem solum id pro. Errem consequuntur id his.'
			}
		]
	};

	startScan = isUnpaused => {
		this.setState(state => ({
			showSnackbar: true,
			snackbarMsg: isUnpaused ? 'Scan continued' : 'Scan started'
		}));
	};
	pauseScan = () => {
		this.setState(state => ({
			showSnackbar: true,
			snackbarMsg: 'Scan paused'
		}));
	};
	stopScan = () => {
		this.setState(state => ({
			showSnackbar: true,
			snackbarMsg: 'Scan stopped'
		}));
	};
	handleSnackbarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({ showSnackbar: false, snackbarMsg: '' });
	};

	render() {
		const { classes } = this.props;
		const { itemList, showSnackbar, snackbarMsg } = this.state;
		return (
			<div className={classes.root}>
				<Header />
				<div className={classes.container}>
					<Grid
						container
						spacing={24}
						justify="center"
						alignItems="center"
					>
						{itemList.map((item, i) => (
							<Grid item key={`item-${i}`}>
								<ItemCard
									details={item}
									startScan={this.startScan}
									pauseScan={this.pauseScan}
									stopScan={this.stopScan}
								/>
							</Grid>
						))}
					</Grid>
				</div>
				<Button
					className={classes.fabAddBtn}
					variant="fab"
					color="primary"
					aria-label="Add"
				>
					<AddIcon />
				</Button>
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right'
					}}
					open={showSnackbar}
					autoHideDuration={6000}
					onClose={this.handleSnackbarClose}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={snackbarMsg}
					action={[
						<IconButton
							key="close"
							aria-label="Close"
							color="inherit"
							className={classes.close}
							onClick={this.handleSnackbarClose}
						>
							<CloseIcon />
						</IconButton>
					]}
				/>
			</div>
		);
	}
}

export default withStyles(styles)(App);
