import React, { useMemo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TabPanel, TabContext } from '@material-ui/lab';
import { TextareaAutosize, TextField, Button, InputLabel, MenuItem, FormControl, Select, Box, Tab, Tabs, FormHelperText } from '@material-ui/core';
import { regex } from '@auth';
import moment from 'moment';
import axios from 'axios';

const registerkyc = (props) => {
    const [userData, setUserData] = useState({});
    const { register, handleSubmit, watch, formState: { errors } } = useForm({defaultValues:  props.formval});
    const [result, setResult] = useState(null);
    const imageurl = "/img/profile.png";
    return (
        <>
            <Box className="flex flex-wrap" sx={{ width: '100%', typography: 'body1' }}>
                <div className="w-full md:w-2/12 px-4">
                    <img src={imageurl} alt={"n.text"} className="profileImage" />
                </div>
                <div className="w-full md:w-10/12 px-4">
                    <TabContext value={props.value}>
                        <TabPanel value="1">
                            <form >
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
                                            // defaultValue={props.formval.gender}
                                            label="Gender"
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
                                    <span>
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
                                    </span>
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

                                </div>
                                
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
