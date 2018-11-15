import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { register } from '../services/auth';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      }
})

class Register extends React.Component {
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
            let result = await register(this.state.username, this.state.password);
            if (result.status === 200) {
                console.log('Successfully registered');
                // Notify main app logic of success
            }
        } catch (e) {
            console.log(e);
        }
        
        event.preventDefault();
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <TextField 
                    id='username'
                    className={classes.TextField}
                    autoFocus={true} 
                    placeholder='Username' 
                    type='text'
                    onChange={(e) => this.handleChange('username', e)}
                />
                <br/>
                <TextField 
                    id='password' 
                    className={classes.TextField}
                    placeholder='Password' 
                    type='password' 
                    onChange={(e) => this.handleChange('password', e)}
                />
                <br/>
                <Button 
                    variant='contained' 
                    className={classes.Button} 
                    onClick={(event) => this.handleSubmit(event) } >
                    Register
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(Register);
