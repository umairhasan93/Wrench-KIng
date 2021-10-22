import React, { useState } from "react";
import { useHistory } from 'react-router'
import { withRouter } from "react-router-dom";

function AdminSignIn() {
    const history = useHistory()
    const [state, setState] = useState({
        login: {
            email: "",
            password: "",
        },
        errors: {
            email: "",
            password: ""
        },
    })

    const handleEmailChange = (e) => {
        setState({ login: { ...state.login, email: e.target.value } });
    };

    const handlePasswordChange = (e) => {
        setState({ login: { ...state.login, password: e.target.value } });
    };

    const handleSubmit = () => {
        history.push('/home')
    }

    return (
        <div className={`signin-content col-md-6 show-log-pane`}>
            <h3 className='heading'>Welcome Admin</h3>
            <p className='para'>Please enter your username and password</p>
            <form>
                <div className='form-group'>
                    <label className='labeled'>Email Address</label><br />
                    <input
                        type='email'
                        autoComplete='username'
                        placeholder=''
                        className={'form-control'}
                        value={state.login.email}
                        onChange={handleEmailChange}
                    />

                </div>
                <div className='form-group'>
                    <label className='labeled'>Password</label><br />
                    <input
                        type='password'
                        autoComplete='current-password'
                        placeholder=''
                        className={'form-control'}
                        value={state.login.password}
                        onChange={handlePasswordChange}
                    />

                </div>

                <button className="btn btn-primary mt-4" onClick={handleSubmit} type='submit'>SignIn</button>
            </form>
        </div >
    )


}
export default withRouter(AdminSignIn)