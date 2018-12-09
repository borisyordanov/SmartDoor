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

import TagList from '../components/TagList';
import GroupList from '../components/GroupList';
import TagModal from '../components/TagModal';
import GroupModal from '../components/GroupModal';
import Loader from '../components/Loader';

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
		height: 'min-content',
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

class Main extends Component {
	state = {
		loading: false,
		showSnackbar: false,
		snackbarMsg: '',
		selectedItemId: null,
		selectedGroupId: null,
		showItemModal: false,
		showGroupModal: false,
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
		tagList: [
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

	reloadTags = this.reloadTags.bind(this);
	reloadGroups = this.reloadGroups.bind(this);

	async componentDidMount() {
		this.setState({
			loading: true
		});

		if (this.props.selectedMenuTab) {
			this.reloadTags();
			return;
		}
		this.reloadGroups();
	}

	async reloadTags() {
		this.setState({
			loading: true
		});
		const tags = await getAllTags();
		console.log(tags);
		this.setState({
			tagList: tags,
			loading: false,
			showItemModal: false
		});
	}

	async reloadGroups() {
		this.setState({
			loading: true
		});
		const groups = await getAllGroups();
		console.log(groups);
		this.setState({
			groupList: groups,
			loading: false
		});
	}

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
			return;
		}
		this.setState(state => ({
			showGroupModal: !state.showGroupModal
		}));
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
		const { tagList, selectedItemId } = this.state;
		if (selectedItemId) {
			const index = tagList.findIndex(item => item.id === selectedItemId);
			return tagList[index];
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
		const { classes, selectedMenuTab } = this.props;
		const {
			loading,
			tagList,
			groupList,
			showSnackbar,
			snackbarMsg,
			showItemModal,
			showGroupModal
		} = this.state;

		const selectedItem = this.getSelectedItem();
		const selectedGroup = this.getSelectedGroup();

		if (loading) {
			return <Loader />;
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
								openGroup={this.openGroup}
								startScan={this.startScan}
								pauseScan={this.pauseScan}
								stopScan={this.stopScan}
							/>
						) : (
							<TagList items={tagList} openItem={this.openItem} />
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

				<TagModal
					className={classes.modal}
					reloadTags={this.reloadTags}
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

export default withStyles(styles)(Main);
