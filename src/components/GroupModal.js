import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from './Autocomplete';

class GroupModal extends Component {
	state = {
		id: '',
		name: '',
		description: '',
		items: []
	};
	saveGroup = this.saveGroup.bind(this);
	componentWillReceiveProps(nextProps) {
		if (nextProps.group) {
			this.setState({
				...nextProps.group
			});
		}
	}

	saveInput = input => e => {
		this.setState({
			[input]: e.target.value
		});
	};

	saveGroup() {
		this.props.saveGroup({
			...this.state
		});
	}
	render() {
		const { classes, isOpen, toggleModal, className } = this.props;
		const { name, id, description } = this.state;

		return (
			<Modal
				className={className}
				hideBackdrop={true}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={isOpen}
				onClose={toggleModal('group')}
			>
				<div className={classes.modal}>
					<Typography variant="h6" gutterBottom>
						Add new group
					</Typography>
					<TextField
						required
						label="Name"
						fullWidth
						margin="normal"
						autoComplete="name"
						value={name}
						onChange={this.saveInput('name')}
					/>
					<TextField
						required
						label="Id"
						fullWidth
						margin="normal"
						autoComplete="id"
						value={id}
						onChange={this.saveInput('id')}
					/>
					<br />
					<br />
					<Autocomplete />

					<TextField
						label="Description"
						fullWidth
						margin="normal"
						multiline
						rows={5}
						autoComplete="description"
						value={description}
						onChange={this.saveInput('description')}
					/>
					<Button color="primary" onClick={this.saveGroup}>
						Save
					</Button>
					<Button color="secondary" onClick={toggleModal('group')}>
						Cancel
					</Button>
				</div>
			</Modal>
		);
	}
}

export default GroupModal;
