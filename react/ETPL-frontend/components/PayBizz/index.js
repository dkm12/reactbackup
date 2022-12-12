import { useState, useEffect, useRef } from "react";
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { TabContext } from '@material-ui/lab';
import { TabList } from '@material-ui/lab';
import { TabPanel } from '@material-ui/lab';
const index = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>

            <section className="payBizz">
                <div className="container-fluid">
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-8/12 px-4">
                            <h2>Why choose PayBizz?</h2>
                            <div className="checkList">
                                <div className="listWrap">
                                    <div className="imgbox"><img src="/images/checkImg.jpg" /></div>
                                    <div className="decText">
                                        <div className="heading">Low cost</div>
                                        <p>Get your recharge to family and friends in minutes</p>
                                    </div>
                                </div>
                                <div className="listWrap">
                                    <div className="imgbox"><img src="/images/checkImg.jpg" /></div>
                                    <div className="decText">
                                        <div className="heading">Fast</div>
                                        <p>As a Digital, Data and Technology build and run services which are used by thousant of people every day.</p>
                                    </div>
                                </div>
                                <div className="listWrap">
                                    <div className="imgbox"><img src="/images/checkImg.jpg" /></div>
                                    <div className="decText">
                                        <div className="heading">Clean UI & Simple</div>
                                        <p>You get You can use these credits to take recharge.</p>
                                    </div>
                                </div>
                                <div className="listWrap">
                                    <div className="imgbox"><img src="/images/checkImg.jpg" /></div>
                                    <div className="decText">
                                        <div className="heading">Trust pay</div>
                                        <p>100% Payment Protection. Easy Return Policy.</p>
                                    </div>
                                </div>
                                <div className="listWrap">
                                    <div className="imgbox"><img src="/images/checkImg.jpg" /></div>
                                    <div className="decText">
                                        <div className="heading">100% Secure Payments</div>
                                        <p>Moving your card details to a much more secured place.</p>
                                    </div>
                                </div>
                                <div className="listWrap">
                                    <div className="imgbox"><img src="/images/checkImg.jpg" /></div>
                                    <div className="decText">
                                        <div className="heading">24X7 Support</div>
                                        <p>We're here to help. Have a query and need help ? Click here</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-4/12 px-4"><img className="pull-right" src="/images/mobileImg.png" /></div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="tabBox">
                        <div className="row">
                            <div className="col-md-12"><h2>How We Work ?</h2></div>
                        </div>
                        <Box className="tab" sx={{ width: '100%' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                textColor="primary"
                                indicatorColor="primary"
                                aria-label="primary tabs example"
                                indicatorColor="none"
                            >
                                <Tab className={(value == '1') ? "tablinks active" : "tablinks"} style={{ textTransform: 'none' }} label="Create an Account" value="1" />
                                <Tab className={(value == '2') ? "tablinks active" : "tablinks"} style={{ textTransform: 'none' }} label="Instant KYC" value="2" />
                                <Tab className={(value == '3') ? "tablinks active" : "tablinks"} style={{ textTransform: 'none' }} label="Ready To Use" value="3" />
                            </Tabs>
                        </Box>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <TabPanel value="1">
                                    <div className="tabBody">
                                        <div id="createAccount" className="tabcontent active">
                                            <div className="flex flex-wrap">
                                                <div className="w-full md:w-8/12 px-4">
                                                    <h4>Create an Account with PayBizz</h4>
                                                    <p className="mb-4">Welcome to Paybizz , Simple sign up process with 1 click
                                                    </p>
                                                    <div className="checkList">
                                                        <div className="listWrap">
                                                            <div className="imgbox"><img src="/images/checkImg.jpg" /></div>
                                                            <div className="decText">
                                                                <p>Enter your phone number</p>
                                                            </div>
                                                        </div>
                                                        <div className="listWrap">
                                                            <div className="imgbox"><img src="/images/checkImg.jpg" /></div>
                                                            <div className="decText">
                                                                <p>Verify  through OTP and ready to start</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full md:w-4/12 px-4">
                                                    <div className="payBizz-signUp">
                                                        <h4>PayBizz Sign up</h4>
                                                        <p className="mb-4">Welcome to PayBizz , Please Fill Out Mobile number for get started</p>
                                                        <form>
                                                            <div className="form-group mb-4">
                                                                <label for="number">Enter Mobile number</label>
                                                                <input type="number" className="form-control mt-2" placeholder="Enter mobile no." id="mobileNumber" />
                                                            </div>
                                                            <button type="submit" className="btn btn-sm btn-primary">Sign Up</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="instantKYC" className="tabcontent">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <h4>Instant KYC</h4>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="readyToUse" className="tabcontent">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <h4>Ready To Use</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel value="2">Item Two</TabPanel>
                                <TabPanel value="3">Item Three</TabPanel>
                            </TabContext>
                        </Box>
                        {/* <div className="tab">
                            <button className="tablinks active" onclick="payBizzTab(event, 'createAccount')">Create an Account</button>
                            <button className="tablinks" onclick="payBizzTab(event, 'instantKYC')">Instant KYC</button>
                            <button className="tablinks" onclick="payBizzTab(event, 'readyToUse')">Ready To Use</button>
                        </div> */}

                    </div>
                </div>
            </section>
        </>
    )
}

export default index
