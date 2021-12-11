import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import '../styles.css'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { validateEmail, validatePassword, validateCnicNo, validateContactNo } from "../shared/utils";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            marginLeft: theme.spacing(-1),
            marginTop: theme.spacing(1.2),
            width: theme.spacing(90),
            height: theme.spacing(68),
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


}));



export default function Registeration() {

    const classes = useStyles();

    //DATA STATES
    const history = useHistory()
    const [name, setName] = useState()
    const [cnicNo, setCnicNo] = useState('')
    const [contactNo, setContactNo] = useState()
    const [shopNo, setShopNo] = useState()
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState({})
    const [confirmpassword, setConfirmPassword] = useState()

    // ERROR STATES 
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(false)
    const [invalid, setInvalid] = useState()
    const [passValidationError, setPassValidationError] = useState()
    const [cnicValidationError, setCnicValidationError] = useState()
    const [contactValidationError, setContactValidationError] = useState()

    const handleNameChange = async (e) => {
        setName(e.target.value)
    };

    const handleCnicNoChange = (e) => {
        setCnicNo(e.target.value)
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!validateCnicNo(cnicNo)) {
                setCnicValidationError('Invalid Cnic Number');

            } else {
                setCnicValidationError("")
                setCnicNo(cnicNo)
            }
        }, 5000);
        return () => clearTimeout(timeoutId);
    }, [cnicNo]);


    const handleContactNoChange = (e) => {
        setContactNo(e.target.value)
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!validateContactNo(contactNo)) {
                setContactValidationError('Invalid Contact Number');

            } else {
                setContactValidationError("")
                setContactNo(contactNo)
            }
        }, 10000);
        return () => clearTimeout(timeoutId);
    }, [contactNo]);

    const handleShopNoChange = (e) => {
        setShopNo(e.target.value)
    };

    const handleUserNameChange = (e) => {
        setUsername(e.target.value)
    };

    const handleEmailChange = (e) => {


    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    };



    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmpassword) {
            setMessage('Passwords Do Not Match')
            setConfirmPassword("");
        }

        if (name === null || cnicNo === null || contactNo === null || shopNo === null || username === null || email === null || password === null || confirmpassword === null) {
            toast.error('All Fields Are Required')
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            const { data } = await axios.post(
                'http://localhost:5000/api/mechanics/register',
                { name, cnicNo, contactNo, shopNo, username, email, password },
                config
            )
            console.log(data);
            if (data !== null) {
                toast('Mechanic Registered Successfully 😃')
            }

        } catch (error) {
            setError("Mechanic Already Exists")
            toast.error(error)
        }
    }



    return (
        <div className={classes.root}>

            <Paper elevation={10}>

                <h3 className={classes.heading}>Mechanic Registeration Form</h3>
                <form>
                    <div className='r'>
                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>Name<sup className="field-required">*</sup></label><br />
                            <input
                                type='text'
                                autoComplete='Name'
                                placeholder=''
                                className='form-controlR'
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>

                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>CNIC No<sup className="field-required">*</sup></label><br />
                            <input

                                type='text'
                                autoComplete='CNIC No'
                                placeholder=''
                                className={`form-controlR ${cnicValidationError ? "dirty-input" : ""} `}
                                value={cnicNo}
                                onChange={handleCnicNoChange}
                            />
                            {cnicValidationError && (
                                <p className="errorR">{cnicValidationError}</p>
                            )}
                        </div>

                    </div>
                    <div className='r'>
                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>Contact No<sup className="field-required">*</sup></label><br />
                            <input
                                type='text'
                                autoComplete={'Contact No'}
                                placeholder=''
                                className={`form-controlR ${contactValidationError ? "dirty-input" : ""}`}
                                value={contactNo}
                                onChange={handleContactNoChange}
                            />
                            {contactValidationError && (
                                <p className="errorR">{contactValidationError}</p>
                            )}
                        </div>

                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>Shop No<sup className="field-required">*</sup></label><br />
                            <input
                                type='text'
                                autoComplete={'Shop No'}
                                placeholder=''
                                className='form-controlR'
                                value={shopNo}
                                onChange={handleShopNoChange}
                            />
                        </div>



                    </div>
                    <div className='r'>

                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>User Name<sup className="field-required">*</sup></label><br />
                            <input
                                type='text'
                                autoComplete='Text'
                                placeholder=''
                                className='form-controlR'
                                value={username}
                                onChange={handleUserNameChange}
                            />
                        </div>

                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>Email<sup className="field-required">*</sup></label><br />
                            <input
                                type='Email'
                                autoComplete='Email'
                                placeholder=''
                                className='form-controlR'
                                value={email}
                                onChange={handleEmailChange}
                            />

                        </div>

                    </div>

                    <div className='r'>

                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>Password<sup className="field-required">*</sup></label><br />
                            <input

                                type='password'
                                autoComplete='Password'
                                placeholder=''
                                className='form-controlR'
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>

                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>Confirm Password<sup className="field-required">*</sup></label><br />
                            <input

                                type='password'
                                autoComplete='Confirm Password'
                                placeholder=''
                                className={`form-controlR ${message ? "dirty-input" : ""} `}
                                value={confirmpassword}
                                onChange={handleConfirmPasswordChange}
                            />
                            {message && (
                                <p className="errorR">{message}</p>
                            )}

                        </div>

                    </div>
                    <button className="btn mt-4 paperB" onClick={handleSubmit} type='submit'>Register</button>
                </form>

                <ToastContainer icon={true} />
            </Paper>
        </div>
    );
}