import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from 'react-router-dom';
import { logoutUser } from "../../actions/authActions";
import { settingsPost } from '../../actions/postActions';

import {
    makeStyles,
    CssBaseline,
    Drawer,
    Box,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Container,
    Grid,
    Paper,
    Button,
    TextField
} from "@material-ui/core";

import { Menu, ChevronLeft } from "@material-ui/icons";

import { MainListItems } from "./components/listItems";

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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: "none",
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: 240,
    },
    logoutBtn: {
        color: "white",
        textDecoration: "none"
    },
    fixedWidth: {
        width: 400
    }
}));

function Settings(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(true);
    const [settings, setSettings] = useState([])
    const [portUserName, setPortUserName] = useState("")
    const [portName, setPortName] = useState("");
    const [portAbout, setPortAbout] = useState("")
    const [githubLink, setGithubLink] = useState("");
    const [linkedinLink, setLinkedinLink] = useState("");
    const [settingsId, setSettingsId] = useState({});

    const onChange = e => {
        setPortUserName(document.getElementById("portUserName").value);
        setPortName(document.getElementById("portfolioName").value);
        setPortAbout(document.getElementById("portfolioAbout").value)
        setGithubLink(document.getElementById("githubLink").value);
        setLinkedinLink(document.getElementById("linkedinLink").value);
    }

    useEffect(() => {
        getSettings()
    }, [])

    const getSettings = () => {
        axios.get("/api/settings")
            .then((response) => {
                setSettings(response.data);
                setSettingsId(response.data[0]._id)
            })
            .catch(() => {
                alert("error recieving settings");
            });
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const onLogoutClick = (e) => {
        e.preventDefault();
        props.logoutUser();
    };

    const onSubmit = e => {
        e.preventDefault();

        const settingsData = {
            portUserName,
            portName,
            portAbout,
            githubLink,
            linkedinLink,
            settingsId
        }

        props.settingsPost(settingsData)

        getSettings()
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, open && classes.appBarShift)}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(
                            classes.menuButton,
                            open && classes.menuButtonHidden
                        )}
                    >
                        <Menu />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        Portfolio Settings
                    </Typography>
                    <IconButton color="inherit">
                        <Typography
                            component="h1"
                            variant="h6"
                            noWrap
                            className={classes.title}
                        >
                            <Link
                                onClick={onLogoutClick}
                                className={classes.logoutBtn}
                                to="/login"
                                color="inherit"
                            >
                                Logout
                            </Link>
                        </Typography>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(
                        classes.drawerPaper,
                        !open && classes.drawerPaperClose
                    ),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeft />
                    </IconButton>
                </div>
                <Divider />
                <List><MainListItems /></List>
                <Divider />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <h2 style={{ textAlign: "center" }}>Portfolio Settings</h2>
                                {settings.map((data) => {
                                    return (
                                        <div key={data._id}>
                                            <p><strong>Username:</strong> {data.portUserName}</p>
                                            <p><strong>Portfolio Name:</strong> {data.portName}</p>
                                            <p><strong>About Me:</strong> {data.portAbout}</p>
                                            <p><strong>GitHub:</strong> <a target="_blank" rel="noopener noreferrer" href={data.githubLink}>{data.githubLink}</a></p>
                                            <p><strong>LinkedIn:</strong> <a target="_blank" rel="noopener noreferrer" href={data.linkedinLink}>{data.linkedinLink}</a></p>
                                        </div>
                                    )
                                })}
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <h2 style={{ textAlign: "center" }}>Edit the Portfolio Settings</h2>
                                <form className={classes.form && classes.fixedWidth} style={{ marginLeft: "auto", marginRight: "auto" }} noValidate onSubmit={onSubmit}>
                                    <TextField
                                        className={classes.fixedWidth}
                                        id="portUserName"
                                        label="Your Name"
                                        type="text"
                                        onChange={onChange}
                                    />
                                    <br />
                                    <TextField
                                        className={classes.fixedWidth}
                                        id="portfolioName"
                                        label="Portfolio Name"
                                        type="text"
                                        onChange={onChange}
                                    />
                                    <br />
                                    <TextField
                                        className={classes.fixedWidth}
                                        id="portfolioAbout"
                                        label="About Me"
                                        type="text"
                                        onChange={onChange}
                                    />
                                    <br />
                                    <TextField
                                        className={classes.fixedWidth}
                                        id="githubLink"
                                        label="GitHub Profile"
                                        type="text"
                                        onChange={onChange}
                                    />
                                    <br />
                                    <TextField
                                        className={classes.fixedWidth}
                                        id="linkedinLink"
                                        label="LinkedIn Profile"
                                        type="text"
                                        onChange={onChange}
                                    />
                                    <br />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        style={{ marginTop: 15, width: 400 }}
                                    >
                                        Save Settings
                                    </Button>
                                </form>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}

Settings.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, settingsPost })(Settings);
