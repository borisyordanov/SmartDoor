import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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

class Header extends Component {
	state = {
		auth: true,
		anchorEl: null
	};

	handleMenuOpen = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const {
			classes,
			selectedMenuTab,
			handleNavMenuChange,
			handleLogout
		} = this.props;
		const { auth, anchorEl } = this.state;
		const open = Boolean(anchorEl);
		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar className={classes.toolbar}>
						<Link to="/">
							<Typography variant="h6" color="secondary" noWrap>
								SmartDoor
							</Typography>
						</Link>
						<Tabs
							value={selectedMenuTab}
							onChange={handleNavMenuChange}
							indicatorColor="secondary"
						>
							<Tab label="Groups" />
							<Tab label="Tags" />
						</Tabs>
						{auth && (
							<div>
								<IconButton
									aria-owns={open ? 'menu-appbar' : null}
									aria-haspopup="true"
									className={classes.menuButton}
									onClick={this.handleMenuOpen}
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
										<Link to="/login">Login</Link>
									</MenuItem>
									<MenuItem onClick={this.handleClose}>
										<Link to="/register">Register</Link>
									</MenuItem>
									<MenuItem
										onClick={() => {
											this.handleClose();
											handleLogout();
										}}
									>
										Logout
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

export default withStyles(styles)(Header);
