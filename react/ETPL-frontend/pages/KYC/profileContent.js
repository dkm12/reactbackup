import React, { useMemo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TabPanel, TabContext } from '@material-ui/lab';
import { TextareaAutosize, TextField, Button, InputLabel, MenuItem, FormControl, Select, Box, Tab, Tabs, FormHelperText } from '@material-ui/core';
import { regex } from '@auth';
import moment from 'moment';
import axios from 'axios';

const registerkyc = (props) => {
    const profileimg = "data:image/png;base64, "+props.formval.profileimg
    const [userData, setUserData] = useState({});
    const { register, handleSubmit, watch, formState: { errors } } = useForm({defaultValues:  props.formval});
    const [result, setResult] = useState(null);
    const imageurl = "/img/profile.png";
    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('aadhar_user')))
        console.log(props.formval.gender)
      }, [])
    const onSubmit = (data) => {
        setResult(JSON.stringify(data));
        let postData = data
        delete postData.check;
        delete postData.captcha
        console.log("POST", postData)

        let config = {
            method: 'post',
            url: 'http://3.110.130.147:8083/api/user/user-info/user/adduser',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJSb2xlIjoiIiwic3ViIjoiNzI5MDgwNzY5MSIsImV4cCI6MTYzODk3NzEwOCwiaWF0IjoxNjM4OTczNTA4fQ.Oe03q0lti4ZKZqZSj1ea23XPOAd0wdUd_DS8L27tnxrdfkisHLEh-Mkt8NVEVQbrIA6BuPIUpS40NMtmv6MENA',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(postData)
        };
          axios(config)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
    }
    return (
        <>
            <Box className="flex flex-wrap" sx={{ width: '100%', typography: 'body1' }}>
                <div className="w-full md:w-2/12 px-4">
                    <img src={profileimg} alt={"n.text"} className="profileImage" alt="KK"/>
                </div>
                <div className="w-full md:w-10/12 px-4">
                    <TabContext value={props.value}>
                        <TabPanel value="1">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid gap-4 items-center md:grid-cols-3 xs:grid-cols-12 sm:grid-cols-2">
                                    <span>
                                        <TextField
                                            fullWidth
                                            InputProps={{ disableUnderline: true }}
                                            {...register("aadharNo", { required: true, pattern: regex.aadharReg })}
                                            InputLabelProps={{ shrink: true }}
                                            placeholder="Type here"
                                            disabled={true}
                                            // error= {errors.aadharNo}
                                            label="Aadhar Number" />
                                        <div className="errorMessage">{errors.aadharNo && "Please enter valid aadhar No"}</div>
                                    </span>
                                    <span>
                                        <TextField
                                            fullWidth
                                            InputProps={{ disableUnderline: true }}
                                            InputLabelProps={{ shrink: true }}
                                            disabled={true}
                                            {...register("panNo", { required: true, pattern: regex.maxSize30 })}
                                            placeholder="Type here"
                                            label="PAN Number" />
                                        <div className="errorMessage">{errors.panNo && "Please enter valid PAN No"}</div>
                                    </span>
                                    <span>
                                        <TextField
                                            fullWidth
                                            InputProps={{ disableUnderline: true }}
                                            InputLabelProps={{ shrink: true }}
                                            {...register("fullName", { required: true, pattern: regex.maxSize30 })}
                                            disabled={true}
                                            placeholder="Type here"
                                            label="Full Name" />
                                        <div className="errorMessage">{errors.fullName && "Please enter valid Name"}</div>
                                    </span>
                                    <span>
                                        <TextField
                                            fullWidth
                                            InputProps={{ disableUnderline: true }}
                                            InputLabelProps={{ shrink: true }}
                                            disabled
                                            {...register("mobileNo", { required: true, pattern: regex.phoneReg })}
                                            placeholder="Type here"
                                            label="Mobile Number" />
                                        <div className="errorMessage">{errors.mobileNo && "Please enter valid mobile No"}</div>
                                    </span>
                                    <span>
                                        <TextField
                                            type="date"
                                            fullWidth
                                            InputProps={{ disableUnderline: true }}
                                            InputLabelProps={{ shrink: true }}
                                            {...register("dob", { required: true })}
                                            disabled
                                            placeholder="Type here"
                                            label="DOB" />
                                        <div className="errorMessage">{errors.dob && "Please enter valid DOB"}</div>

                                    </span>
                                    <span>
                                        <InputLabel shrink htmlFor="gender">Gender</InputLabel>
                                        <Select
                                            disableUnderline
                                            fullWidth
                                            defaultValue={props.formval.gender}
                                            label="Gender"
                                            disabled
                                            id="gender"
                                            {...register("gender", { required: true })}>
                                            <MenuItem value={""}>--Select--</MenuItem>
                                            <MenuItem value="M">Male</MenuItem>
                                            <MenuItem value="F">Female</MenuItem>
                                            <MenuItem value="O">Trans-Gender</MenuItem>
                                        </Select>
                                        <div className="errorMessage">{errors.gender && "Please select your gender"}</div>
                                    </span>
                                    <span>

                                        <TextField
                                            fullWidth
                                            InputProps={{ disableUnderline: true }}
                                            InputLabelProps={{ shrink: true }}
                                            {...register("emailId", { required: true, pattern: regex.emailReg })}
                                            defaultValue={""}
                                            placeholder="Type here"
                                            label="Email ID" />
                                        <div className="errorMessage">{errors.emailId && "Please enter valid email ID"}</div>
                                    </span>
                                    <span>
                                        <TextField
                                            fullWidth
                                            InputProps={{ disableUnderline: true }}
                                            InputLabelProps={{ shrink: true }}
                                            {...register("altmobileNo", { required: true, pattern: regex.phoneReg })}
                                            defaultValue={""}
                                            placeholder="Type here"
                                            label="Alternate Mobile Number" />
                                        <div className="errorMessage">{errors.altmobileNo && "Please enter valid mobile No"}</div>
                                    </span>
                                   {(props.formval.agentCategory != "normal_user") ? 
                                   <><span>
                                        <TextField
                                            fullWidth
                                            InputProps={{ disableUnderline: true }}
                                            InputLabelProps={{ shrink: true }}
                                            {...register("firmName", { required: true, pattern: regex.maxSize50 })}
                                            defaultValue={""}
                                            placeholder="Type here"
                                            label="Business Firm Name" />
                                        <div className="errorMessage">{errors.firmName && "Please enter valid firm name"}</div>
                                    </span>
                                    <span>
                                        <TextField
                                            fullWidth
                                            InputProps={{ disableUnderline: true }}
                                            InputLabelProps={{ shrink: true }}
                                            {...register("gstNo", { required: true })}
                                            defaultValue={""}
                                            placeholder="Type here"
                                            label="GST Number" />
                                        <div className="errorMessage">{errors.gstNo && "Please enter valid GST No"}</div>
                                    </span></>:null}
                                    <span>
                                        <TextField
                                            fullWidth
                                            InputProps={{ disableUnderline: true }}
                                            InputLabelProps={{ shrink: true }}
                                            {...register("state", { required: true })}
                                            disabled
                                            defaultValue={""}
                                            placeholder="Type here"
                                            label="State Name" />
                                        <div className="errorMessage">{errors.state && "Please enter valid state name"}</div>
                                    </span>
                                    <span>
                                        <TextField
                                            fullWidth
                                            InputProps={{ disableUnderline: true }}
                                            InputLabelProps={{ shrink: true }}
                                            {...register("city", { required: true })}
                                            disabled
                                            defaultValue={""}
                                            placeholder="Type here"
                                            label="City Name" />
                                        <div className="errorMessage">{errors.city && "Please enter valid city Name"}</div>
                                    </span>
                                    <span>
                                        <TextField
                                            fullWidth
                                            InputProps={{ disableUnderline: true }}
                                            InputLabelProps={{ shrink: true }}
                                            {...register("pin", { required: true })}
                                            disabled
                                            defaultValue={""}
                                            placeholder="Type here"
                                            label="PIN Code" />
                                        <div className="errorMessage">{errors.pin && "Please enter valid PIN Code"}</div>
                                    </span>
                                    {/* <span>
                                        <InputLabel shrink htmlFor="addressID">Address</InputLabel>
                                        <TextareaAutosize
                                            // fullWidthminRows={3}
                                            style={{ width: "100%" }}
                                            // InputProps={{ disableUnderline: true }}
                                            // InputLabelProps={{ shrink: true }}
                                            {...register("address", { required: true })}
                                            defaultValue={""}
                                            id="addressID"
                                            placeholder="Type here" />
                                        <div className="errorMessage">{errors.address && "Please enter valid address"}</div>
                                    </span> */}



                                </div>

                                <div className="grid gap-4 items-center md:grid-cols-3 xs:grid-cols-12 sm:grid-cols-2">
                                    <span>
                                        <TextField
                                            fullWidth
                                            InputProps={{ disableUnderline: true }}
                                            InputLabelProps={{ shrink: true }}
                                            {...register("captcha", { required: true })}
                                            defaultValue={""}
                                            placeholder="Type here"
                                            label="Type Captcha" />
                                        <div className="errorMessage">{errors.captcha && "Please enter valid captcha"}</div>
                                        
                                    </span>
                                </div>
                                <span>
                                    <div className="termsCondition mt-8 mb-8 flex">
                                        <span>
                                            <input type="checkbox"
                                                id="checkID"
                                                {...register("check", { required: true })}
                                            //  checked={inputbox.verify} 
                                            />
                                            <label htmlFor="checkID" className="ml-4" style={{ position: "absolute" }}> I agree to the terms & conditions</label>
                                            <div className="errorMessage">{errors.check && "This field is required"}</div>
                                        </span>
                                    </div>
                                </span>
                                <Button type="submit"
                                    size="small"
                                    variant="contained"
                                    className="btn-primary mr-4">Submit
                                </Button>
                                <Button type="reset ml-4"
                                    onClick={() => { setResult({}) }}
                                    size="small"
                                    variant="contained"
                                    className="btn-primary">Cancel
                                </Button>
                            </form>
                        </TabPanel>
                    </TabContext>
                </div>
            </Box>
        </>
    )
}

export default registerkyc
