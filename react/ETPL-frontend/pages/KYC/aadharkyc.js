import Admin from "layouts/Admin.js";
import React, { useReducer, useEffect, useRef, useState } from 'react';
import { TabContext, TabPanel } from '@material-ui/lab';
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios';
import moment from 'moment';
import { Box, Tab, TextField, Tabs, Button, MenuItem, FormControl, Select, FormHelperText } from '@material-ui/core';
import { getMyAadhar, selectMyAadhar } from './store/userSlice'
import api from "@api";

const index = () => {
    const [value, setValue] = useState('1');
    const [req_id, setReq_id] = useState(null);
    const [inputbox, setInputbox] = useReducer((state, newState) => ({ ...state, ...newState }), { ['role']: 'normal_user', ['aadhar']: '', ['otp']: '', ['verify']: false });
    const [error, setError] = useReducer((state, newState) => ({ ...state, ...newState }), { ['role']: false, ['aadhar']: false, ['otp']: false, ['verify']: false });
    const history = useRouter();
    const [clicked, setClicked] = useState(false)
    const [firstpage, setfirstpage] = useState(true)
    
    const IJPJobPosting = useSelector(selectMyAadhar);
    const dispatch = useDispatch()
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function getValidation(val){
        (val.length != 12 || isNaN(val)) ? setError({ ['aadhar']: true }) : setError({ ['aadhar']: false });
    }
    function onInput(e) {
        const name = e.target.name;
        const newValue = e.target.value;
        if (name == "verify") setInputbox({ [name]: !inputbox.verify });
        if (name == "aadhar") {
            setInputbox({ [name]: newValue });
            if(clicked){getValidation(e.target.value)}
        }
    }

    async function onSubmitAadhar() {
        setClicked(true);
        getValidation(inputbox.aadhar)
        if (error.aadhar || !inputbox.verify) { return; }

        let data = JSON.stringify({
            "customer_aadhaar_number": inputbox.aadhar,
            "consent": "Y",
            "consent_text": "I hear by declare my consent agreement for fetching my information via ZOOP API."
        });

        let config = {
            method: 'post',
            url: 'http://3.110.130.147:8083/api/user/user-info/okyc-otp-request',
            headers: {
                'Authorization': api.token,
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(config)
        .then((response) => {
            console.log(response);
            if (response.data.status == '200' && response.data.data.result.is_otp_sent) {
                setReq_id(response.data.data.request_id)
                setfirstpage(false)
            }
            else {
                alert("Something went wrong")
            }
        })
        .catch((error) => {
            console.log(error);
            alert("Something went wrong")
        });
    }

    function onSubmitOTP() {
        console.log(inputbox)
        if (!inputbox.otp || error.otp) {
            setError({ ['otp']: true });
            return;
        }

        let data = JSON.stringify({
            "request_id": req_id,
            "otp": inputbox.otp,
            "consent": "Y",
            "consent_text": "I hear by declare my consent agreement for fetching my information via ZOOP API."
        });

        let config = {
            method: 'post',
            url: 'http://3.110.130.147:8083/api/user/user-info/okyc-request-verify',
            headers: {
                'Authorization': api.token,
                'Content-Type': 'application/json'
            },
            data: data
        };
        dispatch(getMyAadhar({"param": config, "aadhar": inputbox.aadhar, "role": inputbox.role}));

    }
    return (
        <>
            <section className="contentSec">

                <div className="pageHeader">
                    <div className="container-fluid">
                        Home / Manage User / KYC
                    </div>
                </div>

                <div className="container-fluid">
                    <Box sx={{ width: '100%' }} className="tabWrap">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="primary tabs example"
                        // indicatorColor="none"
                        >
                            <Tab
                                className={(value == '1') ? "tablinks active" : "tablinks"}
                                style={{ textTransform: 'none' }}
                                label="Update Your KYC" value="1"
                            />
                        </Tabs>
                    </Box>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <TabPanel value="1">
                                <div className="flex flex-wrap">
                                    <div className="w-full md:w-4/12 sm:w-6/12 px-4">
                                        <h4 className="mb-4">Please fill your details for KYC</h4>
                                        {(firstpage) ? <>
                                            <FormControl fullWidth error={error.role} style={{ paddingBottom: "10px" }}>
                                                <div className="label">Please select your role</div>
                                                <Select
                                                    fullWidth
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={inputbox.role}
                                                    error={error.role}
                                                    disableUnderline
                                                    name="role"
                                                    onChange={onInput}
                                                >
                                                    <MenuItem value={'normal_user'}>Normal User</MenuItem>
                                                    <MenuItem value={'retailer'}>Retailer</MenuItem>
                                                    <MenuItem value={20}>Distributor</MenuItem>
                                                    <MenuItem value={30}>Super Distributor</MenuItem>
                                                </Select>
                                                {(error.role) ? <FormHelperText>Please select your role</FormHelperText> : null}
                                            </FormControl>
                                            <div className="label">Enter Aadhar No</div>
                                            <TextField
                                                placeholder="Enter Aadhar No"
                                                InputProps={{ disableUnderline: true }}
                                                name="aadhar"
                                                onKeyPress={(e) => { e.key === 'Enter' && onSubmitAadhar() }}
                                                fullWidth
                                                error={error.aadhar}
                                                value={inputbox.aadhar}
                                                onInput={event => onInput(event)}
                                                helperText={error.aadhar ? "Invalid aadhar no. Please contact support for mannual verification" : ""}
                                            />
                                            <div className="termsCondition flex mb-5 mt-5" >
                                                <span >
                                                    <input type="checkbox" onClick={onInput} name="verify" onChange={(e) => { console.log(e) }} checked={inputbox.verify} />
                                                    <span className="ml-3" onClick={() => { onInput({ "target": { "name": "verify" } }) }}>
                                                        I agree to the
                                                        <span style={{ color: "#0f4a8a" }}>Terms & Conditions </span>
                                                        and consent to store my aadhar number in encrypted format for completing my minimum KYC
                                                    </span>
                                                </span>
                                                <br />

                                            </div>
                                            {/* <Button className="btn-primary" size="small" variant="contained">Proceed</Button> */}
                                            <Button color="primary"
                                                size="small"
                                                variant="contained"
                                                className="btn-primary"
                                                // disabled={error || !inputbox.verify}
                                                onClick={onSubmitAadhar}>Proceed
                                            </Button>
                                        </> :
                                            <>
                                                <div style={{ fontWeight: '600', color: "#0f4a8a", paddingBottom: "12px" }} >OTP sent to your mobile number linked with aadhar</div>
                                                <div className="label">Enter OTP</div>
                                                <TextField
                                                    placeholder="Enter OTP"
                                                    InputProps={{ disableUnderline: true }}
                                                    name="otp"
                                                    fullWidth
                                                    error={error.otp}
                                                    onKeyPress={(e) => { e.key === 'Enter' && onSubmitOTP() }}
                                                    value={inputbox.otp}
                                                    onInput={event => {setInputbox({ ['otp']: event.target.value });}}
                                                    helperText={error.otp ? "Please enter valid OTP" : ""}
                                                />
                                                <div className="label" style={{ textAlign: "right", cursor: "pointer", color: "#0f4a8a" }} onClick={onSubmitAadhar}>Resend OTP</div>
                                                <div className="termsCondition flex mb-5 mt-5" >
                                                    <Button color="primary"
                                                        size="small"
                                                        variant="contained"
                                                        className="btn-primary"
                                                        // disabled={error || !inputbox.verify}
                                                        onClick={onSubmitOTP}>Submit</Button>
                                                </div>
                                            </>}
                                    </div>
                                    <div className="w-full md:w-8/12 sm:w-6/12 px-4 kycImgBox">
                                        <img className="pull-right" src="/images/kycUpdate.png" />
                                    </div>
                                </div>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </div>

            </section>
        </>
    )
}

export default index
index.layout = Admin;

