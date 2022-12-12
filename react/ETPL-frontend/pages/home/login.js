import React, { useReducer, useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import _ from 'lodash';
// import { useDispatch } from 'react-redux';
import { Button, TextField, Dialog, DialogContent, DialogContentText, IconButton } from '@material-ui/core';

export default function FormDialog(props) {
    // const dispatch = useDispatch();
    const [otp, setOTP] = useState(false);
    const [validation, setValidation] = useState(false);
    const [inputbox, setInputbox] = useReducer((state, newState) => ({ ...state, ...newState }), { ['mob']: '', ['otp']: '' });
    const [error, setError] = useReducer((state, newState) => ({ ...state, ...newState }), {});
    function onInput(e) {
        setInputbox({ [e.target.name]: e.target.value });
        setError({ "otp": false })
        if (validation && e.target.name =='mob') { getValidation(e.target.value) }
    }
    function getValidation(mobval) {
        if (mobval.trim().length != 10 || isNaN(mobval)) { setError({ "mob": true }); return false; }
        else { setError({ "mob": false }); return true; }
    }

    //Add send OTP Part here
    function otpClick() {
        setValidation(true);
        let valid = getValidation(inputbox.mob);
        if (!valid) { return }
        setOTP(true)
    }
    // Add Submit functionality here
    async function onSubmit() {
        if (inputbox.mob && inputbox.otp == "12345") {
            await localStorage.setItem('mob', inputbox.mob);
            props.tempLogin()
        }
        else {
            setError({ "otp": true });
            return;
        }
        props.handleClose()
    }
    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose} className="loginPopup">
                <DialogContent>
                    <IconButton style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={props.handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-5/12">
                            <div className="leftImg"><img src="/images/loginLeft-img.png" /></div>
                        </div>
                        <div className="w-full md:w-7/12"><div className="rightSecLogin"><h2>Login with PayBizz</h2>
                            {(!otp) ? <>  <div className="label">Enter Mobile No</div>
                                <TextField
                                    placeholder="Enter Mobile No"
                                    InputProps={{ disableUnderline: true }}
                                    name="mob"
                                    onKeyPress={(e) => { e.key === 'Enter' && otpClick() }}
                                    fullWidth
                                    error={error.mob}
                                    value={inputbox.mob}
                                    onInput={event => onInput(event)}
                                    helperText={error.mob ? "Please enter 10 digit mobile no." : ""}
                                />
                                <DialogContentText onClick={otpClick} style={{ cursor: "pointer", color: "#1976d2" }} className="loginOtpBtn">
                                    {"Get OTP"}
                                </DialogContentText>
                            </> :
                                <>
                                    <div style={{ fontWeight: '400', marginTop: '-40px', marginBottom: '25px' }} className="">OTP is sent successfully to your primary number XXXXXX{inputbox.mob.slice(-4)}</div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="label">Enter OTP</div>
                                        <div style={{ textAlign: 'right', cursor: "pointer", color: "#0f4a8a" }} className="label" onClick={otpClick}>Resend OTP</div>
                                    </div>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        placeholder="Enter OTP"
                                        InputProps={{ disableUnderline: true }}
                                        name="otp"
                                        fullWidth
                                        onKeyPress={(e) => { e.key === 'Enter' && onSubmit() }}
                                        error={error.otp}
                                        value={inputbox.otp}
                                        onInput={event => onInput(event)}
                                        helperText={error.otp ? "Please enter valid OTP" : ""}
                                    />
                                    <DialogContentText onClick={onSubmit} style={{ cursor: "pointer", color: "#1976d2" }} className="loginOtpBtn">
                                        Submit OTP
                                    </DialogContentText>
                                </>}
                        </div>
                        </div>
                    </div>

                </DialogContent>

            </Dialog>
        </div>
    );
}