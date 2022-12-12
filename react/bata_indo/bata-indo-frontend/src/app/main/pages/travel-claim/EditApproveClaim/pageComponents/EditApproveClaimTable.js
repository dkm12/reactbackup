
import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    TextField,
    RadioGroup as MuiRadioGroup,
    FormControlLabel,
    Select as MuiSelect,
    Radio,
    FormControl,
    FormLabel, InputLabel, MenuItem, Grid, Typography, makeStyles
} from '@material-ui/core';
import useForm from '@core/hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import FuseScrollbars from '@core/core/Scrollbars';
import _ from '@lodash';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        overflowX: 'hide',
    },
    addBtn: {
        margin: theme.spacing(2),
        float: 'right'
    },
    table: {
        minWidth: 340,
    },
    tableCell: {
        align: "center",
        border: '1px solid'
    },
    btn: {
        margin: theme.spacing(1),
    },
}));


export default function CreateRequestPage({ editMode, value, onChange, handleAccept, handleReject, nextApprovers }) {
    console.log("value", value);

    const classes = useStyles();
    const { form, setForm, handleChange, resetForm } = useForm({
        value
    });
    console.log("form", form);
    useEffect(() => {
        if (value) {
            setForm(value)
        }
    }, [setForm]);

    useEffect(() => {
        if (editMode == true) {
            setForm(value)
        }
    }, [editMode]);

    useEffect(() => {
        onChange(form)
    }, [form])

    const onAcceptClick = (e) => {
        e.preventDefault()
        handleAccept(form);
        // resetForm();
    };

    const onRejectClick = (e) => {
        e.preventDefault()
        handleReject(form);
        // resetForm();
    };

    const onCancelClick = (e) => {
        e.preventDefault();
        window.location.href = "/hr-services/approve-leaves";
    }

    const LeaveItems = [
        { id: 'specialLeave', title: 'Special Leave' },
        { id: 'annualLeave', title: 'Annual Leave' },
    ]

    const LeaveCategory = nextApprovers;

    return (
        <div className="w-full flex flex-col">
            <Grid container>
                <Grid item xs={6} flexDirections="column" >
                    <Box display="flex" justifyContent='space-between' p={1} alignItems="center" paddingLeft={10} paddingRight={10}>
                        <Typography >Full Name</Typography>
                        <TextField
                            id={form.empName}
                            variant="outlined"
                            label="Full Name"
                            name="fullName"
                            value={form && form.empName}
                            disabled
                        />
                    </Box>
                    <Box display="flex" justifyContent='space-between' p={1} alignItems="center" paddingLeft={10} paddingRight={10}>
                        <Typography>Employee Code</Typography>
                        <TextField
                            id={form.employeeCode}
                            variant="outlined"
                            label="Employee Code"
                            name="employeeCode"
                            value={form && form.empCode}
                            disabled
                        />
                    </Box>
                    <Box display="flex" justifyContent='space-between' p={1} alignItems="center" paddingLeft={10} paddingRight={10}>
                        <Typography>Designation</Typography>
                        <TextField
                            id={form.designation}
                            variant="outlined"
                            label="Designation"
                            name="designation"
                            value={form && form.dsgName}
                            disabled
                        />

                    </Box>
                    <Box display="flex" justifyContent='space-between' p={1} alignItems="center" paddingLeft={10} paddingRight={10}>
                        <Typography>Department</Typography>
                        <TextField
                            id={form.department}
                            variant="outlined"
                            label="Department"
                            name="department"
                            value={form && form.dptName}
                            disabled
                        />

                    </Box>
                    <Box display="flex" justifyContent='space-between' p={1} alignItems="center" paddingLeft={10} paddingRight={10}>
                        <Typography>Location</Typography>
                        <TextField
                            id={form.location}
                            variant="outlined"
                            label="Location"
                            name="location"
                            value={form && form.locName}
                            disabled
                        />

                    </Box>

                    <Box display="flex" justifyContent='space-between' p={1} alignItems="center" paddingLeft={10} paddingRight={10}>
                        <Typography>Remarks</Typography>
                        <TextField
                            id={form.remarks}
                            variant="outlined"
                            label="Remarks"
                            name="remarks"
                            value={form && form.remarks}
                            multiline
                            rows={3}
                            onChange={handleChange}
                        />

                    </Box>

                </Grid>
                <Grid item xs={6}>
                    <Box display="flex" justifyContent='space-between' p={1} alignItems="center" paddingLeft={10} paddingRight={10}>
                        <FormControl>
                            <FormLabel>Type Of Leave</FormLabel>
                            <MuiRadioGroup row
                                name="leaveType"
                                value={form.leaveType === "annualLeave" ? "annualLeave" : "specialLeave"}
                                onChange={handleChange}>
                                {
                                    LeaveItems.map(
                                        item => (
                                            <FormControlLabel disabled key={item.id} value={item.id} control={<Radio />} label={item.title} />
                                        )
                                    )
                                }
                            </MuiRadioGroup>
                        </FormControl>

                    </Box>
                    {
                        form.leaveType === "specialLeave" ?

                            <Box display="flex" justifyContent='space-between' p={1} alignItems="center" paddingLeft={10} paddingRight={10}>
                                <Typography>Leave Category</Typography>
                                <FormControl variant="outlined" style={{ width: "50%" }}>
                                    <InputLabel>Leave Category</InputLabel>
                                    <MuiSelect

                                        label="Leave Category"
                                        name="leaveCategory"
                                        value={form && form.leaveCategory}
                                        onChange={handleChange}>
                                        <MenuItem value="">None</MenuItem>
                                        {
                                            LeaveCategory.map(
                                                category => (<MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>)
                                            )

                                        }
                                    </MuiSelect>
                                </FormControl>

                            </Box> : null
                    }
                    <Box display="flex" justifyContent='space-between' p={1} alignItems="center" paddingLeft={10} paddingRight={10}>
                        <Typography>Leave From Date</Typography>
                        <TextField
                            disabled
                            style={{ width: "50%" }}
                            variant="outlined"
                            id={form.leaveFrom}
                            name='leaveFrom'
                            id="leaveFrom"
                            value={form && form.leaveFrom}
                            label="Leave From Date"
                            onChange={handleChange}
                            type='date'
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </Box>
                    <Box display="flex" justifyContent='space-between' p={1} alignItems="center" paddingLeft={10} paddingRight={10}>
                        <Typography>Leave To Date</Typography>
                        <TextField
                            disabled
                            style={{ width: "50%" }}
                            variant="outlined"
                            id={form.leaveTO}
                            name='leaveTo'
                            id="leaveTo"
                            value={form && form.leaveTo}
                            label="Leave To Date"
                            onChange={handleChange}
                            type='date'
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </Box>
                    {
                        form.leaveType === "specialLeave" ?
                            <Box display="flex" justifyContent='space-between' p={1} alignItems="center" paddingLeft={10} paddingRight={10}>
                                <Typography>Attachment</Typography>
                                <TextField
                                    style={{ width: "50%" }}
                                    variant="outlined"
                                    id={form.attachment}
                                    name='attachment'
                                    id="attachment"
                                    value={form && form.attachment}
                                    onChange={handleChange}
                                    multiple
                                    type="file"
                                />
                            </Box>
                            : ""

                    }

                    <Box display="flex" justifyContent='space-between' p={1} alignItems="center" paddingLeft={10} paddingRight={10}>
                        <Typography>Next Approver</Typography>
                        <FormControl variant="outlined" style={{ width: "50%" }}>
                            <InputLabel>Next Approver</InputLabel>
                            <MuiSelect
                                disabled={form && form.statusName && form.statusName.toUpperCase() === "Pending With Reporting Manager".toUpperCase() ? false : true}
                                label="Next Approver"
                                name="pendingWith"
                                value={form && form.pendingWith}
                                onChange={handleChange}>
                                <MenuItem value="">None</MenuItem>
                                {
                                    _.isArray(LeaveCategory) && LeaveCategory.map(
                                        category => (<MenuItem key={category.employId} value={category.employId}>{category.fullname}</MenuItem>)
                                    )

                                }
                            </MuiSelect>
                        </FormControl>

                    </Box>

                    <TextField
                        style={{ width: "50%", display: "none" }}
                        id={form.outcome}
                        name='outcome'
                        id="outcome"
                        value={form && form.outcome}
                        type='hidden'
                    />
                    <TextField
                        style={{ width: "50%", display: "none" }}
                        id={form.outcome}
                        name='statusCode'
                        id="statusCode"
                        value={form && form.statusCode}
                        type='hidden'
                    />
                    <TextField
                        style={{ width: "50%", display: "none" }}
                        id={form.outcome}
                        name='statusName'
                        id="statusName"
                        value={form && form.statusName}
                        type='hidden'
                    />
                    <TextField
                        style={{ width: "50%", display: "none" }}
                        id={form.taxNo}
                        name='taxNo'
                        id="taxNo"
                        value={form && form.taxNo}
                        type='hidden'
                    />
                </Grid>
            </Grid>
            {
                form && form.statusCode && form.statusCode.toUpperCase() === "PENDING_WITH_RM".toUpperCase()
                    || form && form.statusCode && form.statusCode.toUpperCase() === "PENDING_WITH_L1".toUpperCase()
                    ?
                    <Box textAlign='center'>
                        <Button className={classes.btn} color="secondary" variant="contained" onClick={onAcceptClick}>Approve </Button>
                        <Button className={classes.btn} color="secondary" variant="contained" onClick={onRejectClick}>Reject</Button>
                        <Button className={classes.btn} color="secondary" variant="contained" onClick={onCancelClick}>Cancel</Button>
                    </Box> : <Box textAlign='center'>
                        <Button className={classes.btn} color="secondary" variant="contained" onClick={onCancelClick}>Cancel</Button>
                    </Box>
            }
        </div >
    );
}
