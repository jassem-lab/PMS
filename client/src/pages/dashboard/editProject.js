import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom'
import { logoutUser } from "../../actions/authActions";
import { editProject } from '../../actions/postActions';
import './styles/fileUpload.css';

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
    Link,
    Button,
    TextField
} from "@material-ui/core";

import { Menu, ChevronLeft } from "@material-ui/icons";

import { MainListItems } from "./components/listItems";

import axios from 'axios';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="/">
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
    fixedWidth: {
        width: 400,
    }
}));

function EditProject(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(true);
    const [title, setProjectTitle] = useState("");
    const [altTag, setAltTag] = useState("");
    const [description, setProjectDesc] = useState("");
    const [deployedLink, setDeployedLink] = useState("");
    const [repoLink, setRepoLink] = useState("")
    const [oldProjectInfo, setOldProjectInfo] = useState([]);

    let history = useHistory()

    const onChange = e => {
        setProjectTitle(document.getElementById("projectTitle").value);
        setProjectDesc(document.getElementById("projectDesc").value);
        setAltTag(document.getElementById("altTag").value);
        setDeployedLink(document.getElementById("deployedLink").value);
        setRepoLink(document.getElementById("repoLink").value);
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

    const onSubmit = (e) => {
        e.preventDefault();

        let id = props.match.params.id

        const projectData = {
            id,
            title,
            altTag,
            description,
            deployedLink,
            repoLink
        }

        props.editProject(projectData)

        history.push("/dashboard")
    }

    useEffect(() => {
        axios.get("/api/portdata/" + props.match.params.id)
            .then((response) => {
                setOldProjectInfo(response.data)
                console.log(response.data)
            })
            .catch(() => {
                alert("error recieving data")
            })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
                        Edit Project
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
                        {/* Recent Posts */}
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <h2 style={{ textAlign: "center" }}>Current Project Information</h2>
                                <p><strong>Project Name:</strong> {oldProjectInfo.title}</p>
                                <p><strong>Project Desc:</strong> {oldProjectInfo.description}</p>
                                <p><strong>Alternate Text for Images:</strong> {oldProjectInfo.altTag}</p>
                                <p><strong>Deployed Link:</strong> <a rel="noopener noreferrer" target="_blank" href={oldProjectInfo.deployedLink}>{oldProjectInfo.deployedLink}</a></p>
                                <p><strong>Repository Link:</strong> <a rel="noopener noreferrer" target="_blank" href={oldProjectInfo.repoLink}>{oldProjectInfo.repoLink}</a></p>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>
                                <h2 style={{ textAlign: "center" }}>Edit Project Information</h2>
                                <form className={classes.form} noValidate onSubmit={onSubmit} style={{ marginLeft: "auto", marginRight: "auto" }}>
                                    <TextField
                                        className={classes.fixedWidth}
                                        style={{ marginTop: 5 }}
                                        id="projectTitle"
                                        label="Name of Project"
                                        type="text"
                                        onChange={onChange}
                                    />
                                    <br />
                                    <TextField
                                        className={classes.fixedWidth}
                                        style={{ marginTop: 5 }}
                                        id="projectDesc"
                                        label="Project Description"
                                        type="text"
                                        onChange={onChange}
                                    />
                                    <br />
                                    <TextField
                                        className={classes.fixedWidth}
                                        style={{ marginTop: 5 }}
                                        id="altTag"
                                        label="Alternate Tags for Images"
                                        type="text"
                                        onChange={onChange}
                                    />
                                    <br />
                                    <TextField
                                        className={classes.fixedWidth}
                                        style={{ marginTop: 5 }}
                                        id="deployedLink"
                                        label="Link to Deployed Application"
                                        type="text"
                                        onChange={onChange}
                                    />
                                    <br />
                                    <TextField
                                        className={classes.fixedWidth}
                                        style={{ marginTop: 5 }}
                                        id="repoLink"
                                        label="Link to Application Repository"
                                        type="text"
                                        onChange={onChange}
                                    />
                                    <br />
                                    <br />
                                    {/* File Upload Stuff will go here */}
                                    <div className="custom-file">
                                        <label className="custom-file-upload">
                                            <input type="file" accept=".png,.jpg,.jpeg" className={classes.input} id="customFile" />
                                            Upload File
                                        </label>
                                    </div>
                                    <br />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        style={{ marginTop: 15, width: 400 }}
                                    >
                                        Save Changes
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

EditProject.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, editProject })(EditProject);
