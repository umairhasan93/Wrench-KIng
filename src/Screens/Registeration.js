import React, { useState } from "react";
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import '../styles.css'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            marginLeft: theme.spacing(),
            marginTop: theme.spacing(9),
            width: theme.spacing(90),
            height: theme.spacing(53.5),
        },
    },

    heading: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 30
    },

    row: {
        flexDirection: 'row'
    },

    formgroup: {
        marginBottom: 1,
        marginLeft: 60,
        color: '#8798ad',

    },

    labeled: {
        fontWeight: 400,
        color: '#8798ad',
        fontSize: 17,
    },

    formcontrol: {
        height: 40,
        borderRadius: 5,
        background: '#e0e7ff90',
        width: 250,
        marginTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        border: 1,
        borderColor: '#e0e7ff',
        fontSize: 16
    },
}));

export default function Registeration() {

    const classes = useStyles();

    const history = useHistory()
    const [state, setState] = useState({
        register: {
            firstname: "",
            lastname: "",
            contactNo: "",
            cnicNo: "",
            email: "",
            password: ""
        },

    })

    const handleFirstNameChange = (e) => {
        setState({ register: { ...state.register, firstname: e.target.value } });
    };

    const handleLastNameChange = (e) => {
        setState({ register: { ...state.register, lastname: e.target.value } });
    };

    const handleContactNoChange = (e) => {
        setState({ register: { ...state.register, contactNo: e.target.value } });
    };

    const handleCnicNoChange = (e) => {
        setState({ register: { ...state.register, cnicNo: e.target.value } });
    };

    const handleEmailChange = (e) => {
        setState({ register: { ...state.register, email: e.target.value } });
    };

    const handlePasswordChange = (e) => {
        setState({ register: { ...state.register, password: e.target.value } });
    };

    const handleSubmit = () => {
        history.push('/home')
    }

    return (
        <div className={classes.root}>


            <Paper elevation={5}>

                <h3 className={classes.heading}>Mechanic Registeration Form</h3>
                <form>
                    <div className='r'>
                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>First Name</label><br />
                            <input
                                type='text'
                                autoComplete='First Name'
                                placeholder=''
                                className={classes.formcontrol}
                                value={state.register.firstname}
                                onChange={handleFirstNameChange}
                            />
                        </div>

                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>Last Name</label><br />
                            <input
                                type='text'
                                autoComplete='last Name'
                                placeholder=''
                                className={classes.formcontrol}
                                value={state.register.lastname}
                                onChange={handleLastNameChange}
                            />
                        </div>

                    </div>
                    <div className='r'>
                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>Contact No</label><br />
                            <input
                                type='number'
                                autoComplete={'Contact No'}
                                placeholder=''
                                className={classes.formcontrol}
                                value={state.register.contactNo}
                                onChange={handleContactNoChange}
                            />
                        </div>


                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>CNIC No</label><br />
                            <input
                                type='number'
                                autoComplete='CNIC No'
                                placeholder=''
                                className={classes.formcontrol}
                                value={state.register.cnicNo}
                                onChange={handleCnicNoChange}
                            />
                        </div>


                    </div>
                    <div className='r'>

                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>Email</label><br />
                            <input
                                type='email'
                                autoComplete='Email'
                                placeholder=''
                                className={classes.formcontrol}
                                value={state.register.email}
                                onChange={handleEmailChange}
                            />
                        </div>

                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>Password</label><br />
                            <input

                                type='password'
                                autoComplete='Password'
                                placeholder=''
                                className={classes.formcontrol}
                                value={state.register.password}
                                onChange={handlePasswordChange}
                            />
                        </div>

                    </div>
                    <button className="btn mt-4 paperB" onClick={handleSubmit} type='submit'>SignIn</button>
                </form>

            </Paper>

        </div>
    );
}