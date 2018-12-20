import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { updateTag } from '../services/tag';

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
		float: 'right'
	}
});

class TagModal extends Component {
	saveItem = this.saveItem.bind(this);
	state = {
		name: '',
		description: ''
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.item) {
			this.setState({
				...nextProps.item
			});
		}
	}

	saveInput = input => e => {
		this.setState({
			[input]: e.target.value
		});
	};

	async saveItem() {
		try {
			await updateTag({
				id: this.props.item.id,
				description: this.state.description,
				name: this.state.name
			});
			this.props.reloadTags();
		} catch (error) {
			console.warn(error);
		}
	}

	render() {
		const { classes, isOpen, toggleModal, className } = this.props;
		const { name, description } = this.state;

		return (
			<Modal
				className={className}
				hideBackdrop={true}
				open={isOpen}
				onClose={toggleModal('item')}
			>
				<div className={classes.modal}>
					<Typography variant="h6" gutterBottom>
						Edit tag
					</Typography>
					<TextField
						required
						label="Name"
						fullWidth
						margin="normal"
						onChange={this.saveInput('name')}
						value={name}
					/>
					<TextField
						required
						label="Description"
						fullWidth
						margin="normal"
						onChange={this.saveInput('description')}
						value={description}
					/>
					<br />
					<br />
					<Button
						className={classes.button}
						color="primary"
						variant="contained"
						onClick={this.saveItem}
					>
						Save
					</Button>
					<Button
						className={classes.button}
						color="secondary"
						variant="contained"
						onClick={toggleModal('item')}
					>
						Cancel
					</Button>
				</div>
			</Modal>
		);
	}
}

export default withStyles(styles)(TagModal);
