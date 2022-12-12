
import FuseAnimate from '@core/core/Animate';
import FusePageSimple from '@core/core/PageSimple';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';
import FormData from 'form-data';

import SmartForm from '@smart-form';
import axios from 'axios';
import masterApi from '@common/utils/masterApi';
import api from '@api';
import History from '@components/History';
import TabPanel from '@components/TabPanel'

import SmartTable from '@smart-table';
import _ from '@lodash';

import { Label, GetLabel } from '@common/utils/label';


const useStyles = makeStyles(theme => ({
	layoutHeader: {
		height: 320,
		minHeight: 320,
		[theme.breakpoints.down('md')]: {
			height: 240,
			minHeight: 240
		}
	},
	firstIcon: {
		paddingLeft: 70
	}
}));


function TestPageContent(){

	const classes = useStyles();
	const tableRef = React.useRef();
    const dispatch = useDispatch();
	const [state, setstate] = useState({})
	const [success, setSuccess] = useState(null);
    const [masterData, setMasterData] = useState({});
		const [filter, setFilter] = useState({})


	async function getDropdownData() {
        let usersData = await masterApi.getAllUsers();
        let data = [];
        _.isArray(usersData)
            && usersData.map((d) => (data.push({ value: d.fullname, title: d.fullname + "(" + d.employId + ")" })));

        setMasterData(
            {
                users: data
            }
        );
    }
    useEffect(() => {
        getDropdownData();
    }, [dispatch]);
	
	async function onSubmit(event) {
		console.log(event.data)
		setFilter(event.data)
		setTimeout(() => {
			tableRef.current && tableRef.current.onQueryChange()
		}, 0);
	}


	let templateFilter = {
		layout: { column: 2, spacing: 2, size: 'small', label: 'top', type: 'flex' },
		sections: [
			{
				layout: { column: 2, spacing: 2, size: 'small', label: 'top', type: 'flex' },

				fields: [
					{
						type: 'date',
						name: 'claimFromDate',
						id: 'claimFromDate',
						title: "From Date"
					},
					{
						type: 'date',
						name: 'claimToDate',
						id: 'claimToDate',
						title: "To Date"
					},
					{
						type: 'number',
						name: 'fromAmount',
						id: 'fromAmount',
						title: "From Amount"
					},
					{
						type: 'number',
						name: 'toAmount',
						id: 'toAmount',
						title: "To Anount"
					},
					{
						type: 'autocomplete',
						name: 'empName',
						id: 'empName',
						options: _.isArray(masterData.users) && masterData.users,
						title: "Employee Name",
						style: {
							minWidth: '20%'
						}
					}

				]
			}

		]
	};

	const tableTemplate = {
		columns: [
			{
			  title: "Claim ID",
			  field: "trxNo"
			},
			{
			  title: "Employee Code",
			  field: "createdBy",
			  maxWidth: "200px"
			},
			{
			  title: "Employee Name",
			  field: "empName"
			},
			{
			  title: "Claim Date",
			  field: "createdOn"
			},
			{
			  title: "Total Claim Amount",
			  field: "totalAmt"
			},
			{
			  title: "Current Status",
			  field: "statusName"
			}
		]
	}


return (
		<div className="w-full flex flex-col">
			<FusePageSimple
			classes={{
				header: classes.layoutHeader,
				toolbar: 'px-16 sm:px-24'
			}}
			content={
				<>
					<div className="p-16 sm:p-24">
						<SmartForm
							template={templateFilter}
							onSubmit={onSubmit}
							// onCancel={onCancel}
							buttons={['search']}
						/>
					<SmartTable
						components={{
							Toolbar: (props) => (
							<>
								<div
									style={{
										height: "0px",
									}}
								>
								</div>
							</>
							),
						}}
						tableRef={tableRef}
						columns={tableTemplate.columns}
						data={query =>
							new Promise((resolve, reject) => {
						  let url = `http://k8s-batadev-ingressd-0836da90f9-944557268.ap-south-1.elb.amazonaws.com/api/local-claim/local-convy/for-approval-list`,
						  body = {
							  pageSize: query.pageSize,
							  pageNo: query.page
						  }
						  if(!_.isEmpty(filter)){
							body= {
								...body,
								...filter
							}
						  }
						  
						  axios.post(url, body).then(result => {
							  resolve({
								data: result.data.data.data,
								page: result.data.data.currentPage,
								totalCount: result.data.data.totalItems,
							  })
						  })
						})}
						title="Smart Table"
						onFilterChange={(appliedFilter) => {
							console.log("selected Filters : ", appliedFilter);
						}}
					

						options={{
							search: false,
							showTitle: false,
							actionsColumnIndex: -1
						}}
					
						localization={{
							body: {
							emptyDataSourceMessage: "No records to display",
							filterRow: {
								filterTooltip: "Filter",
								filterPlaceHolder: "Filtaaer",
							},
							},
						}}
						onSearchChange={(e) => console.log("search changed: " + e)}
						onColumnDragged={(oldPos, newPos) =>
							console.log(
							"Dropped column from " + oldPos + " to position " + newPos
							)
						}
						// parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
						/>
					</div>
					<div>
						<Label labelId="BL00168" />
						<Label labelId="BL00160" />
					</div>
				</>
			}
		/>
			
</div>
);

}


export default TestPageContent;