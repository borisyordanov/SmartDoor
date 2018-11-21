import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Main from './components/Main';
import Header from './components/Header';

const styles = theme => ({
	root: {
		flexGrow: 1
	}
});

class App extends Component {
	state = {
		selectedMenuTab: 0
	};

	handleNavMenuChange = (event, selectedMenuTab) => {
		this.setState({ selectedMenuTab });
	};

	render() {
		const { classes } = this.props;
		const { selectedMenuTab } = this.state;

		return (
			<div className={classes.root}>
				<Header
					handleNavMenuChange={this.handleNavMenuChange}
					selectedMenuTab={selectedMenuTab}
				/>
				<Main />
			</div>
		);
	}
}

export default withStyles(styles)(App);
