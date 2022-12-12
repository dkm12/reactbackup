import React, { useEffect, useState } from "react";
import Admin from "layouts/Admin.js";
import { Box, Tab, Tabs } from '@material-ui/core';
import Profile from "./profileContent"
import moment from "moment";
export default function App() {
    const [value, setValue] = useState('1');
    const [userData, setUserData] = useState({});

    useEffect(() => {
        let temp = JSON.parse(localStorage.getItem('aadhar_user'));
        temp.dob = moment(moment(temp.dob, 'DD/MM/YYYY')).format('YYYY-MM-DD')
        temp.panNo = localStorage.getItem('panNo')
        temp.mobileNo = localStorage.getItem('mob')
        console.log(temp)
        setUserData(temp)
      }, [])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
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
                <h4 className="mb-4">Please fill your details for KYC</h4>
                {(userData.aadharNo)?<Profile value={value} formval={userData}/>:null}
            </div>
        </section>
    );
}
App.layout = Admin;
