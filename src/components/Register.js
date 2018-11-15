import React from 'react';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
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
            <div className={classes.root}>
                <Grid 
                container
                direction='column'
                justify='center'
                alignItems='center'
                spacing={24}
                >
                    <Grid item xs={12}>
                        <TextField 
                            id='username'
                            className={classes.TextField}
                            autoFocus={true} 
                            placeholder='Username' 
                            type='text'
                            onChange={(e) => this.handleChange('username', e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            id='password' 
                            className={classes.TextField}
                            placeholder='Password' 
                            type='password' 
                            onChange={(e) => this.handleChange('password', e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            variant='contained' 
                            className={classes.Button} 
                            onClick={(event) => this.handleSubmit(event) } >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Register);
