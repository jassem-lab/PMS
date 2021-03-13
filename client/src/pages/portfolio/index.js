import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginLeft: 25,
    marginRight: 25,
  },
  card: {
    marginLeft: 25,
    marginRight: 25,
    textAlign: "center",
  },
  button: {
    width: 100,
  },
}));

function FullWidthGrid(props, settingData) {
  const [portData, setPortData] = useState([]);
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    getPortData();
    getPortSettings();
  }, []);

  const getPortData = () => {
    axios
      .get("/api/portdata")
      .then((response) => {
        setPortData(response.data);
        console.log(response.data);
      })
      .catch(() => {
        alert("error recieving data");
      });
  };

  const getPortSettings = () => {
    axios
      .get("/api/settings")
      .then((response) => {
        setSettings(response.data[0]);
        console.log(response.data);
      })
      .catch(() => {
        alert("error recieving settings");
      });
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <Navbar
        name={settings.portName }
        linkedinLink={settings.linkedinLink}
        githubLink={settings.githubLink}
      />
      <div className={classes.root} style={{ paddingTop: 10 }}>
        <Grid container spacing={3}>
          <Grid item md={12}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {settings.portUserName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {settings.portAbout}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {portData.map((project) => {
            let imageElement;
            if (project.image === "Choose Image") {
              imageElement = <p></p>;
            } else {
              imageElement = <img alt={project.altTag} style={{ maxWidth: 400, marginTop: 10 }} src={require(`../../../public/uploads/${project.image}`)} />
            }
            return (
              <Grid key={project._id} item xs={12} sm={6}>
                <Paper className={classes.paper}>
                  <a style={{ fontWeight: 'bold', color: '#1E56A0', fontSize: 20 }}
                    rel="noopener noreferrer"
                    target="_blank"
                    href={project.deployedLink}
                  >
                    {project.title}
                    <Divider variant="middle" style={{ marginTop: 10 }} />
                  </a>
                  {imageElement}
                  <p>{project.description}</p>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={project.deployedLink}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ marginRight: 55, backgroundColor: '#F6F6F6' }}
                    >
                      View Deployed Application
                    </Button>
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={project.repoLink}
                  >
                    <Button variant="outlined" color="primary" style={{ backgroundColor: '#F6F6F6' }}>
                      View Repository for App
                    </Button>
                  </a>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default FullWidthGrid;
