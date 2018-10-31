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
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import green from '@material-ui/core/colors/green';
import Autocomplete from './components/Autocomplete';

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
		margin: '30px auto 0 auto',
		overflow: 'hidden'
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
		position: 'fixed'
	},
	grid: {
		padding: theme.spacing.unit * 2
	},
	fabItemAddBtn: {
		right: 80,
		bottom: 20,
		backgroundColor: green[500],
		color: 'white'
	},
	fabGroupAddBtn: {
		right: 20,
		bottom: 20
	}
});

class App extends Component {
	state = {
		showSnackbar: false,
		snackbarMsg: '',
		showAddItemModal: false,
		showAddGroupModal: false,
		selectedMenuTab: 0,
		newItem: {
			name: '',
			description: ''
		},
		groupList: [
			{
				title: 'Group 1',
				date: 1453766400000,
				img: 'https://via.placeholder.com/400x225',
				description:
					'Lorem ipsum dolor sit amet, id sit fugit oporteat perfecto. Putant ornatus usu cu, munere legimus explicari per no. Eum inani graece similique id, putant perpetua aliquando an eam. Quem solum id pro. Errem consequuntur id his.'
			},
			{
				title: 'Group 2',
				date: 1485388800000,
				img: 'https://via.placeholder.com/400x225',
				description:
					'Lorem ipsum dolor sit amet, id sit fugit oporteat perfecto. Putant ornatus usu cu, munere legimus explicari per no. Eum inani graece similique id, putant perpetua aliquando an eam. Quem solum id pro. Errem consequuntur id his.'
			},
			{
				title: 'Group 3',
				date: 1516924800000,
				img: 'https://via.placeholder.com/400x225',
				description:
					'Lorem ipsum dolor sit amet, id sit fugit oporteat perfecto. Putant ornatus usu cu, munere legimus explicari per no. Eum inani graece similique id, putant perpetua aliquando an eam. Quem solum id pro. Errem consequuntur id his.'
			}
		],
		itemList: [
			{
				title: 'Item 1',
				date: 1453766400000,
				img: 'https://via.placeholder.com/400x225',
				description:
					'Lorem ipsum dolor sit amet, id sit fugit oporteat perfecto. Putant ornatus usu cu, munere legimus explicari per no. Eum inani graece similique id, putant perpetua aliquando an eam. Quem solum id pro. Errem consequuntur id his.'
			},
			{
				title: 'Item 2',
				date: 1485388800000,
				img: 'https://via.placeholder.com/400x225',
				description:
					'Lorem ipsum dolor sit amet, id sit fugit oporteat perfecto. Putant ornatus usu cu, munere legimus explicari per no. Eum inani graece similique id, putant perpetua aliquando an eam. Quem solum id pro. Errem consequuntur id his.'
			},
			{
				title: 'Item 3',
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
	handleNavMenuChange = (event, selectedMenuTab) => {
		this.setState({ selectedMenuTab });
	};
	toggleModal = type => () => {
		if (type === 'item') {
			this.setState(state => ({
				showAddItemModal: !state.showAddItemModal
			}));
		} else {
			this.setState(state => ({
				showAddGroupModal: !state.showAddGroupModal
			}));
		}
	};

	saveItem = () => {
		const groupList = this.state.groupList.slice();
		groupList.push({
			title: this.newItemName.current.value,
			description: this.newItemDescription.current.value,
			date: Date.now(),
			img: 'https://via.placeholder.com/400x225'
		});
		this.setState({
			showAddItemModal: false,
			groupList
		});
	};
	render() {
		const { classes } = this.props;
		const {
			itemList,
			groupList,
			showSnackbar,
			snackbarMsg,
			showAddItemModal,
			showAddGroupModal,
			selectedMenuTab
		} = this.state;

		return (
			<div className={classes.root}>
				<Header
					handleNavMenuChange={this.handleNavMenuChange}
					selectedMenuTab={selectedMenuTab}
				/>
				<div className={classes.container}>
					<Grid container spacing={16} className={classes.grid} justify="center">
						{selectedMenuTab === 0
							? itemList.map((item, i) => (
									<Grid
										item
										xs={12}
										sm={6}
										md={4}
										lg={3}
										key={`item-${i}`}
									>
										<ItemCard
											details={item}
											startScan={this.startScan}
											pauseScan={this.pauseScan}
											stopScan={this.stopScan}
										/>
									</Grid>
							  ))
							: groupList.map((item, i) => (
									<Grid
										item
										xs={12}
										sm={6}
										md={4}
										lg={3}
										key={`item-${i}`}
									>
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
					className={[classes.fabAddBtn, classes.fabItemAddBtn].join(
						' '
					)}
					variant="fab"
					aria-label="Add"
					onClick={this.toggleModal('item')}
				>
					<AddIcon />
				</Button>
				<Button
					className={[classes.fabAddBtn, classes.fabGroupAddBtn].join(
						' '
					)}
					variant="fab"
					color="primary"
					aria-label="Add"
					onClick={this.toggleModal()}
				>
					<PlaylistAdd />
				</Button>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={showAddItemModal}
					onClose={this.toggleModal('item')}
				>
					<div className={classes.modal}>
						<Typography variant="h6" gutterBottom>
							Add new item
						</Typography>
						<TextField
							required
							label="Name"
							fullWidth
							autoComplete="name"
							inputRef={this.newItemName}
						/>
						<TextField
							required
							label="Id"
							fullWidth
							autoComplete="id"
							inputRef={this.newItemName}
						/>
						<TextField
							label="Description"
							fullWidth
							multiline
							rows={5}
							autoComplete="description"
							inputRef={this.newItemDescription}
						/>
						<Button color="primary" onClick={this.saveItem}>
							Save
						</Button>
						<Button color="secondary" onClick={this.toggleModal}>
							Cancel
						</Button>
					</div>
				</Modal>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={showAddGroupModal}
					onClose={this.toggleModal()}
				>
					<div className={classes.modal}>
						<Typography variant="h6" gutterBottom>
							Add new group
						</Typography>
						<TextField
							required
							label="Name"
							fullWidth
							autoComplete="name"
							inputRef={this.newItemName}
						/>
						<br />
						<br />
						<Autocomplete />
						<br />
						<TextField
							label="Description"
							fullWidth
							multiline
							rows={5}
							autoComplete="description"
							inputRef={this.newItemDescription}
						/>
						<Button color="primary" onClick={this.saveItem}>
							Save
						</Button>
						<Button color="secondary" onClick={this.toggleModal}>
							Cancel
						</Button>
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
