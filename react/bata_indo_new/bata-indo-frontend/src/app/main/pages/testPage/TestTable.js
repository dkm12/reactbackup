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
import AboutTab from './tabs/AboutTab';
import PhotosVideosTab from './tabs/PhotosVideosTab';
import TimelineTab from './tabs/TimelineTab';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AlarmIcon from '@material-ui/icons/Alarm';
import SmartForm from '@smart-form';
import axios from 'axios';
import masterApi from '@common/utils/masterApi';
import api from '@api';
import History from '@components/History';
import TabPanel from '@components/TabPanel'
import { Label, GetLabel } from '@common/utils/label';
import SmartTable from '@smart-table';
import _ from '@lodash';

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

const data = [
	{ "id": 1, "first_name": "Eilis", "last_name": "Warbeys", "email": "ewarbeys0@ucsd.edu", "gender": "Genderqueer", "ip_address": "179.104.25.43" },
	{ "id": 2, "first_name": "Billy", "last_name": "Wylam", "email": "bwylam1@wunderground.com", "gender": "Genderfluid", "ip_address": "169.2.179.25" },
	{ "id": 3, "first_name": "Jamima", "last_name": "Fraczek", "email": "jfraczek2@dyndns.org", "gender": "Genderqueer", "ip_address": "243.27.54.231" },
	{ "id": 4, "first_name": "Flinn", "last_name": "O'Looney", "email": "folooney3@xrea.com", "gender": "Agender", "ip_address": "142.59.33.239" },
	{ "id": 5, "first_name": "Gran", "last_name": "Clague", "email": "gclague4@apple.com", "gender": "Agender", "ip_address": "209.164.225.157" },
	{ "id": 6, "first_name": "Ludovico", "last_name": "Piesing", "email": "lpiesing5@tuttocitta.it", "gender": "Male", "ip_address": "7.14.75.176" },
	{ "id": 7, "first_name": "Durante", "last_name": "Daft", "email": "ddaft6@netscape.com", "gender": "Genderqueer", "ip_address": "14.92.223.133" },
	{ "id": 8, "first_name": "Aggi", "last_name": "Glandfield", "email": "aglandfield7@istockphoto.com", "gender": "Female", "ip_address": "103.208.128.36" },
	{ "id": 9, "first_name": "Conan", "last_name": "D'Avaux", "email": "cdavaux8@stanford.edu", "gender": "Genderfluid", "ip_address": "90.141.44.134" }
]

function ProfilePage() {
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
						// cellEditable={{
						//   cellStyle: {},
						//   onCellEditApproved: (
						//     newValue,
						//     oldValue,
						//     rowData,
						//     columnDef
						//   ) => {
						//     return new Promise((resolve, reject) => {
						//       console.log("newValue: " + newValue);
						//       setTimeout(resolve, 4000);
						//     });
						//   },
						// }}

						options={{
							search: false,
							showTitle: false,
							actionsColumnIndex: -1
						}}
						// options={{
						// 	tableLayout: "fixed",
						// 	columnResizable: false,
						// 	headerSelectionProps: {
						// 		color: "primary",
						// 	},
						// 	selection: false,
						// 	selectionProps: (rowData) => {
						// 	rowData.tableData.disabled = rowData.name === "A1";
						// 		return {
						// 			disabled: rowData.name === "A1",
						// 			color: "primary",
						// 		};
						// 	},
						// 	pageSize: 5
						// }}
						// editable={{
						//   onBulkUpdate: (changedRows) =>
						//     new Promise((resolve, reject) => {
						//       console.log(changedRows);
						//       setTimeout(() => {
						//         {
						//           /* const data = this.state.data;
						//           data.push(newData);
						//           this.setState({ data }, () => resolve()); */
						//         }
						//         resolve();
						//       }, 1000);
						//     }),
						//   onRowAdd: (newData) =>
						//     new Promise((resolve, reject) => {
						//       setTimeout(() => {
						//         {
						//           /* const data = this.state.data;
						//           data.push(newData);
						//           this.setState({ data }, () => resolve()); */
						//         }
						//         resolve();
						//       }, 1000);
						//     }),
						//   onRowUpdate: (newData, oldData) =>
						//     new Promise((resolve, reject) => {
						//       setTimeout(() => {
						//         {
						//           /* const data = this.state.data;
						//           const index = data.indexOf(oldData);
						//           data[index] = newData;
						//           this.setState({ data }, () => resolve()); */
						//         }
						//         resolve();
						//       }, 1000);
						//     }),
						//   onRowDelete: (oldData) =>
						//     new Promise((resolve, reject) => {
						//       setTimeout(() => {
						//         {
						//           /* let data = this.state.data;
						//           const index = data.indexOf(oldData);
						//           data.splice(index, 1);
						//           this.setState({ data }, () => resolve()); */
						//         }
						//         resolve();
						//       }, 1000);
						//     }),
						// }}
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
	);
}


function onSubmit(values) {
	console.log(values);
}

function validate(watchValues, errorMethods) {
	let { errors, setError, clearErrors } = errorMethods;

	// Firstname validation
	if (watchValues && watchValues['firstname'] === 'Admin') {
		console.log(`watchValues`, watchValues)
		if (!errors['firstname']) {
			setError('firstname', {
				type: 'manual',
				message: 'You cannot use this first name'
			})
		}
	} else {
		if (errors && errors['firstname'] && errors['firstname']['type'] === 'manual') {
			clearErrors('firstname');
		}
	}
}


export default ProfilePage;
