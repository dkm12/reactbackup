import FuseScrollbars from '@core/core/Scrollbars';
import _ from '@lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import React, { Component, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import ApprCard from './appreciation-card';
import FuseLoading from '@core/core/Loading';
import dateFunc from '@common/utils/dateFunc';
import { appreciationApi } from '../store/appreciationApi';
import history from '@history';
import SmartForm from '@smart-form';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import masterApi from '@common/utils/masterApi';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { closeDialog, openDialog } from 'app/store/core/dialogSlice';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import { showMessage } from 'app/store/core/messageSlice';
import { regex } from 'app/auth';
import { Label, GetLabel } from '@common/utils/label';
import Head from '@components/Table/head';

const columns = [
	{
		id: 'fullname',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00184" />,
		sort: true
	},
	{
		id: 'empCode',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00185" />,
		sort: true
	},
	{
		id: 'dsgCode',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00072" />,
		sort: true
	},
	{
		id: 'dptCode',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00073" />,
		sort: true
	},
	{
		id: 'officialEmailId',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00082" />,
		sort: true
	},
	{
		id: 'locCode',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00074" />,
		sort: true
	},
	{
		id: '-',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00195" />,
		sort: false
	}
];
function getModalStyle() {
	return {
		top: `10%`,
		left: `20%`,
		right: `20%`,
		bottom: `10%`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
	tab: {
		width: '150px',
		height: '40px',
		backgroundColor: '#e2001a',
		position: 'absolute',
		top: '-60px',
		left: '0'
	},
	paper: {
		position: 'absolute',
		// overflowY: 'scroll',
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	noData: {
		color: theme.palette.text.secondary,
		marginLeft: 'auto',
		marginRight: 'auto',
		paddingTop: '16px',
		paddingBottom: '20px',
		fontSize: 'larger',
		fontWeight: 'bold'
	},
	avatar: {
		backgroundColor: red[500],
	},
	contentScroll: {
		overflowY: 'unset'
	},
	smartForm2: {
		marginTop: '0px',
		marginBottom: '10px',
		marginLeft: '12px',
		marginRight: '12px'
	},
}));

const DialogTitle = withStyles(useStyles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle className={classes.root} {...other}>
			<Typography>{children}</Typography>
		</MuiDialogTitle>
	);
});
const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
		minHeight: '400px',
		'& h2': {
			fontSize: '1.6rem',
			fontWeight: '700'
		}
	},
}))(MuiDialogContent);

