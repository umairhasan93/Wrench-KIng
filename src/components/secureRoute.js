import * as React from 'react'
import { Redirect } from 'react-router'

const SecureRoute = (props) => {
    const Component = props.component
    const isAuthenticated = localStorage.getItem('@admin')

    return isAuthenticated ? (
        <Component />
    ) : (
        <Redirect to={{ pathname: '/admin.login' }} />
    )
}

export default SecureRoute
