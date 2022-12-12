import Admin from "layouts/Admin.js";
import React, { useReducer, useEffect, useRef, useState } from 'react';
import { TabContext, TabPanel } from '@material-ui/lab';
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios';
import { Box, Tab, TextField, Tabs, Button, } from '@material-ui/core';
import api from "@api";
import { getMyPAN, selectMyPan } from './store/panUser'

const index = () => {
    const [value, setValue] = useState('1');
    const [inputbox, setInputbox] = useReducer((state, newState) => ({ ...state, ...newState }), { ['pan']: '' });
    const [error, setError] = useReducer((state, newState) => ({ ...state, ...newState }), { ['pan']: false });
    const history = useRouter();
    const IJPJobPosting = useSelector(selectMyPan);
    const dispatch = useDispatch()
    const [clicked, setClicked] = useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function getValidation(val){
        (val.length > 15 || val.length<7 ) ? setError({ ['pan']: true }) : setError({ ['pan']: false });
    }
    function onInput(e) {
        setInputbox({ [e.target.name]: e.target.value});
        if(clicked) {getValidation(e.target.value)}
    }
    async function onSubmitPAN() {
        setClicked(true)
        getValidation(inputbox.pan)
        if(error.pan){return}

        let data = JSON.stringify({
            "customer_pan_number": inputbox.pan,
            "consent": "Y",
            "consent_text": "I hear by declare my consent agreement for fetching my information via ZOOP API."
        });

        let config = {
            method: 'post',
            url: 'http://3.110.130.147:8083/api/user/user-info/get-pan-details',
            headers: {
                'Authorization': api.token,
                'Content-Type': 'application/json'
            },
            data: data
        };
        dispatch(getMyPAN({"param": config}));
    }
    return (
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
                                    <div className="label">Enter PAN No</div>
                                    <TextField
                                        placeholder="Enter PAN No"
                                        InputProps={{ disableUnderline: true }}
                                        name="pan"
                                        fullWidth
                                        onKeyPress={(e) => { e.key === 'Enter' && onSubmitPAN() }}
                                        error={error.pan}
                                        value={inputbox.pan}
                                        onInput={event => onInput(event)}
                                        helperText={error.pan ? "Invalid pan no. Please contact support for mannual verification" : ""}
                                    />
                                    {/* <Button className="btn-primary" size="small" variant="contained">Proceed</Button> */}
                                    <Button color="primary"
                                        size="small"
                                        style={{marginTop:"20px"}}
                                        variant="contained"
                                        className="btn-primary"
                                        // disabled={error || !inputbox.verify}
                                        onClick={onSubmitPAN}>Proceed
                                    </Button>
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
    )
}
export default index
index.layout = Admin;
