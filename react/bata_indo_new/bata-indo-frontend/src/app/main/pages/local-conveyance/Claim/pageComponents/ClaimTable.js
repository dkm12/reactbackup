
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box, Button } from '@material-ui/core';

import ClaimTableFirstRow from './ClaimTableFirstRow';
import ClaimTableSecondRow from './ClaimTableSecondRow';

import FuseScrollbars from '@core/core/Scrollbars';


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

const rows = [
	{
		id: 'formLocation',
		align: 'center',
		disablePadding: false,
		label: 'From Location',
		sort: true
	},
	{
		id: 'toLocation',
		align: 'center',
		disablePadding: false,
		label: 'To Location',
		sort: true
	},
	{
		id: 'travelPurpose',
		align: 'center',
		disablePadding: false,
		label: 'Travel Purpose',
		sort: true
	},
	{
		id: 'modeOfTravel',
		align: 'center',
		disablePadding: false,
		label: 'Mode of Travel',
		sort: true
	},
	{
		id: 'travelDate',
		align: 'center',
		disablePadding: false,
		label: 'Travel Date',
		sort: true
	},
	{
		id: 'billNo',
		align: 'center',
		disablePadding: false,
		label: 'Bill No',
		sort: true
	},
	{
		id: 'amount',
		align: 'center',
		disablePadding: false,
		label: 'Amount',
		sort: true
	},
	{
		id: 'amount',
		align: 'center',
		disablePadding: false,
		label: 'Amount',
		sort: true
	},
	{
		id: 'attachment',
		align: 'center',
		disablePadding: false,
		label: 'Attachment',
		sort: true
	},
	{
		id: 'action',
		align: 'center',
		disablePadding: false,
		label: 'Action',
		sort: true
	}
];

export default function CreateRequestPage({value, onChange}) {
    const classes = useStyles();
    const [inputList, setInputList] = useState(
        [{
            lcId: "",
            fromLoc: "",
            toLoc: "",
            modeOfTravel: "",
            trvlPurpose: "",
            trvlDate: "",
            billNo: "",
            billAmt: "",
            lcdDistance: "",
            modeOfTrvlOth: "",
            upload: "",

        }]
    );
    const [secondInput, setSecondInput] = useState(
        [{
            remark: '',
            toalAmount: ''
        }]
    );
    const modeofTravels = [
        {
            value: 'travel1',
            label: 'Travel1'
        },
        {
            value: 'travel2',
            label: 'Travel2'
        },
        {
            value: 'travel3',
            label: 'Travel3'
        }
    ];
    const handleDataChange = ({ data, index }) => {
        let lc = inputList;
        lc[index] = data;
        setInputList(lc);
    }

    const handleSecondRow = ({ data, index }) => {
        let lc = secondInput;
        lc[index] = data;
        setSecondInput(lc);
    }


    const handleAddClick = () => {
        setInputList([...inputList, {
            lcId: "",
            fromLoc: "",
            toLoc: "",
            modeOfTravel: "",
            trvlPurpose: "",
            trvlDate: "",
            billNo: "",
            billAmt: "",
            lcdDistance: "",
            modeOfTrvlOth: "",
            upload: "",
        }]);
    };
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };
    return (
        <div className="w-full flex flex-col">
            <div>
            <Button className={classes.addBtn} onClick={() => handleAddClick()} color="primary" variant="contained" size="small"> Add New</Button>
            </div>
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                    <TableHead>
			            <TableRow className="h-48">
                            {rows.map(row => {
                                return (
                                    <TableCell
                                        className="p-4 md:p-8"
                                        key={row.id}
                                        align={row.align}
                                        padding={row.disablePadding ? 'none' : 'default'}
                                    >
                                        {row.label}
                                    </TableCell>
                                );
                            }, this)}
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {inputList.map((row, i) => (
                            <ClaimTableFirstRow
                                value={row}
                                key={i}
                                index={i}
                                onChange={data => handleDataChange(data, i)}
                                onDelete={() => handleRemoveClick(i)}
                                modeofTravel={modeofTravels}
                            />
                        ))}

                        {secondInput.map((row, i) => (
                            <ClaimTableSecondRow
                                value={row}
                                key={i}
                                index={i}
                                onChange={data => handleSecondRow(data, i)}
                            />
                        ))}


                    </TableBody>
                </Table>
                <Box textAlign='center'>
                    <Button className={classes.btn} color="secondary" variant="contained">Save </Button>
                    <Button className={classes.btn} color="secondary" variant="contained">Submit</Button>
                    <Button className={classes.btn} color="secondary" variant="contained">Cancel</Button>
                </Box>
        </div>
    );
}
