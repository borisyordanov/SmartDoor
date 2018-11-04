import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({});

class ItemModal extends Component {
	state = {
		id: '',
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
				onClose={toggleModal('item')}
			>
				<div className={classes.modal}>
					<Typography variant="h6" gutterBottom>
						Add new item
					</Typography>
					<TextField
						required
						label="Name"
						fullWidth
						margin="normal"
						autoComplete="name"
						value={name}
					/>
					<TextField
						required
						label="Id"
						fullWidth
						margin="normal"
						autoComplete="id"
						value={id}
					/>
					<TextField
						label="Description"
						fullWidth
						margin="normal"
						multiline
						rows={5}
						autoComplete="description"
						value={description}
					/>
					<Button color="primary" onClick={this.saveItem}>
						Save
					</Button>
					<Button color="secondary" onClick={toggleModal('item')}>
						Cancel
					</Button>
				</div>
			</Modal>
		);
	}
}

export default withStyles(styles)(ItemModal);
