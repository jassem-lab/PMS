import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom"

import { logoutUser } from "../../actions/authActions";
import { createProject } from "../../actions/postActions"

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
    TextField,
    Button
} from "@material-ui/core";

import { Menu, ChevronLeft } from "@material-ui/icons";

import { MainListItems } from "./components/listItems";

import axios from 'axios'

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
        width: 350,
    },
}));

function AddProject(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(true);
    const [title, setProjectTitle] = useState("");
    const [image, setImage] = useState("");
    const [imageName, setImageName] = useState("Choose Image")
    const [altTag, setAltTag] = useState("");
    const [description, setProjectDesc] = useState("");
    const [deployedLink, setDeployedLink] = useState("");
    const [repoLink, setRepoLink] = useState("");
    const [uploadedFile, setUploadedFile] = useState({}); // eslint-disable-line

    let history = useHistory();

    const onChange = () => {
        setProjectTitle(document.getElementById("projectTitle").value);
        setProjectDesc(document.getElementById("projectDesc").value);
        setAltTag(document.getElementById("altTag").value);
        setDeployedLink(document.getElementById("deployedLink").value);
        setRepoLink(document.getElementById("repoLink").value);
    }

    const onFileChange = e => {
        setImage(e.target.files[0]);
        setImageName(e.target.files[0].name);
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

    const onSubmit = async e => {
        e.preventDefault();

        const projectData = {
            title,
            description,
            imageName,
            altTag,
            deployedLink,
            repoLink
        }

        const formData = new FormData();

        formData.append('file', image)

        try {
            const res = await axios.post("/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            const { fileName, filePath } = res.data;

            setUploadedFile({ fileName, filePath })
        } catch (err) {
            if (err.response.status === 500) {
                console.log("There was an error with the server")
            } else {
                alert(err.response.data.msg)
            }
        }

        props.createProject(projectData)

        history.push("/dashboard")
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
                        Add Project
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
                        <Grid item xs={6} style={{ marginLeft: "auto", marginRight: "auto" }}>
                            <Paper className={classes.paper}>
                                <h2 style={{ textAlign: "center" }}>Add a New Project</h2>
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
                                            <input type="file" accept=".png,.jpg,.jpeg" className={classes.input} id="customFile" onChange={onFileChange} />
                                            {imageName}
                                        </label>
                                    </div>
                                    <br />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        style={{ marginTop: 5, width: 350 }}
                                    >
                                        Add Project
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

AddProject.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, createProject })(AddProject);
