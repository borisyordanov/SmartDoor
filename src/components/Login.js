import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { login } from '../services/auth';

const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: 'calc(100vh - 64px)'
	},
	error: { color: 'red' },
	cardActions: {
		paddingRight: 24,
		paddingBottom: 24,
		paddingLeft: 24,
		justifyContent: 'flex-end'
	},
	textField: {
		marginBottom: 20
	}
});

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			error: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(name, event) {
		this.setState({
			[name]: event.target.value
		});
	}

	handleError(error) {
		this.setState({
			error
		});
	}

	async handleSubmit() {
		try {
			const result = await login(
				this.state.email,
				this.state.password
			);
			if (result.status === 200) {
				this.props.handleLogin();
				return;
			}
			this.handleError('Oops! Something went wrong :(');
		} catch (e) {
			this.handleError('Oops! Something went wrong :(');
		}
	}

	render() {
		const { classes, isAuthenticated } = this.props;
		const { error } = this.state;

		if (isAuthenticated) {
			return <Redirect to="/" />;
		}

		return (
			<div className={classes.root}>
				<Card>
					<CardContent>
						<form noValidate autoComplete="off">
							<Typography variant="h4" gutterBottom>
								Login
							</Typography>
							<TextField
								fullWidth
								className={classes.textField}
								label="Email"
								type="text"
								onChange={e => this.handleChange('email', e)}
							/>
							<TextField
								fullWidth
								className={classes.textField}
								label="Password"
								type="password"
								onChange={e => this.handleChange('password', e)}
							/>
							{error && (
								<Typography
									variant="body1"
									className={classes.error}
									gutterBottom
								>
									{error}
								</Typography>
							)}
						</form>
					</CardContent>
					<CardActions className={classes.cardActions}>
						<Link to="/register">
							<Button>Register instead?</Button>
						</Link>
						<Button
							variant="contained"
							color="primary"
							onClick={this.handleSubmit}
						>
							Login
						</Button>
					</CardActions>
				</Card>
			</div>
		);
	}
}

export default withStyles(styles)(Login);
