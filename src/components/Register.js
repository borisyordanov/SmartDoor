import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { register } from '../services/auth';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
})

function Register(props) {
    return (
        <div>
            <Button variant='contained' className={props.button}>
                Register
            </Button>
        </div>
    );
}

export default withStyles(styles)(Register);
