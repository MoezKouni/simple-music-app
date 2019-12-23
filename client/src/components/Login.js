import React, { Component } from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { login, clearError } from '../actions/AuthActions'
import { setAlert, removeAlert } from '../actions/AlertActions'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/')
        }
        if(nextProps.auth.error === 'Please Register Before!' || nextProps.auth.error === "Wrong Password"){
            let id = uuid()
            this.props.setAlert(nextProps.auth.error, 'warning', id)
            setTimeout(() => {
                this.props.removeAlert(id)
                this.props.clearError()
            }, 5000);
        }
    }

    loginNow = () => {
        if(this.state.email === '' || this.state.password === ''){
            let id = uuid()
            this.props.setAlert('Please enter your credentials before!', 'danger', id)
            setTimeout(() => {
                this.props.removeAlert(id)
            }, 5000)
        } else {
            this.props.login({
                email: this.state.email,
                password: this.state.password
            })
        }
    }
    render() {
        return (
            <div className="register-form">
                <h1>Login Page</h1>
                <form>
                    <input name="email" type="text" onChange={this.handleChange} placeholder="Your email" />
                    <input name="password" type="password" onChange={this.handleChange} placeholder="Your password" />
                </form>
                <button onClick={this.loginNow} className="btn btn-info">LOGIN</button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        auth: state.auth
    }
}
export default connect(mapStateToProps, { login, setAlert, removeAlert, clearError })(Login)
