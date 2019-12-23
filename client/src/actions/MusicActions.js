import { ADD_MUSIC, DELETE_MUSIC, UPDATE_MUSIC, SAVE_MUSIC, CLEAR_MUSIC, MUSIC_ERROR, REMOVE_CURRENT_MUSIC, GET_MUSIC } from './types'
import axios from 'axios'

// Get Music
export const getMusic = () => dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios.get('/api/music', config)
        .then(res => dispatch({
            type: GET_MUSIC,
            payload: res.data
        }))
        .catch(err => dispatch({
                type: MUSIC_ERROR,
                payload: err.response.msg
            })
            )
}

// Remove Current Music
export const removeCurrentMusic = () => dispatch => {
    dispatch({
        type: REMOVE_CURRENT_MUSIC
    })
}

// Add Music
export const addMusic = newMusic => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios.post('/api/music', newMusic, config)
        .then(res => dispatch({
            type: ADD_MUSIC,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: MUSIC_ERROR,
            payload: err.response.msg
        }))
    
}

export const deleteMusic = id => dispatch =>{
    axios.delete(`/api/music/${id}`)
        .then(() => dispatch({
            type: DELETE_MUSIC,
            payload: id
        }))
        .catch(err => dispatch({
            type: MUSIC_ERROR,
            payload: err.response.msg
        }))
    
}

export const saveMusic = music => dispatch =>{
    dispatch({
        type: SAVE_MUSIC,
        payload: music
    })
}

export const editMusic = updatedMusic => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios.put(`/api/music/${updatedMusic._id}`, updatedMusic, config)
        .then(res => dispatch({
            type: UPDATE_MUSIC,
            payload: updatedMusic
        }))
        .catch(err => dispatch({
            type: MUSIC_ERROR,
            payload: err.response.msg
        }))
    
}

export const clearMusic = () => dispatch => {
    dispatch({
        type: CLEAR_MUSIC
    })
}