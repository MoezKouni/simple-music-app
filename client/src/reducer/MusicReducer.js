import { ADD_MUSIC, DELETE_MUSIC, UPDATE_MUSIC, SAVE_MUSIC, CLEAR_MUSIC, MUSIC_ERROR, GET_MUSIC, REMOVE_CURRENT_MUSIC } from '../actions/types'

const initialState = {
    music: [],
    saved: null,
    error: null
    }

const MusicReducer = (state=initialState, action) => {
    switch(action.type){
        case GET_MUSIC:
            return {
                ...state,
                music: action.payload
            }
        case ADD_MUSIC:
            return {
                ...state,
                music: [action.payload, ...state.music]
            }
        case DELETE_MUSIC:
            return {
                ...state,
                music: state.music.filter(el => el._id !== action.payload)
            }
        case SAVE_MUSIC:
            return{
                ...state,
                saved: action.payload
            }
        case UPDATE_MUSIC:
            return {
                ...state,
                music: state.music.map(el => el._id === action.payload._id ? action.payload : el)
            }
        case CLEAR_MUSIC:
            return {
                ...state,
                saved: null
            }
        case MUSIC_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case REMOVE_CURRENT_MUSIC:
            return {
                ...state,
                music: []
            }
        default:
            return state
    }
}

export default MusicReducer