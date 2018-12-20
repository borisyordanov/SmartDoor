import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './Main';
import Header from '../components/Header';
import Login from '../components/Login';
import Register from '../components/Register';

class App extends Component {
	state = {
		selectedMenuTab: 1,
		isAuthenticated: false
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
		const { selectedMenuTab, isAuthenticated } = this.state;
		const index = () =>
			isAuthenticated ? (
				<Main selectedMenuTab={selectedMenuTab} />
			) : (
				<Redirect to="/login" />
			);
		const login = () => (
			<Login
				isAuthenticated={isAuthenticated}
				handleLogin={this.handleLogin}
			/>
		);
		const register = () => (
			<Register
				isAuthenticated={isAuthenticated}
				handleLogin={this.handleLogin}
			/>
		);
		return (
			<Router>
				<>
					<Header
						handleLogout={this.handleLogout}
						selectedMenuTab={selectedMenuTab}
						handleNavMenuChange={this.handleNavMenuChange}
					/>
					<Switch>
						<Route path="/" exact component={index} />

						<Route path="/login" component={login} />

						<Route path="/register" component={register} />
					</Switch>
				</>
			</Router>
		);
	}
}

export default App;
