import React from 'react'
import { logout } from '../actions/AuthActions'
import { removeCurrentMusic } from '../actions/MusicActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = props => {

    const logMeOut = () => {
        props.logout()
        props.removeCurrentMusic()
    }

    const userConnected = () => (
        <ul className="row d-flex w-25">
            <li className="col-8">
                Hello, { props.auth.user && props.auth.user.firstname + ' ' + props.auth.user.lastname}
            </li>
            <li className="col">
                <a className="logout" href="#!" onClick={logMeOut}>
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                </a>
            </li>
        </ul>
    )

    const guest = () => (
            <ul className="row d-flex w-25">
                <li className="col">
                    <Link id="menu-item" to="/register">Register</Link>
                </li>
                <li className="col">
                    <Link id="menu-item" to="/login">Login</Link>
                </li>
            </ul>
    )

    return (
        <div className="navbar">
            <h1>My Music</h1>
            {
                props.auth.isAuthenticated ? userConnected() : guest()
            }
        </div>
    )
}

const mapStateToProps = state => {
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logout, removeCurrentMusic })(Navbar)
