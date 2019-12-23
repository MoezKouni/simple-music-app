import React from 'react'
import { connect } from 'react-redux'
import { deleteMusic, saveMusic } from '../actions/MusicActions'

const MusicItem = ({song, deleteMusic, saveMusic}) => {
    return (
        <div className="card fav-item">
            <div className="infos">
                <div className="row align-items-center">
                    <div className="col-md-4 col-xs-12">
                        <img className="singer-img" src={song.singerImg} alt="..."/>

                    </div>
                    <div className="col-md-2 col-xs-12">
                        <button className="btn btn-info mb-md-2 mt-xs-2" onClick={() => saveMusic(song)}><i className="far fa-edit"></i></button>
                        <button className="btn btn-danger mt-xs-2" onClick={() => deleteMusic(song._id)}><i className="far fa-trash-alt"></i></button>
                    </div>
                    <div className="col-md-6 col-xs-12">
                        <h2>{song.singer}</h2>
                        <p>{song.song}</p>
                    </div>
                </div>
            </div>
            <iframe title={song.id} width="100%" height="315" src={song.video} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            
        </div>
    )
}

export default connect(null, { saveMusic, deleteMusic })(MusicItem)
