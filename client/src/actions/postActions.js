import axios from 'axios';
import { GET_ERRORS } from './types'

export const settingsPost = (settingsData) => dispatch => {
    axios.put("/api/settings/edit/" + settingsData.settingsId, settingsData)
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

export const createProject = (projectData) => dispatch => {
    axios.post("/api/portdata/new", projectData)
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

export const deleteProject = (projectId) => dispatch => {
    axios.delete("/api/portdata/delete/" + projectId)
}

export const editProject = (projectData) => dispatch => {
    axios.put("/api/portdata/edit/" + projectData.id, projectData)
        .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}