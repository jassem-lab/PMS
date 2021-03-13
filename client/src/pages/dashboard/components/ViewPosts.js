import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core'
import Title from './Title';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProject } from '../../../actions/postActions';
import { logoutUser } from '../../../actions/authActions'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
    textAlign: "center"
  },
  textCenter: {
    textAlign: "center"
  }
}));

function ViewPosts(props) {

  let history = useHistory()

  const [portData, setPortData] = useState([]);

  const getPortData = () => {
    axios.get("/api/portdata")
      .then((response) => {
        setPortData(response.data)
      })
      .catch(() => {
        alert("error recieving data")
      })
  }

  useEffect(() => {
    getPortData();
  }, []);

  const deletePost = (e) => {
    e.preventDefault();
    const projectId = e.target.parentNode.id
    axios.delete("/api/portdata/delete/" + projectId)
      .then(getPortData())
  }

  const editPost = (e) => {
    const projectId = e.target.parentNode.id;
    history.push("/dashboard/project/edit/" + projectId)
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>View Projects</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><Typography className={classes.textCenter} fontWeight="fontWeightBold" m={1}>Project Name</Typography></TableCell>
            <TableCell><Typography className={classes.textCenter} fontWeight="fontWeightBold" m={1}>Description</Typography></TableCell>
            <TableCell><Typography className={classes.textCenter} fontWeight="fontWeightBold" m={1}>Alternate Tag</Typography></TableCell>
            <TableCell><Typography className={classes.textCenter} fontWeight="fontWeightBold" m={1}>Actions</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {portData.map((project) => (
            <TableRow key={project._id}>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>{project.altTag}</TableCell>
              <TableCell className={classes.textCenter} id={project._id}><Button color="primary" onClick={editPost} id={project._id}>Edit</Button><Button color="secondary" onClick={deletePost} id={project._id}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        Showing all {portData.length} records
      </div>
    </React.Fragment >
  );
}

ViewPosts.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, deleteProject })(ViewPosts);