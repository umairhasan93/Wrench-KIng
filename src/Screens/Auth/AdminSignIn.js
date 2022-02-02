import * as React from "react";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { css } from 'glamor'
// import { validateEmail } from "../../shared/utils";

const API = process.env.REACT_APP_API_KEY


class SignInAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: {
                username: "umair007",
                password: "63555",
            },
            errors: {
                username: "",
                password: "",
            },
        };
    }

    handleUserNameChange = (e) => {
        this.setState({ login: { ...this.state.login, username: e.target.value } });
    };

    handlePasswordChange = (e) => {
        this.setState({ login: { ...this.state.login, password: e.target.value } });
    };

    loginAdmin = (details) => {
        console.log(details.name);
        localStorage.setItem("@admin", JSON.stringify(details));
        this.props.history.push("/home");
        toast(`  👍🏻    Successfully Logged In By ${details.name}`)
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state.login;
        let errors = {};
        let error_ = false;

        if (username === "" || username === undefined) {
            errors.username = "UserName is required";
            error_ = true;
        }


        if (password === "" || password === undefined) {
            errors.password = "Password is required";
            error_ = true;
        }

        if (error_) {
            this.setState({ errors: { ...errors } });

            return;
        }

        this.setState({ errors: {} });

        try {
            const { login } = this.state;
            console.log(API);
            let url = `${API}admin/login`;
            console.log(url);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const requestOptions = {

                method: "POST",
                headers: myHeaders,
                // redirect: "follow",
                body: JSON.stringify({ username: login.username, password: login.password }),
            };

            fetch(url, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    if (result.role === 'admin') {

                        if (!(result.code < 200 || result.code >= 400)) {

                            this.loginAdmin(result);
                        }
                        else {
                            toast.error(`${result.message}`);
                        }
                    }
                })
                .catch((error) => {
                    this.setState({ error: error.message })
                });
        } catch (e) { }
    };

    render() {
        return (
            <div className={`signin-content col-md-6 show-log-pane`}>
                <h3 className='heading'>Welcome Admin</h3>
                <p className='para'>Please enter your credientials to proceed</p>
                <form>
                    <div className="form-group">
                        <label className="labeled">User Name</label><br />
                        <input
                            value={this.state.login.username}
                            onChange={this.handleUserNameChange}
                            type="email"
                            autoComplete={"username"}
                            className={`form-control ${this.state.errors.username ? "dirty-input" : ""
                                }`}
                            placeholder=""
                        />
                        {this.state.errors.username && (
                            <p className="error">{this.state.errors.username}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="labeled">Password</label><br />
                        <input
                            value={this.state.login.password}
                            onChange={this.handlePasswordChange}
                            type="password"
                            className={`form-control ${this.state.errors.password ? "dirty-input" : ""
                                }`}
                            autoComplete={"current-password"}
                            placeholder=""
                        />
                        {this.state.errors.password && (
                            <p className="error">{this.state.errors.password}</p>
                        )}
                    </div>

                    <button onClick={this.handleSubmit} className="btn btn-primary mt-4">
                        Login
                    </button>
                </form>
                <ToastContainer />
            </div>
        );
    }
}

export default withRouter(SignInAdmin);