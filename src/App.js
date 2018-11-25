import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Login from './components/Login';
import Register from './components/Register';

const styles = theme => ({
	root: {
		flexGrow: 1
	}
});

class App extends Component {
	state = {
		selectedMenuTab: 1,
		isAuthenticated: true
	};

	handleLogin = this.handleLogin.bind(this);
	handleLogout = this.handleLogout.bind(this);
	handleNavMenuChange = this.handleNavMenuChange.bind(this);

	handleNavMenuChange(event, selectedMenuTab) {
		this.setState({ selectedMenuTab });
	}

	handleLogin() {
		this.setState({ isAuthenticated: true });
	}

	handleLogout() {
		this.setState({ isAuthenticated: false });
	}

	render() {
		const { classes } = this.props;
		const { selectedMenuTab, isAuthenticated } = this.state;
		return (
			<Router>
				<div>
					<div className={classes.root}>
						<Header
							handleLogout={this.handleLogout}
							selectedMenuTab={selectedMenuTab}
							handleNavMenuChange={this.handleNavMenuChange}
						/>
					</div>
					<Switch>
						<Route
							path="/"
							exact
							component={() =>
								isAuthenticated ? (
									<Main selectedMenuTab={selectedMenuTab} />
								) : (
									<Redirect to="/login" />
								)
							}
						/>

						<Route
							path="/login"
							render={() => (
								<Login
									isAuthenticated={isAuthenticated}
									handleLogin={this.handleLogin}
								/>
							)}
						/>
						
						<Route
							path="/register"
							render={() => (
								<Register
									isAuthenticated={isAuthenticated}
									handleLogin={this.handleLogin}
								/>
							)}
						/>
					</Switch>
				</div>
			</Router>
		);
	}
}

export default withStyles(styles)(App);
