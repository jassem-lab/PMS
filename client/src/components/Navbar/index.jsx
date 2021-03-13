import React from 'react';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MdExitToApp } from 'react-icons/md';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    palette: {
        
    },
    logoutBtn: {
        color: "#ffffff",
        textDecoration: "none",
        fontSize: "24px",
        marginTop: "3px",
        marginRight: "8px"
    },
    navColor: {
        backgroundColor: "#163172",
        color: "#ffffff"
    }
}));

function Navbar(props) {
        
    const classes = useStyles();
    
    return (
        <AppBar className={classes.navColor} position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    {props.name}
                </Typography>
                <a href={props.linkedinLink} className={classes.logoutBtn} rel="noopener noreferrer" target="_blank"><FaLinkedin /></a>
                <a href={props.githubLink} className={classes.logoutBtn} rel="noopener noreferrer" target="_blank"><FaGithub /></a>
                <Link onClick={props.btnAction} className={classes.logoutBtn} to="/login"><MdExitToApp /></Link>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar