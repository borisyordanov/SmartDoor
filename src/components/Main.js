import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import green from '@material-ui/core/colors/green';
import ItemList from './ItemList';
import GroupList from './GroupList';
import ItemModal from './ItemModal';
import GroupModal from './GroupModal';
import { getAllTags } from '../services/tag';
import { getAllGroups } from '../services/group';

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
		loading: false,
		showSnackbar: false,
		snackbarMsg: '',
		selectedItemId: null,
		selectedGroupId: null,
		showItemModal: false,
		showGroupModal: false,
		selectedMenuTab: 0,
		groupList: [
			{
				id: 1,
				name: 'Group 1',
				tags: [
					{
						id: 1,
						name: 'Item 1',
						code: 123
					}
				]
			},
			{
				id: 2,
				name: 'Group 2',
				tags: [
					{
						id: 1,
						name: 'Item 1',
						code: 123
					},
					{
						id: 2,
						name: 'Item 2',
						code: 123
					}
				]
			},
			{
				id: 3,
				name: 'Group 3',
				tags: [
					{
						id: 1,
						name: 'Item 1',
						code: 123
					},
					{
						id: 2,
						name: 'Item 2',
						code: 123
					},
					{
						id: 3,
						name: 'Item 3',
						code: 123
					}
				]
			}
		],
		itemList: [
			{
				id: 1,
				name: 'Item 1',
				code: 123
			},
			{
				id: 2,
				name: 'Item 2',
				code: 123
			},
			{
				id: 3,
				name: 'Item 3',
				code: 123
			}
		]
	};

	async componentDidMount() {
		this.setState({
			loading: true
		});
		const tags = await getAllTags();
		const groups = await getAllGroups();
		console.log(tags);
		console.log(groups);
		this.setState({
			itemList: tags,
			groupList: groups,
			loading: false
		});
	}
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
	toggleModal = type => () => {
		if (type === 'item') {
			this.setState(state => ({
				showItemModal: !state.showItemModal
			}));
		} else {
			this.setState(state => ({
				showGroupModal: !state.showGroupModal
			}));
		}
	};
	openItem = itemId => () => {
		this.setState({
			selectedItemId: itemId
		});
		this.toggleModal('item')();
	};
	openGroup = groupId => () => {
		this.setState({
			selectedGroupId: groupId
		});
		this.toggleModal('group')();
	};
	getSelectedItem() {
		const { itemList, selectedItemId } = this.state;
		if (selectedItemId) {
			const index = itemList.findIndex(
				item => item.id === selectedItemId
			);
			return itemList[index];
		}
		return null;
	}
	getSelectedGroup() {
		const { groupList, selectedGroupId } = this.state;
		if (selectedGroupId) {
			const index = groupList.findIndex(
				group => group.id === selectedGroupId
			);
			return groupList[index];
		}
		return null;
	}
	saveGroup = data => {
		console.log(data);
		const newGroup = {
			id: data.id,
			name: data.name,
			description: data.description,
			items: [],
			date: Date.now(),
			img: 'https://via.placeholder.com/400x225'
		};
		const groupList = this.state.groupList.slice();
		const index = groupList.findIndex(group => group.id === data.id);
		if (index >= 0) {
			groupList[index] = newGroup;
		} else {
			groupList.push(newGroup);
		}
		console.log(groupList);
		this.setState({
			showItemModal: false,
			groupList
		});
	};
	render() {
		const { classes } = this.props;
		const {
			loading,
			itemList,
			groupList,
			showSnackbar,
			snackbarMsg,
			showItemModal,
			showGroupModal,
			selectedMenuTab
		} = this.state;

		const selectedItem = this.getSelectedItem();
		const selectedGroup = this.getSelectedGroup();

		if (loading) {
			return 'Loading...';
		}
		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<Grid
						container
						spacing={16}
						className={classes.grid}
						justify="center"
					>
						{selectedMenuTab === 0 ? (
							<GroupList
								groups={groupList}
								openItem={this.openItem}
								startScan={this.startScan}
								pauseScan={this.pauseScan}
								stopScan={this.stopScan}
							/>
						) : (
							<ItemList
								items={itemList}
								openGroup={this.openGroup}
							/>
						)}
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
				<ItemModal
					className={classes.modal}
					toggleModal={this.toggleModal}
					isOpen={showItemModal}
					item={selectedItem}
				/>
				<GroupModal
					className={classes.modal}
					toggleModal={this.toggleModal}
					isOpen={showGroupModal}
					group={selectedGroup}
					saveGroup={this.saveGroup}
				/>

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
