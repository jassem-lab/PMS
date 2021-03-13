import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import PropTypes from "prop-types";
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    makeStyles,
    TextField,
    Grid,
    Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" to="/">
                Portfolio Management System
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Register(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errors, setErrors] = useState({});

    const onChange = (e) => {
        setName(document.getElementById("name").value);
        setEmail(document.getElementById("email").value);
        setPassword(document.getElementById("password").value);
        setPassword2(document.getElementById("password2").value);
    };

    useEffect(() => {
        console.log("component mounted");

        if (props.auth.isAuthenticated) {
            props.history.push("/dashboard");
        }

        if (props.errors) {
            setErrors(props.errors);
        }
    }, [props.auth.isAuthenticated, props.errors, props.history]);

    const onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name,
            email,
            password,
            password2,
        };

        // *************DELETE*************
        console.log(newUser);
        // *************DELETE*************

        props.registerUser(newUser, props.history);
    };

    const classes = useStyles();

    let nameTextField;

    if (errors.name) {
        nameTextField = (
            <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                type="text"
                autoFocus
                onChange={onChange}
                value={name}
                error
                className={classnames("", { invalid: errors.name })}
            />
        );
    } else {
        nameTextField = (
            <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                type="text"
                autoFocus
                onChange={onChange}
                value={name}
                className={classnames("", { invalid: errors.name })}
            />
        );
    }

    let emailTextField;

    if (errors.email) {
        emailTextField = (
            <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onChange}
                value={email}
                error
                className={classnames("", { invalid: errors.email })}
            />
        );
    } else {
        emailTextField = (
            <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onChange}
                value={email}
                className={classnames("", { invalid: errors.email })}
            />
        );
    }

    let passTextField;

    if (errors.password) {
        passTextField = (
            <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChange}
                value={password}
                error
                className={classnames("", { invalid: errors.password2 })}
            />
        );
    } else {
        passTextField = (
            <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChange}
                value={password}
                className={classnames("", { invalid: errors.password2 })}
            />
        );
    }

    let pass2TextField;

    if (errors.password2) {
        pass2TextField = (
            <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="confirm-password"
                onChange={onChange}
                value={password2}
                error
                className={classnames("", { invalid: errors.password2 })}
            />
        );
    } else {
        pass2TextField = (
            <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="confirm-password"
                onChange={onChange}
                value={password2}
                className={classnames("", { invalid: errors.password2 })}
            />
        );
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {nameTextField}
                            <span className="red-text">{errors.name}</span>
                        </Grid>
                        <Grid item xs={12}>
                            {emailTextField}
                            <span className="red-text">{errors.email}</span>
                        </Grid>
                        <Grid item xs={12}>
                            {passTextField}
                            <span className="red-text">{errors.password}</span>
                        </Grid>
                        <Grid item xs={12}>
                            {pass2TextField}
                            <span className="red-text">{errors.password2}</span>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                        <Box ml={11} mr={11}>
                            <Link to="/login" variant="body2">
                                {"Already have an account? Sign In"}
                            </Link>
                        </Box>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