function UserListingTable(props) {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const dispatch = useDispatch();
	const [desigList, setDesigList] = useState([]);
	const [deptList, setDeptList] = useState([]);
	const [orgValue, setOrgValue] = useState([]);
	const [usersList, setUsersList] = useState([]);
	const [masterDataLoad, setMasterDataLoad] = useState(false);
	const [totalRecords, setTotalRecords] = useState(0);
	const [data, setData] = useState({});
	const [datamsg, setDatamsg] = useState('');
	const [subdata, setSubData] = useState({});
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [loading, setLoading] = useState(false);
	const [order, setOrder] = useState({});
	const [currColumn, setCurrColumn] = useState("");
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	useEffect(() => {
		async function getMaster() {
			if (masterDataLoad) { return; }

			let userData = await masterApi.getAllUsersData();
			const temp = [];
			_.isArray(userData)
				&& userData.map((d) => (temp.push({ value: d.employId, title: d.employId+' - '+d.fullname })));
			setUsersList(temp);

			let dsgList = await masterApi.getAllActivedesignation();
			let dptList = await masterApi.getAllActivedepartments();
			let orgList = await masterApi.getOrganizationalValues();

			for await (let item of dsgList) {
				setDesigList(desigList => [...desigList, { title: item.dsgName, value: item.dsgName }]);
			}
			for await (let item of dptList) {
				await setDeptList(deptList => [...deptList, { title: item.dptName, value: item.dptName }]);
			}
			for await (let item of orgList.data) {
				setOrgValue(orgValue => [...orgValue, { title: item.orgValName, value: item.orgValCode + '._.' + item.orgValName }]);
			}

			await setMasterDataLoad(true);
		}
		getMaster();
	}, [dispatch])
	useEffect(() => {
		getUsersData(page, rowsPerPage, subdata);
	}, [page]);

	useEffect(() => {
		setPage(0);
		getUsersData(0, rowsPerPage, subdata);
	}, [rowsPerPage]);

	async function getUsersData(pgNo, pgSize, tempdata) {
		if (_.isEmpty(tempdata)) { return; }
console.log(tempdata)
		if (tempdata.dptCode || tempdata.empCode || tempdata.dsgCode || tempdata.fullname || tempdata.officialEmailId) {
			console.log("OK")
			let postData = {
				"pageNo": pgNo,
				"pageSize": pgSize,
				"dptCode": (tempdata.dptCode) ? tempdata.dptCode : null,
				"empCode": (tempdata.empCode) ? tempdata.empCode : null,
				"dsgCode": (tempdata.dsgCode) ? tempdata.dsgCode : null,
				"fullname": (tempdata.fullname) ? tempdata.fullname : null,
				"officialEmailId": (tempdata.officialEmailId) ? tempdata.officialEmailId : null,
				"sortBy": "state",
			}
			let getdata = await appreciationApi.getUsers(postData);
			console.log(getdata)
			if (getdata.status == '200') {
				setData(getdata.data);
				setTotalRecords(getdata.dataSize);
				setDatamsg('');
			}
			else {
				setData({});
				setTotalRecords(0);
				setDatamsg(getdata.message);
			}
		}
		else {
			console.log("Not")
			return;
		}
	}

	let template = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'top', type: 'flex' },
		sections: [
			{
				layout: { column: 2, spacing: 2, size: 'small', label: 'top', type: 'flex' },

				fields: [
					{
						type: 'autocomplete',
						name: 'fullname',
						id: 'fullname',
						options: usersList,
						title: `${GetLabel('BL00184')} / ${GetLabel('BL00185')}`,
						style: {
							minWidth: '25%'
						}
					},
					{
						type: 'email',
						name: 'officialEmailId',
						id: 'officialEmailId',
						title: GetLabel('BL00082'),
						style: {
							minWidth: '20%'
						}
					},
					{
						type: 'autocomplete',
						name: 'dsgCode',
						id: 'dsgCode',
						options: desigList,
						title: GetLabel('BL00072'),
						style: {
							minWidth: '20%'
						}
					},
					{
						type: 'autocomplete',
						name: 'dptCode',
						id: 'dptCode',
						options: deptList,
						title: GetLabel('BL00073'),
						style: {
							minWidth: '20%'
						}
					},

				]
			}

		]
	};

	let templateModal = {
		layout: { column: 1, spacing: 2, size: 'medium', label: 'fixed', type: 'grid' },
		sections: [
			{
				layout: { column: 3, spacing: 2, size: 'medium', label: 'fixed' },

				fields: [
					{
						type: 'text',
						name: 'emp_code',
						id: 'emp_code',
						title: GetLabel('BL00185'),
						disabled: true
					},
					{
						type: 'text',
						name: 'official_email_id',
						id: 'official_email_id',
						title: GetLabel('BL00082'),
						disabled: true
					},
					{
						type: 'text',
						name: 'dpt_code',
						id: 'dpt_code',
						title: GetLabel('BL00073'),
						disabled: true
					},
					{
						type: 'text',
						name: 'loc_code',
						id: 'loc_code',
						title: GetLabel('BL00074'),
						disabled: true
					},
					{
						type: 'autocomplete',
						name: 'orgValues',
						id: 'orgValues',
						options: orgValue,
						title: GetLabel('BL00229'),
					},
					{
						type: 'textarea',
						name: 'message',
						id: 'message',
						title: GetLabel('BL00230'),
						pattern: {
							value: regex.maxSize250,
							message: 'Please enter right format and below 250 characters'
						},
						validationProps: {
							required: 'This is a mandatory field'
						},
					},
				]
			}

		]
	};

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';
		console.log(`property`, property)
		if (order[property] && order[property].direction === 'desc') {
			direction = 'asc';
		}
		setCurrColumn(property);
		setTimeout(() => {
			setOrder({
				...setOrder,
				[property]: {
					direction,
					id
				}
			});
		}, 0);
	}
	
	function handleClick(item) {
		console.log(item)
		// if (item.jrtJobId != null) {
		// 	props.history.push(`/app/jobs/refer-emp/application-form/${item.jrtJobId}/${item.id}`);
		// }
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}
	async function onSubmit(event) {
		console.log(event.data)
		if (!event.data.fullname && !event.data.dptCode && !event.data.dsgCode && !event.data.officialEmailId) { dispatch(showMessage({ message: 'Please enter any search criteria', variant: 'error' })); }
		let newObj = {};
		newObj.empCode = (event.data.fullname) ? event.data.fullname : null;
		// newObj.fullname = (event.data.fullname) ? event.data.fullname.title : null;
		newObj.dptCode = event.data.dptCode
		newObj.dsgCode = event.data.dsgCode
		newObj.officialEmailId = event.data.officialEmailId
		setSubData(newObj)
		await getUsersData(0, rowsPerPage, newObj);
	}
	async function onSubmitModal(event) {
		let postData = {
			"receiverEmpCode": event.data.emp_code,
			"orginationValuesCode": (event.data.orgValues) ? (event.data.orgValues).split('._.', 1)[0].trim() : '',
			"orginationValuesName": (event.data.orgValues) ? (event.data.orgValues).split('._.', 2)[0].trim() : '',
			"appreciationMsg": event.data.message
		}
		console.log(postData)
		let res = await appreciationApi.sendAppreciation(postData);
		console.log(res);
		if (res.status == '200') {
			dispatch(showMessage({ message: res.message, variant: 'success' }));
			dispatch(closeDialog());
		}
		else {
			dispatch(showMessage({ message: res.message, variant: 'error' }));
		}
	}

	function onCancel() {
		history.goBack();
	}

	// const body = (
	// 	<div style={modalStyle} className={classes.paper}>
	// 		<ApprCard data = {data}/>
	// 	</div>
	// );

	return (
		// (loading || !data.length) ?
		// 	<FuseLoading />
		// 	:
		<>
			<div className="p-16 sm:p-24" className={classes.smartForm2}>
				<SmartForm
					template={template}
					watchFields={['fullName']}
					onSubmit={onSubmit}
					onCancel={onCancel}
					buttons={['search']}
				/>
			</div>
			<div className="w-full flex flex-col">
				<FuseScrollbars className="flex-grow overflow-x-auto">
					<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
						<Head
							columns={columns}
							order={order}
							onRequestSort={handleRequestSort}
							rowCount={data.length}
						/>
						<TableBody>
						{_.orderBy(
							data,
							[
								o => {
									switch (order[currColumn] && order[currColumn].id) {
										case 'categories': {
											return o.categories[0];
										}
										default: {
											return o[order[currColumn] && order[currColumn].id];
										}
									}
								}
							],
							[order[currColumn] && order[currColumn].direction]
						)
								// .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map(n => {
									return (
										<TableRow
											className="h-64 cursor-pointer"
											hover
											role="checkbox"
											tabIndex={-1}
											key={n.id}
											onClick={event => handleClick(n)}
										>

											<TableCell className="p-4 	md:p-16" component="th" scope="row">
												<a onClick={event => handleClick(n)}>{n.fullname}</a>
											</TableCell>

											<TableCell className="p-4 md:p-16" component="th" scope="row">
												{n.emp_code}
											</TableCell>

											<TableCell className="p-4 md:p-16" component="th" scope="row">
												{n.dsg_code}
											</TableCell>

											<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
												{n.dpt_code}
											</TableCell>
											<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
												{n.official_email_id}
											</TableCell>
											<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
												{n.loc_code}
											</TableCell>
											<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
												<Button
													color="primary"
													variant="contained"
													className="mr-4 normal-case"
													onClick={() => dispatch(openDialog({
														children: (
															<>
																<DialogTitle id="customized-dialog-title" onClose={() => dispatch(closeDialog())}>
																	<CardHeader
																		avatar={
																			<Avatar aria-label="recipe" className={classes.avatar}>
																				{(data[0].fullname).slice(0, 1)}
																			</Avatar>
																		}
																		title={data[0].fullname}
																		subheader={data[0].dsg_code}
																	/>
																	<IconButton aria-label="close" className={classes.closeButton} onClick={() => dispatch(closeDialog())}>
																		<CloseIcon />
																	</IconButton>
																</DialogTitle>
																<DialogContent dividers className={classes.contentScroll}>
																	<div className="p-16 sm:p-24">
																		<SmartForm
																			defaultValues={data[0]}
																			template={templateModal}
																			watchFields={['fullname']}
																			onSubmit={onSubmitModal}
																			buttons={['send']}
																		/>
																	</div>
																</DialogContent>
															</>
														),
														fullWidth: true,
														maxWidth: "md"
													}))}
												>
													<span className="hidden sm:flex">Send</span>
												</Button>
												{/* <Modal
													open={open}
													onClose={handleClose}
													aria-labelledby="simple-modal-title"
													aria-describedby="simple-modal-description"
													style={{ overflow: 'scroll' }}
												>
													{body}
												</Modal> */}
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>

					</Table>
				</FuseScrollbars>
				{(_.isEmpty(data)) ?
					<div className={classes.noData}>{datamsg}</div>
					: null}
				{!(_.isEmpty(data)) ?
					<TablePagination
						className="flex-shrink-0 border-t-1"
						component="div"
						count={totalRecords}
						rowsPerPage={rowsPerPage}
						page={page}
						backIconButtonProps={{
							'aria-label': 'Previous Page'
						}}
						nextIconButtonProps={{
							'aria-label': 'Next Page'
						}}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					/> : null}
			</div>
		</>
	);
}

export default withRouter(UserListingTable);