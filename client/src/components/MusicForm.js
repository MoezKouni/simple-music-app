import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addMusic, editMusic, clearMusic } from '../actions/MusicActions'

class MusicForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singer: '',
            song: '',
            singerImg: '',
            video: ''
        }
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.save)
    }
    render() {
        return (
            <form>
                <div>
                    <label>Singer Name:</label>
                    <input onChange={this.handleChange} name="singer" type="text" value={this.state.singer}/>
                </div>
                <div>
                    <label>Song Name:</label>
                    <input onChange={this.handleChange} name="song" type="text" value={this.state.song}/>
                </div>
                <div>
                    <label>Image:</label>
                    <input onChange={this.handleChange} name="singerImg" type="text" value={this.state.singerImg}/>
                </div>
                <div>
                    <label>Video:</label>
                    <input onChange={this.handleChange} name="video" type="text" value={this.state.video}/>
                </div>
                <button className="btn-warning" onClick={e => {
                    e.preventDefault()
                    if(this.props.save){
                        this.props.editMusic(this.state)
                        this.props.clearMusic()
                    }else{
                        this.props.addMusic(this.state)
                    }
                    this.setState({singer: '', singerImg: '', song: '', video: ''})
                }}>{this.props.save ? 'EDIT MUSIC' : 'ADD MUSIC'}</button>
            </form>
        )
    }
}
const mapStateToProps = state => {
    return{
        save: state.music.saved
    }
}
export default connect(mapStateToProps, { addMusic, editMusic, clearMusic })(MusicForm)