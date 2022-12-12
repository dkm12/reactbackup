import FuseAnimate from '@core/core/Animate';
import FuseChipSelect from '@core/core/ChipSelect';
import FuseLoading from '@core/core/Loading';
import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import { useForm, useDeepCompareEffect } from '@core/hooks';
import FuseUtils from '@core/utils';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { saveLeaveRequest, newLeaveRequest, getLeaveRequest } from '../store/empLeaveRequestSlice';
import reducer from '../store';
import moment from 'moment';
import LeaveHistoryTable from '../LeaveHistory/LeaveHistoryTable';
import SmartForm from '@smart-form';
import masterApi from '@common/utils/masterApi';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import uploadDoc from '@common/utils/uploadDoc';
import History from '@components/History';
import { getLeaveHistorys, selectLeaveHistorys } from '../store/empLeaveHistorysSlice';
import { Label, GetLabel } from '@common/utils/label';

const useStyles = makeStyles(theme => ({
	productImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	productImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $productImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $productImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $productImageFeaturedStar': {
				opacity: 1
			}
		}
	},
	leaveSumry: {
		background: '#f6f7f9',
		'& h6': {
			fontWeight: 400
		}
	},
	avatar: {
		background: '#f6f7f9',
		color: '#e2001a',
		border: '1px solid rgba(0, 0, 0, 0.12)',
		marginLeft: 'auto',
	},
}));

