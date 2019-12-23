import React from 'react'
import { connect } from 'react-redux'
import { getMusic } from '../actions/MusicActions'
import MusicItem from './MusicItem'

class MusicList extends React.Component{
    componentWillMount() {
            this.props.getMusic()
    }
    
    render(){
        return (
            <div>
                {this.props.myFav.music.map(song => <MusicItem key={song._id} song={song}/>)}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        myFav: state.music,
        auth: state.auth
    }
}
export default connect(mapStateToProps, { getMusic })(MusicList)
