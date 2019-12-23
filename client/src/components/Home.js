import React from 'react'
import MusicList from './MusicList'
import MusicForm from './MusicForm'
import { connect } from 'react-redux'
import { loadUser } from '../actions/AuthActions'

class Home extends React.Component {
    componentWillMount() {
        this.props.loadUser()
    }
    
    render(){
        return (
            <div>
                <div className="row mt-4">
                    <div className="col-md-6 col-sm-12">
                        <MusicForm />
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <MusicList/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { loadUser })(Home)
