import React from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
    Dashboard,
    BarChart,
    PersonPin,
    Settings,
} from "@material-ui/icons";

export function MainListItems() {

    return (
        <div>
            <Link style={{ textDecoration: "none", color: "#696969" }} to="/dashboard">
                <ListItem button>
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
            </Link>
            <Link style={{ textDecoration: "none", color: "#696969" }} to="/dashboard/projects/new">
                <ListItem button>
                    <ListItemIcon>
                        <BarChart />
                    </ListItemIcon>
                    <ListItemText primary="Add Project" />
                </ListItem>
            </Link>
            <Link style={{ textDecoration: "none", color: "#696969" }} to="/dashboard/settings">
                <ListItem button>
                    <ListItemIcon>
                        <Settings />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
            </Link>
            <hr />
            <Link style={{ textDecoration: "none", color: "#696969" }} to="/" target="_blank">
                <ListItem button>
                    <ListItemIcon>
                        <PersonPin />
                    </ListItemIcon>
                    <ListItemText primary="View Portfolio" />
                </ListItem>
            </Link>
        </div>
    )
}