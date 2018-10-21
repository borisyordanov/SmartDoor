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
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
	modal: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4
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
		showModal: true,
		newItem: {
			name: '',
			description: ''
		},
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
	newItemTitle = React.createRef();
	newItemDescription = React.createRef();

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

	toggleModal = () => {
		this.setState(state => ({ showModal: !state.showModal }));
	};

	saveItem = () => {
		const itemList = this.state.itemList.slice();
		itemList.push({
			title: this.newItemName.current.value,
			description: this.newItemDescription.current.value,
			date: Date.now(),
			img: 'https://via.placeholder.com/400x225'
		});
		this.setState({
			showModal: false,
			itemList
		});
	};
	render() {
		const { classes } = this.props;
		const { itemList, showSnackbar, snackbarMsg, showModal } = this.state;

		return (
			<div className={classes.root}>
				<Header />
				<div className={classes.container}>
					<Grid
						container
						spacing={24}
						justify="center"
					>
						{itemList.map((item, i) => (
							<Grid item xs={6} sm={4} md={3} key={`item-${i}`}>
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
					onClick={this.toggleModal}
				>
					<AddIcon />
				</Button>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={showModal}
					onClose={this.toggleModal}
				>
					<div className={classes.modal}>
						<Typography variant="h6" gutterBottom>
							Add new item
						</Typography>
						<Grid container spacing={24}>
							<Grid item xs={12}>
								<TextField
									required
									id="name"
									name="name"
									label="Name"newItemTitle
									fullWidth
									autoComplete="name"
									inputRef={this.newItemName}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="description"
									name="description"
									label="Description"
									fullWidth
									multiline
									rows={5}
									autoComplete="description"
									inputRef={this.newItemDescription}
								/>
							</Grid>
							<Grid item xs={12}>
								<Button color="primary" onClick={this.saveItem}>
									Save
								</Button>
								<Button
									color="secondary"
									onClick={this.toggleModal}
								>
									Cancel
								</Button>
							</Grid>
						</Grid>
					</div>
				</Modal>

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
