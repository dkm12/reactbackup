import Admin from "layouts/Admin.js";
import { useState, useEffect, useRef } from "react";
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { TabContext } from '@material-ui/lab';
import { TabList } from '@material-ui/lab';
import { TabPanel } from '@material-ui/lab';
import Profile from "../KYC/profileContent"
const index = () => {
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <section className="contentSec">

                <div className="pageHeader">
                    <div className="container-fluid">
                        Home / Profile
                    </div>
                </div>
                <div className="walletWrap">
                    <div className="container-fluid">
                        <div className="grid grid-cols-2 gap-4 items-center">
                            <div>
                                <div className="flex items-center"><span className="kycImg flex"><img src="/images/kycImg.png" /></span>AePS Wallet <br />₹ 10000</div>

                            </div>
                            <div style={{ textAlign: "right" }}>
                                <div>Main Wallet<br />₹ 10000</div>

                            </div>
                        </div>
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
                                label="Personal Detail" value="1"
                            />
                            <Tab
                                className={(value == '2') ? "tablinks active" : "tablinks"}
                                style={{ textTransform: 'none' }}
                                label="Transactions" value="2"
                            />
                            <Tab
                                className={(value == '3') ? "tablinks active" : "tablinks"}
                                style={{ textTransform: 'none' }}
                                label="Create a ticket" value="3"
                            />
                            <Tab
                                className={(value == '4') ? "tablinks active" : "tablinks"}
                                style={{ textTransform: 'none' }}
                                label="Help and setting" value="4"
                            />
                            <Tab
                                className={(value == '5') ? "tablinks active" : "tablinks"}
                                style={{ textTransform: 'none' }}
                                label="Feedback" value="5"
                            />
                        </Tabs>
                    </Box>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <TabPanel value="1">
                                <Profile value={"1"} />
                            </TabPanel>
                            <TabPanel value="2">
                                Item Two
                            </TabPanel>
                            <TabPanel value="3">
                                Item Three
                            </TabPanel>
                            <TabPanel value="4">
                                Item Four
                            </TabPanel>
                            <TabPanel value="5">
                                Item Five
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
