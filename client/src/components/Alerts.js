import React from 'react'
import { Alert } from 'react-bootstrap'
import { connect } from 'react-redux'

const Alerts = props => {
    return (
        props.alerts.length > 0 && props.alerts.map(alert => (
            <Alert key={alert.id} variant={alert.type} className="mt-4">
                {alert.msg}
            </Alert>
        ))
        
    )
}
const mapStateToProps = state => {
    return{
        alerts: state.alert
    }
}
export default connect(mapStateToProps)(Alerts)
