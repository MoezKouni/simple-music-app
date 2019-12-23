import React, { Component } from 'react'
import uuid from 'uuid'
import { setAlert, removeAlert } from '../actions/AlertActions'
import { register, clearError } from '../actions/AuthActions'
import { connect } from 'react-redux'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        }
    }
    
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    registerNow = () => {
        if(this.state.firstname === '' || this.state.lastname === '' || this.state.email === '' || this.state.password === ''){
            let id = uuid()
            this.props.setAlert('All fields are required', 'warning', id)
            setTimeout(() => {
                this.props.removeAlert(id)
            }, 5000);
        }else{
            this.props.register({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password,
            })
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/')
        }
        if(nextProps.auth.error === 'User already exists!!'){
            let id = uuid()
            this.props.setAlert(nextProps.auth.error, 'danger', id)
            setTimeout(() => {
                this.props.removeAlert(id)
                this.props.clearError()
            }, 5000);
        }
    }
    render() {
        return (
            <div className="register-form">
                <h1>Register Page</h1>
                <form>
                    <input name="firstname" type="text" onChange={this.handleChange} placeholder="Your first name" />
                    <input name="lastname" type="text" onChange={this.handleChange} placeholder="Your last name" />
                    <input name="email" type="text" onChange={this.handleChange} placeholder="Your email" />
                    <input name="password" type="password" onChange={this.handleChange} placeholder="Your password" />
                </form>
                <button onClick={this.registerNow} className="btn btn-info">REGISTER</button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        auth: state.auth
    }
}
export default connect(mapStateToProps, { setAlert, removeAlert, register, clearError })(Register)
