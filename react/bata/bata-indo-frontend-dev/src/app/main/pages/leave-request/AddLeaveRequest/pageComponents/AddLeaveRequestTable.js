
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


export default function CreateRequestPage({ value, onChange, handleSave, handleSubmit }) {
    console.log("value",value);
    
    const classes = useStyles();
    const { form, setForm, handleChange, resetForm } = useForm({
        value
    });
    console.log("form",form);
    useEffect(() => {
        if (value) {
            setForm(value)
        }
    }, [setForm]);

    useEffect(() => {
        if (!_.isEqual(value,form)) {
            setForm(value)
        }
    }, [value]);

    useEffect(() => {
        onChange(form)
    }, [form])

    const onSaveClick = (e) => {
        e.preventDefault()
        handleSave(form);
       // resetForm();
    };

    const onSubmitClick = (e) => {
        e.preventDefault()
        handleSubmit(form);
       // resetForm();
    };

    const onCancelClick = (e) => {
        e.preventDefault();
        window.location.href="/hr-services/leave-requests";
    }

    const LeaveItems = [
        { id: 'specialLeave', title: 'Special Leave' },
        { id: 'annualLeave', title: 'Annual Leave' },
    ]
    
    const LeaveCategory = [
        { id: 'hi', title: 'Hi' }
    ]
    
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
                            name="empName"
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
                            name="empCode"
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
                            name="dsgName"
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
                            name="dptName"
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
                            name="locName"
                            value={form && form.locName}
                            disabled 
                        />

                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box display="flex" justifyContent='space-between' p={1} alignItems="center" paddingLeft={10} paddingRight={10}>
                        <FormControl>
                            <FormLabel>Type Of Leave</FormLabel>
                            <MuiRadioGroup row
                            disabled ={form && form.outcome && form.outcome.toUpperCase() !== "SUBMIT".toUpperCase() ? false : true}    
                            name="leaveType"
                                value={form.leaveType === "annualLeave" ? "annualLeave" : "specialLeave"}
                                onChange={handleChange}>
                                {
                                    LeaveItems.map(
                                        item => (
                                            <FormControlLabel 
                                            disabled ={form && form.outcome && form.outcome.toUpperCase() !== "SUBMIT".toUpperCase() ? false : true}
                                            key={item.id} value={item.id} control={<Radio />} label={item.title} />
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
disabled ={form && form.outcome && form.outcome.toUpperCase() !== "SUBMIT".toUpperCase() ? false : true}
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
                        disabled ={form && form.outcome && form.outcome.toUpperCase() !== "SUBMIT".toUpperCase() ? false : true}
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
                        disabled ={form && form.outcome && form.outcome.toUpperCase() !== "SUBMIT".toUpperCase() ? false : true}
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

                        <TextField
                            style={{ width: "50%", display : "none" }}
                            id={form.outcome}
                            name='leaveToDate'
                            id="leaveToDate"
                            value={form && form.outcome}
                            type='hidden'
                        />
                </Grid>
            </Grid>
            {
                form && form.outcome && form.outcome.toUpperCase() !== "SUBMIT".toUpperCase() ?
            <Box textAlign='center'>
                <Button className={classes.btn} color="secondary" variant="contained" onClick={onSaveClick}>Save </Button>
                <Button className={classes.btn} color="secondary" variant="contained" onClick={onSubmitClick}>Submit</Button>
                <Button className={classes.btn} color="secondary" variant="contained" onClick={onCancelClick}>Cancel</Button>
            </Box> : ""
            }
        </div>
    );
}
