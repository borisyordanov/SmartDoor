import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import AccountCircle from '@material-ui/icons/AccountCircle';
const styles = {
	root: {
		flexGrow: 1
	},
	toolbar: {
		justifyContent: 'space-between'
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	}
};

class App extends Component {
	state = {
		auth: true,
		anchorEl: null
	};

	handleChange = event => {
		this.setState({ auth: event.target.checked });
	};

	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const { classes } = this.props;
		const { auth, anchorEl } = this.state;
		const open = Boolean(anchorEl);
		return (
			<div className={classes.root}>
				<AppBar position="absolute" color="default">
					<Toolbar className={classes.toolbar}>
						<Typography variant="h6" color="inherit" noWrap>
							SmartDoor
						</Typography>
						{auth && (
							<div>
								<IconButton
									aria-owns={open ? 'menu-appbar' : null}
									aria-haspopup="true"
									className={classes.menuButton}
									onClick={this.handleMenu}
									color="inherit"
								>
									<AccountCircle />
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right'
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right'
									}}
									open={open}
									onClose={this.handleClose}
								>
									<MenuItem onClick={this.handleClose}>
										Profile
									</MenuItem>
									<MenuItem onClick={this.handleClose}>
										My account
									</MenuItem>
								</Menu>
							</div>
						)}
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles)(App);
