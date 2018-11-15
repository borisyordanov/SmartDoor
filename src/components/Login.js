import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { login } from '../services/auth';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
})

function Login(props) {
    return (
        <div>
            <TextField id='username' autoFocus={true} placeholder='Username' type='text' />
            <br/>
            <TextField id='password' placeholder='Password' type='password' />
            <br/>
            <Button variant='contained' className={props.button} onClick={(event) => login(Math.random().toString(36).substring(4,16), 'password') }>
                Login
            </Button>
        </div>
    );
}

export default withStyles(styles)(Login);
