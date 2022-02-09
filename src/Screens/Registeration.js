import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import '../styles.css'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { validateEmail, validatePassword, validateCnicNo, validateContactNo } from "../shared/utils";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import MaskedInput from 'react-text-mask'

const API = process.env.REACT_APP_API_KEY

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            marginLeft: theme.spacing(-1),
            marginTop: theme.spacing(1.2),
            width: theme.spacing(90),
            height: 'auto',
        },
    },

    heading: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 30
    },

    form: {
        height: 'auto',
        paddingBottom: 20

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
    const [name, setName] = useState("")
    const [cnicNo, setCnicNo] = useState('')
    const [contactNo, setContactNo] = useState("")
    const [address, setAddress] = useState("")
    const [mechanicType, setMechanicType] = useState("")
    const [speciality, setSpeciality] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [rating, setRating] = useState("2.0")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")

    // ERROR STATES 
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(false)
    const [emailError, setEmailError] = useState()
    const [passError, setPassError] = useState()
    const [cnicError, setCnicError] = useState()
    const [contactError, setContactError] = useState()
    const [nameError, setNameError] = useState()
    const [addressError, setAddressError] = useState()
    const [mechanicTypeError, setMechanicTypeError] = useState()
    const [specialityError, setSpecialityError] = useState()
    const [usernameError, setUsernameError] = useState()
    const [confirmpassError, setConfirmPassError] = useState()

    const handleNameChange = async (e) => {
        setName(e.target.value)
    };

    // const format = (value) => {
    //     return value.replace(/\s/g, "").match(/.{1,4}/g).join(" ").substr(0, 15) || ""
    // }

    const handleCnicNoChange = (e) => {
        setCnicError('')
        setCnicNo(e.target.value)
    };

    const handleContactNoChange = (e) => {
        setContactError('')
        setContactNo(e.target.value)
    };

    const handleAddressChange = (e) => {
        setAddressError('')
        setAddress(e.target.value)
    };

    const handleMechanicTypeChange = (e) => {
        setMechanicTypeError('')
        console.log(mechanicType)
        setMechanicType(e.target.value)

    };

    const handleSpecialityChange = (e) => {
        setSpecialityError('')
        setSpeciality(e.target.value)
    };

    const handleUserNameChange = (e) => {
        setUsernameError('')
        setUsername(e.target.value)
    };

    const handleEmailChange = (e) => {
        setEmailError('')
        setEmail(e.target.value)

    };

    const handlePasswordChange = (e) => {
        setPassError('')
        setPassword(e.target.value)
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassError('')
        setConfirmPassword(e.target.value)
    };

    const onBlurEmail = () => {
        console.log(email)
        if (!validateEmail(email)) {
            setEmailError('Invalid Email Entered')
            setEmail('')
        } else {
            setEmailError('')
        }
    }

    const onBlurCnic = () => {
        if (!validateCnicNo(cnicNo)) {
            setCnicError('Invalid CNIC Entered')
            setCnicNo('')
        } else {
            setCnicError('')
        }
    }

    const onBlurContact = () => {
        if (contactNo.length < 11) {
            setContactError('Number must be Atleast 11 digits')
            setContactNo('')
        } else {
            setContactError('')
        }
    }

    const selectSpeciality = () => {
        if (mechanicType === 'Car') {
            return (
                <Select
                    className={`selector ${specialityError ? "dirty-input" : ""}`}
                    value={speciality}
                    onChange={handleSpecialityChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >

                    <MenuItem value="Tuning">Tuning</MenuItem>
                    <MenuItem value="Axle">Axle</MenuItem>
                    <MenuItem value="A/C">A/C</MenuItem>
                </Select>
            )
        } else {
            return (
                <Select
                    className={`selector ${specialityError ? "dirty-input" : ""}`}
                    value={speciality}
                    onChange={handleSpecialityChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="All">
                        All
                    </MenuItem>
                </Select>
            )
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(mechanicType)
        console.log(speciality)
        if (name === '') {
            setNameError('Name Required')
            // console.log("EMPTY");
        }

        if (cnicNo === '') {
            setCnicError('CNIC Required')
        }

        if (contactNo === '') {
            setContactError('Contact Required')
        }

        if (address === '') {
            setAddressError('Address Required')
        }

        if (mechanicType === '') {
            setMechanicTypeError('Mechanic Type Required')
        }

        if (speciality === '') {
            setSpecialityError('Speciality Required')
        }

        if (username === '') {
            setUsernameError('Username Required')
        }

        if (email === '') {
            setEmailError('Email Required')
        }

        if (password === '') {
            setPassError('Password Required')
        }

        if (confirmpassword === '') {
            setConfirmPassError('Confirm Password Required')
        }

        if (password !== confirmpassword) {
            setMessage('Passwords Do Not Match')
            toast.error('❕ Password Do not Match')
            setConfirmPassword("");
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            let url = `${API}mechanics/register`

            const { data } = await axios.post(
                url,
                { name, cnicNo, contactNo, address, mechanicType, speciality, username, email, password, rating },
                config
            )
            console.log(data);
            if (data !== null) {
                toast('Mechanic Registered Successfully 😃')
                setName('')
                setCnicNo('')
                setContactNo('')
                setAddress('')
                setEmail('')
                setMechanicType('')
                setSpeciality('')
                setUsername('')
                setPassword('')
                setConfirmPassword('')
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
                <form className={classes.form}>
                    <div className='r'>
                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>Name<sup className="field-required">*</sup></label><br />
                            <input
                                type='text'
                                autoComplete='Name'
                                placeholder=''
                                className={`form-controlR ${nameError ? "dirty-input" : ""} `}
                                value={name}
                                onChange={handleNameChange}
                            />
                            {cnicError && (
                                <p className="errorR">{nameError}</p>
                            )}
                        </div>

                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>CNIC No<sup className="field-required">*</sup></label><br />
                            <MaskedInput
                                mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]}
                                guide={false}
                                type='text'
                                autoComplete='CNIC No'
                                placeholder='xxxxx-xxxxxxx-x'
                                className={`form-controlR ${cnicError ? "dirty-input" : ""} `}
                                value={cnicNo}
                                onChange={handleCnicNoChange}
                                onBlur={onBlurCnic}
                            />
                            {cnicError && (
                                <p className="errorR">{cnicError}</p>
                            )}
                        </div>

                    </div>
                    <div className='r'>
                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>Contact No<sup className="field-required">*</sup></label><br />
                            <MaskedInput
                                mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                                guide={false}
                                type='text'
                                autoComplete={'Contact No'}
                                placeholder=''
                                className={`form-controlR ${contactError ? "dirty-input" : ""}`}
                                value={contactNo}
                                onChange={handleContactNoChange}
                                onBlur={onBlurContact}
                            />
                            {contactError && (
                                <p className="errorR">{contactError}</p>
                            )}
                        </div>

                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>Address<sup className="field-required">*</sup></label><br />
                            <input
                                type='text'
                                autoComplete={'Address'}
                                placeholder=''
                                className={`form-controlR ${addressError ? "dirty-input" : ""}`}
                                value={address}
                                onChange={handleAddressChange}
                            />
                            {addressError && (
                                <p className="errorR">{addressError}</p>
                            )}

                        </div>
                    </div>

                    <div className='r'>
                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>Mechanic Type<sup className="field-required">*</sup></label><br />
                            <Select
                                className={`selector ${mechanicTypeError ? "dirty-input" : ""}`}
                                value={mechanicType}
                                onChange={handleMechanicTypeChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="Car">Car</MenuItem>
                                <MenuItem value="Bike">Bike</MenuItem>
                            </Select>
                            {mechanicTypeError && (
                                <p className="errorR">{mechanicTypeError}</p>
                            )}
                        </div>

                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>Speciality<sup className="field-required">*</sup></label><br />

                            {selectSpeciality()}


                            {specialityError && (
                                <p className="errorR">{specialityError}</p>
                            )}
                        </div>

                    </div>

                    <div className='r'>

                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>User Name<sup className="field-required">*</sup></label><br />
                            <input
                                type='text'
                                autoComplete='Text'
                                placeholder=''
                                className={`form-controlR ${usernameError ? "dirty-input" : ""}`}
                                value={username}
                                onChange={handleUserNameChange}
                            />
                            {usernameError && (
                                <p className="errorR">{usernameError}</p>
                            )}
                        </div>

                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>Email<sup className="field-required">*</sup></label><br />
                            <input
                                type='Email'
                                autoComplete='Email'
                                placeholder=''
                                className={`form-controlR ${emailError ? "dirty-input" : ""}`}
                                value={email}
                                onChange={handleEmailChange}
                                onBlur={onBlurEmail}
                            />
                            {emailError && (
                                <p className="errorR">{emailError}</p>
                            )}

                        </div>

                    </div>

                    <div className='r'>

                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>Password<sup className="field-required">*</sup></label><br />
                            <input

                                type='password'
                                autoComplete='Password'
                                placeholder=''
                                className={`form-controlR ${passError ? "dirty-input" : ""}`}
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            {passError && (
                                <p className="errorR">{passError}</p>
                            )}
                        </div>

                        <div className={classes.formgroup}>
                            <label className={classes.labeled}>Confirm Password<sup className="field-required">*</sup></label><br />
                            <input

                                type='password'
                                autoComplete='Confirm Password'
                                placeholder=''
                                className={`form-controlR ${confirmpassError ? "dirty-input" : ""} `}
                                value={confirmpassword}
                                onChange={handleConfirmPasswordChange}
                            />
                            {confirmpassError && (
                                <p className="errorR">{confirmpassError}</p>
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