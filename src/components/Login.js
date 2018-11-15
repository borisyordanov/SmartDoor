import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { login } from '../services/auth';

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	button: {
		margin: theme.spacing.unit
	},
	input: {
		display: 'none'
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: '100%'
	}
});

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(name, event) {
		this.setState({
			[name]: event.target.value
		});
	}

	async handleSubmit(event) {
		try {
			const result = await login(
				this.state.username,
				this.state.password
			);
			if (result.status === 200) {
				console.log('Successfully logged in');
				// Notify main app logic of success
				this.props.handleAuthenticationChange(true);
				// this.props.history.push('/');
			}
		} catch (e) {
			console.log(e);
		}

		event.preventDefault();
	}

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="center"
					spacing={24}
				>
					<Grid item xs={12}>
						<TextField
							id="username"
							className={classes.textField}
							autoFocus={true}
							placeholder="Username"
							type="text"
							onChange={e => this.handleChange('username', e)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="password"
							className={classes.textField}
							placeholder="Password"
							type="password"
							onChange={e => this.handleChange('password', e)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="contained"
							className={classes.Button}
							onClick={event => this.handleSubmit(event)}
						>
							Login
						</Button>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withRouter(withStyles(styles)(Login));
