import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';
import { Avatar, Box, Button, Container, CssBaseline, makeStyles, TextField, Grid, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
        Portfolio Management System
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

function Login(props) {

  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({})

  const onChange = e => {
    setEmail(document.getElementById("email").value);
    setPassword(document.getElementById("password").value);
  }

  useEffect(() => {
    console.log("component mounted");

    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard")
    }

    if (props.errors) {
      setErrors(props.errors)
    }
  }, [props.auth.isAuthenticated, props.errors, props.history])

  const onSubmit = e => {
    e.preventDefault();

    const userData = {
      email,
      password
    }

    props.loginUser(userData)

    // *************DELETE*************
    console.log(userData)
    // *************DELETE*************
  }

  let userTextField;

  if (errors.email || errors.emailnotfound) {
    userTextField = <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" type="email" autoComplete="email" autoFocus onChange={onChange} value={email} error className={classnames("", { invalid: errors.email || errors.emailnotfound })} />
  } else {
    userTextField = <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" type="email" autoComplete="email" autoFocus onChange={onChange} value={email} className={classnames("", { invalid: errors.email || errors.emailnotfound })} />
  }

  let passTextField;

  if (errors.password || errors.passwordincorrect) {
    passTextField = <TextField variant="outlined" margin="normal" required fullWidth id="password" label="Password" name="password" type="password" autoComplete="current-password" onChange={onChange} value={password} error className={classnames("", { invalid: errors.password || errors.passwordincorrect })} />
  } else {
    passTextField = <TextField variant="outlined" margin="normal" required fullWidth id="password" label="Password" name="password" type="password" autoComplete="current-password" onChange={onChange} value={password} className={classnames("", { invalid: errors.password || errors.passwordincorrect })} />
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          {userTextField}
          <span className="red-text">
            {errors.email}
            {errors.emailnotfound}
          </span>
          {passTextField}
          <span>
            {errors.password}
            {errors.passwordincorrect}
          </span>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Box ml={11} mr={11}>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);