function AddLeaveRequestRequest(props) {
	const dispatch = useDispatch();
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const userName = useSelector(({ auth }) => auth.user.name);
	const leaveRequestData = useSelector(({ leaveRequest }) => leaveRequest.empLeaveRequest);
	const theme = useTheme();

	const classes = useStyles(props);
	const routeParams = useParams();
	const [leaveCategories, setLeaveCategories] = useState([]);
	const [leaveBalance, setLeaveBalance] = useState({});

	const [loading, setLoading] = useState(false);

	const { leaveRequestId } = routeParams;
	const leaveHistorys = useSelector(selectLeaveHistorys);

	const [leaveRequest,setLeaveRequest]= useState(leaveRequestData);

	const [error, setError] = useState(false);


	console.log("leaveRequestData",leaveRequestData);
	console.log("leaveRequest",leaveRequest);
	useEffect(() => {
		console.log("error",error);
		setLoading(false);
		if(error===false)
		{
			setLeaveRequest(leaveRequestData);
		}
	}, [leaveRequestData]);


	console.log("leaveHistorys", leaveHistorys);
	let template = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
		//title: 'Job Application Form',
		description: 'Form for applying Job',
		sections: [
			{
				layout: { column: 2, spacing: 1, size: 'medium', label: 'fixed' },
				//title: 'Personal Information',
				id: 'leaveTypeSection',
				fields: [
					{
						type: 'radio',
						name: 'leaveType',
						id: 'leaveType',
						title: GetLabel('BL00169'),
						disabled: leaveRequest && leaveRequest.outcome && leaveRequest.outcome.toUpperCase() === "SUBMIT"  && error===false,
						options: [
							{ title: GetLabel('BL00163'), value: 'specialLeave' },
							{ title: GetLabel('BL00162'), value: 'annualLeave' }
						],
						validationProps: {
							required: 'This is a mandatory field'
						},
					},
					{
						type: 'select',
						name: 'leaveCategory',
						id: 'leaveCategory',
						title: GetLabel('BL00170'),
						options: leaveCategories,
						disabled: leaveRequest && leaveRequest.outcome && leaveRequest.outcome.toUpperCase() === "SUBMIT" && error===false,
						validationProps: {
							required: 'This is a mandatory field'
						},
						dynamic: {
							field: 'leaveType',
							value: 'specialLeave'
						}
					}
				]
			},
			{
				layout: { column: 2, spacing: 1, size: 'medium', label: 'fixed' },
				//title: 'Personal Information',
				id: 'leaveDateSection',
				fields: [
					{
						type: 'date',
						name: 'leaveFrom',
						id: 'leaveFrom',
						title: GetLabel('BL00171'),
						disabled: leaveRequest && leaveRequest.outcome && leaveRequest.outcome.toUpperCase() === "SUBMIT" && error===false,
						validationProps: {
							required: 'This is a mandatory field',
							validate: [{
								condition: "leaveFrom <= leaveTo",
								message: "From Date should be less than or equal to To date."
							}]
						}
					},
					{
						type: 'date',
						name: 'leaveTo',
						id: 'leaveTo',
						title: GetLabel('BL00172'),
						disabled: leaveRequest && leaveRequest.outcome && leaveRequest.outcome.toUpperCase() === "SUBMIT" && error===false,
						validationProps: {
							required: 'This is a mandatory field',
							validate: [{
								condition: "leaveFrom <= leaveTo",
								message: "To Date should be greater than or equal to From date."
							}]
						}
					}
				]
			},
			{
				layout: { column: 2, spacing: 1, size: 'medium', label: 'fixed' },
				//title: 'Personal Information',
				id: 'specialLeaveSection',
				fields: [
					{
						type: 'file',
						name: 'attachmentFile',
						id: 'attachmentFile',
						title: 'Attachment',
						disabled: leaveRequest && leaveRequest.outcome && leaveRequest.outcome.toUpperCase() === "SUBMIT" && error===false,
						dynamic: {
							field: 'leaveType',
							value: 'specialLeave'
						}
					},
					{
						type: 'attachment',
						name: 'attachment',
						id: 'attachment',
						title: GetLabel('BL00123'),
						dynamic: {
							field: 'createdBy',
							value: uuid
						}
					},
				]
			}
		]
	};

	if (leaveRequest && 'outcome' in leaveRequest && leaveRequest.outcome.toUpperCase() === "SUBMIT"  && error===false) {
		delete template.sections[2].fields[0];
	}
	if (leaveRequest && 'leaveType' in leaveRequest && leaveRequest.leaveType !== "specialLeave") {
		delete template.sections[2].fields[1];
	}
	if (leaveRequest && 'attachment' in leaveRequest && (leaveRequest.attachment === "" || leaveRequest.attachment === null)) {
		delete template.sections[2].fields[1];
	}

	useDeepCompareEffect(() => {
		async function updateProductState() {
			const { leaveRequestId } = routeParams;

			let leaveCatData = await masterApi.getActiveLeaveCategories();
			let data = [];
			_.isArray(leaveCatData)
				&& leaveCatData.map((d) => (data.push({ value: d.lcCode, title: d.lcName })));
			//console.log("cityDropDown", data);
			setLeaveCategories(data);

			let leaveTakenData = await masterApi.getLeaveTaken(uuid);
			setLeaveBalance(leaveTakenData);

			if (leaveRequestId === 'new') {
				dispatch(newLeaveRequest(
					{
						uuid: uuid,
						userName: userName
					}
				));
			} else {
				dispatch(getLeaveRequest(routeParams));
				dispatch(getLeaveHistorys(routeParams));
			}
		}
		updateProductState();
		setLoading(false);
	}, [dispatch, routeParams]);



	// if ((!leaveRequest || (leaveRequest && routeParams.leaveRequestId !== leaveRequest.id)) && routeParams.leaveRequestId !== 'new') {
	// 	return <FuseLoading />;
	// }

	async function onSubmit(values) {
		console.log("values.data", values.data);
		let lrData = {};
		if (leaveRequest !== null) {
			lrData.id = leaveRequest.id;
		}
		else {
			lrData.id = null;
		}
		lrData.leaveType = values.data.leaveType;
		lrData.leaveFrom = values.data.leaveFrom;
		lrData.leaveTo = values.data.leaveTo;
		if (values.data.leaveType == "specialLeave") {
			console.log(values);
			console.log("values.data.attachmentFile", values.data.attachmentFile);
			console.log("values.data.attachmentFile", values.data.attachmentFile.length);
			let fileURL = values.data.attachment;
			if (values.data && values.data.attachmentFile && values.data.attachmentFile.length > 0) {
				let fileObj = values.data.attachmentFile[0];
				let fileData = await uploadDoc.saveDoc(fileObj, "leave");
				console.log("fileData", fileData);
				if (_.isArray(fileData) && fileData.length > 0) {
					fileURL = fileData[0].fileUrl;
				}
			}
			lrData.leaveCategory = values.data.leaveCategory;
			lrData.attachment = fileURL;
		}
		else {
			lrData.leaveCategory = "";
			lrData.attachment = "";
		}
		if (values.button.toUpperCase() === "SAVE") {
			lrData.outcome = "SAVE";
			console.log("data", lrData);
			setLoading(true);
			
			let objResponse=await dispatch(saveLeaveRequest(lrData));
			console.log("objResponse",objResponse);
			console.log("objResponse",objResponse.payload.data );
			if(objResponse.payload.data === undefined)
			{
				setError(true);
				setLoading(false);
			}
			
		}
		if (values.button.toUpperCase() === "SUBMIT") {
			lrData.outcome = "SUBMIT";
			console.log("data", lrData);
			setLoading(true);
			let objResponse=await dispatch(saveLeaveRequest(lrData));
			console.log("objResponse",objResponse);
			
			console.log("objResponse",objResponse.payload.data );
			if(objResponse.payload.data === undefined)
			{
				setError(true);
				setLoading(false);
			}
		}
	}

	function onCancel() {
		//console.log(values);
		props.history.push("/app/hr-services/leave-requests");
	}

	// function validate(watchValues, errorMethods) {
	// 	let { errors, setError, clearErrors } = errorMethods;

	// 	console.log("watchValues", watchValues);
	// 	console.log("watchValues['leaveType']", watchValues['leaveType']);
	// 	// Firstname validation
	// 	if (watchValues && watchValues['leaveType'] === 'specialLeave') {
	// 		if (watchValues && watchValues['leaveCategory'] === '') {
	// 			setError('leaveCategory', {
	// 				type: 'manual',
	// 				message: 'Please select leave category'
	// 			})
	// 		}
	// 		// if(!errors['firstname']){
	// 		// 	setError('firstname', {
	// 		// 		type: 'manual',
	// 		// 		message: 'You cannot use this first name'
	// 		// 	})
	// 		// }
	// 	} else {
	// 		// if(errors && errors['firstname'] && errors['firstname']['type'] === 'manual'){
	// 		// 	clearErrors('firstname');
	// 		// }
	// 	}
	// }

	return (
		(loading || (leaveRequest && leaveRequest.id && routeParams.leaveRequestId.toString() !== leaveRequest.id.toString())) ?
			<FuseLoading />
			:
			<FusePageSimple
				classes={{
					toolbar: 'px-16 sm:px-24'
				}}
				header={
					(
						<div className="flex flex-1 w-full items-center justify-between">
							<div className="flex flex-col items-start max-w-full">
								<FuseAnimate animation="transition.slideRightIn" delay={300}>
									<Typography
										className="normal-case flex items-center sm:mb-12"
										component={Link}
										role="button"
										to="/app/hr-services/leave-requests"
										color="inherit"
									>
										<Icon className="text-20">
											{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
										</Icon>
										<span className="mx-4"><Label labelId="BL00202" /></span>
									</Typography>
								</FuseAnimate>

								<div className="flex items-center max-w-full">
									<FuseAnimate animation="transition.expandIn" delay={300}>
										<img
											className="w-32 sm:w-32 rounded"
											src="app/assets/images/ecommerce/product-image-placeholder.png"
										//alt={form.name}
										/>
									</FuseAnimate>
									<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography className="text-16 sm:text-20 truncate">
												{leaveRequest && leaveRequest.id !== null ? <Label labelId="BL00204" /> : <Label labelId="BL00205" />}
											</Typography>
										</FuseAnimate>
									</div>
								</div>
							</div>
							<div className="flex flex-1 justify-end px-12">
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Typography variant="caption">
										{leaveRequest && leaveRequest.id !== null && leaveHistorys && _.isArray(leaveHistorys) ? <History data={leaveHistorys} /> : ""}
									</Typography>
								</FuseAnimate>
							</div>
							{/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Button
								className="whitespace-no-wrap normal-case"
								variant="contained"
								color="secondary"
								disabled={!canBeSubmitted()}
								onClick={() => dispatch(saveLeaveRequest(form))}
							>
								Save
							</Button>
						</FuseAnimate> */}
						</div>
					)
				}
				content={
					<>
						{/* <AddLeaveRequestTable
					value={inputList}
					onChange={data => handleDataChange(data)}
					handleSave={() => handleSaveLR(form)}
					handleSubmit={() => handleSubmitLR(form)}
				/> */}
						<>
							{leaveRequest && (
								<div className="p-16 sm:p-24">
									<Grid container spacing={3}>
										<Grid item xs={8}>
										{leaveRequestId == "new" && error==false && (
												<SmartForm
													//defaultValues={leaveRequest}
													template={template}
													// watchFields={['leaveFrom', 'leaveTo']}
													// validate={validate}
													onSubmit={onSubmit}
													onCancel={onCancel}
													//onChange={data => handleDataChange(data)}
													buttons={leaveRequest && leaveRequest.outcome && leaveRequest.outcome.toUpperCase() === "SUBMIT" && error===false ? ['cancel'] : ['save', 'submit', 'cancel']}
												/>
											)}
											{leaveRequestId == "new" && error==true && (
												<SmartForm
													defaultValues={leaveRequest}
													template={template}
													// watchFields={['leaveFrom', 'leaveTo']}
													// validate={validate}
													onSubmit={onSubmit}
													onCancel={onCancel}
													//onChange={data => handleDataChange(data)}
													buttons={leaveRequest && leaveRequest.outcome && leaveRequest.outcome.toUpperCase() === "SUBMIT" && error===false ? ['cancel'] : ['save', 'submit', 'cancel']}
												/>
											)}
											{leaveRequestId !== "new" && leaveRequest && leaveRequest.id && (
												<SmartForm
													defaultValues={leaveRequest}
													template={template}
													// watchFields={['leaveFrom', 'leaveTo']}
													// validate={validate}
													onSubmit={onSubmit}
													onCancel={onCancel}
													//onChange={data => handleDataChange(data)}
													buttons={leaveRequest && leaveRequest.outcome && leaveRequest.outcome.toUpperCase() === "SUBMIT" ? ['cancel'] : ['save', 'submit', 'cancel']}
												/>
											)}
										</Grid>
										<Grid item xs={4}>
											<Box className={classes.leaveSumry} p={.5} borderRadius={4}>
												<Typography variant="h6" className="mb-4 ml-16">
													<Label labelId="BL00206" />
												</Typography>
												{leaveRequest ?
													<List component={Paper}>
														<ListItem>
															<ListItemText primary="Annual Leave season one balance" />
															<ListItemAvatar>
																<Avatar className={classes.avatar}>
																	{leaveBalance && leaveBalance["Annual Leave season one balance"]
																		? leaveBalance["Annual Leave season one balance"] : 0}
																</Avatar>
															</ListItemAvatar>
														</ListItem>
														<Divider />
														<ListItem>
															<ListItemText primary="Annual Leave season two balance" />
															<ListItemAvatar>
																<Avatar className={classes.avatar}>
																	{leaveBalance && leaveBalance["Annual Leave season two balance"]
																		? leaveBalance["Annual Leave season two balance"] : 0}
																</Avatar>
															</ListItemAvatar>
														</ListItem>
														<Divider />
														<ListItem>
															<ListItemText primary="Special Leave taken" />
															<ListItemAvatar>
																<Avatar className={classes.avatar}>
																	{leaveBalance && leaveBalance["Special Leave taken"]
																		? leaveBalance["Special Leave taken"] : 0}
																</Avatar>
															</ListItemAvatar>
														</ListItem>
													</List> : ""}
											</Box>
										</Grid>
									</Grid>
								</div>
							)}
						</>
						{/* <div className="p-16 sm:p-24">
						<SmartForm
							defaultValues={inputList}
							template={template}
							watchFields={['leaveFrom', 'leaveTo', 'leaveType', 'leaveCategory', 'attachment']}
							validate={validate}
							onSubmit={onSubmit}
							onChange={data => handleDataChange(data)}
							buttons={['save', 'submit', 'cancel']}
						/>
						<br />
						{inputList.id !== null ? <LeaveHistoryTable /> : ""}
					</div> */}
					</>
				}
				//innerScroll
			/>
	);
}


function validate(watchValues, errorMethods) {
	let { errors, setError, clearErrors, setValid } = errorMethods;

	// Firstname validation
	if (watchValues && watchValues[0] != undefined && watchValues[1] != undefined) {
		console.log(`watchValues 2`, watchValues);
		let leaveFrom = moment(watchValues[0]);
		let leaveTo = moment(watchValues[1]);
		let noDays = leaveTo.diff(leaveFrom, 'days');
		console.log(`noDays`, noDays);
		if (noDays < 0) {
			if (!errors['leaveTo']) {
				setError('leaveTo', {
					type: 'manual',
					message: 'Please ensure that the To Date is greater than or equal to the From Date.'
				});
				setValid(false);
			}
		}
		else {
			if (errors && errors['leaveTo'] && errors['leaveTo']['type'] === 'manual') {
				clearErrors('leaveTo');
				setValid(true);
			}
		}

		// if (!errors['firstname']) {
		// 	setError('firstname', {
		// 		type: 'manual',
		// 		message: 'You cannot use this first name'
		// 	})
		// }
	}
}

export default withReducer('leaveRequest', reducer)(AddLeaveRequestRequest);
