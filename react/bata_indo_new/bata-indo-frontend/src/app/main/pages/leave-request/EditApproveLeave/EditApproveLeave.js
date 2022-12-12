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
import { saveApproveLeave, getApproveLeave, getNextApprover } from '../store/empApproveLeaveSlice';
import reducer from '../store';
import EditApproveLeaveTable from './pageComponents/EditApproveLeaveTable';
import LeaveHistoryTable from '../LeaveHistory/LeaveHistoryTable';
import SmartForm from '@smart-form';
import masterApi from '@common/utils/masterApi';
import History from '@components/History';
import { getLeaveHistorys, selectLeaveHistorys } from '../store/empLeaveHistorysSlice';
import { Label, GetLabel } from '@common/utils/label';
import history from '@history';

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
	}
}));

function EditApproveApproveLeave(props) {
	const dispatch = useDispatch();
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const userName = useSelector(({ auth }) => auth.user.name);
	const leaveRequest = useSelector(({ leaveRequest }) => leaveRequest.empApproveLeave);

	const theme = useTheme();
	const classes = useStyles(props);
	const routeParams = useParams();
	const [leaveCategories, setLeaveCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const leaveHistorys = useSelector(selectLeaveHistorys);

	useDeepCompareEffect(() => {
		async function updateProductState() {
			const { leaveRequestId } = routeParams;

			let leaveCatData = await masterApi.getActiveLeaveCategories();
			let data = [];
			_.isArray(leaveCatData)
				&& leaveCatData.map((d) => (data.push({ value: d.lcCode, title: d.lcName })));
			//console.log("cityDropDown", data);
			setLeaveCategories(data);

			let params = {
				leaveRequestId: leaveRequestId,
				uuid: uuid
			}
			dispatch(getApproveLeave(params));
			dispatch(getLeaveHistorys(routeParams));
		}
		updateProductState();
		setLoading(false);
	}, [dispatch, routeParams]);


	let template = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
		//title: 'Job Application Form',
		description: 'Form for applying Job',
		sections: [
			{
				layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
				//title: 'Travel Claim -> Detail',
				id: 'travelSection',
				fields: [
					{
						type: 'text',
						name: 'fullname',
						id: 'fullname',
						title: GetLabel('BL00164'),
						disabled: true
					},
					{
						type: 'text',
						name: 'createdBy',
						id: 'createdBy',
						title: GetLabel('BL00165'),
						disabled: true
					},
					{
						type: 'text',
						name: 'trxNo',
						id: 'trxNo',
						title: GetLabel('BL00187'),
						disabled: true
					},
					{
						type: 'text',
						name: 'statusCode',
						id: 'statusCode',
						title: GetLabel('BL00188'),
						disabled: true
					}
				]
			},
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
						disabled: true,
						options: [
							{ title: GetLabel('BL00163'), value: 'specialLeave' },
							{ title: GetLabel('BL00162'), value: 'annualLeave' }
						],
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'select',
						name: 'leaveCategory',
						id: 'leaveCategory',
						title: GetLabel('BL00170'),
						options: leaveCategories,
						disabled: true,
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
						disabled: true,
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'date',
						name: 'leaveTo',
						id: 'leaveTo',
						title: GetLabel('BL00172'),
						disabled: true,
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'textarea',
						name: 'reason',
						id: 'reason',
						title: 'Leave Reason',
						disabled: true,
						validationProps: {
							required: 'This is a mandatory field'
						},
						dynamic: {
							field: 'leaveType',
							value: 'annualLeave'
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
						type: 'attachment',
						name: 'attachment',
						id: 'attachment',
						title: GetLabel('BL00134'),
						dynamic: {
							field: 'leaveType',
							value: 'specialLeave'
						}
					},
				]
			},
			{
				title: (leaveRequest && leaveRequest.statusCode && leaveRequest.statusCode.toUpperCase() != 'APPROVED') ?  'For Approver' : null,
				id: 'nextApproverTable',
				fields: [
					// {
					// 	type: 'select',
					// 	name: 'pendingWith',
					// 	id: 'pendingWith',
					// 	title: 'Next Approver',
					// 	dynamic: {
					// 		field: 'statusCode',
					// 		value: 'PENDING_WITH_HOD'
					// 	},
					// 	options: _.isArray(leaveRequest.nextApprover) ? leaveRequest.nextApprover : [],
					// 	validationProps: {
					// 		required: 'This is a mandatory field'
					// 	},
					// 	unregister: ['reject']
					// },
					{
						type: (leaveRequest && leaveRequest.statusCode && leaveRequest.statusCode.toUpperCase() == 'APPROVED') ? 'hidden' : 'textarea',
						name: 'approverRemarks',
						id: 'approverRemarks',
						title: GetLabel('BL00140'),
						maxlength: 151,
						validationProps: {
							required: 'This is a mandatory field',
							validationProps: {
								maxLength: {
									value: 150,
									message: 'Maximum 150 characters are allowed.'
								}
							}
						}
					}
				]
			},
		]
	};

	if (leaveRequest && 'leaveType' in leaveRequest && leaveRequest.leaveType !== "specialLeave") {
		delete template.sections[3].fields[0];
	}
	if (leaveRequest && 'attachment' in leaveRequest && (leaveRequest.attachment === "" || leaveRequest.attachment === null)) {
		delete template.sections[3].fields[0];
	}

	function canBeSubmitted() {
		// return form.name.length > 0 && !_.isEqual(leaveRequest, form);
		return true;
	}

	// if ((!leaveRequest || (leaveRequest && routeParams.leaveRequestId !== leaveRequest.id)) && routeParams.leaveRequestId !== 'new') {
	// 	return <FuseLoading />;
	// }


	function onSubmit(values) {
		console.log("values", values);
		if (values.button.toUpperCase() === "ACCEPT") {
			let lrData = {};
			//lrData = data;
			lrData.trxNo = values.data.trxNo;
			lrData.approverId = uuid;
			// if (values.data.statusCode.toUpperCase() == "PENDING_WITH_HOD".toUpperCase()
			// ) {
			// 	lrData.pendingWith = values.data.pendingWith;
			// }
			lrData.currentStatus = values.data.statusCode;
			lrData.outcome = "FORWARD";
			lrData.remarks = values.data.approverRemarks;
			console.log("data", lrData);
			dispatch(saveApproveLeave(lrData));
			setLoading(true);

		}
		if (values.button.toUpperCase() === "REJECT") {
			// if(values.data.approverRemarks === "")
			// {
			// 	setError('approverRemarks', {
			// 		type: 'manual',
			// 		message: 'This is a mandatory field'
			// 	})
			// }

			let lrData = {};
			//lrData = data;
			lrData.trxNo = values.data.trxNo;
			lrData.approverId = uuid;
			// if (values.data.statusCode.toUpperCase() == "PENDING_WITH_HOD".toUpperCase()
			// ) {
			// 	lrData.pendingWith = values.data.pendingWith;
			// }
			lrData.currentStatus = values.data.statusCode;
			lrData.outcome = "REJECT";
			lrData.remarks = values.data.approverRemarks;
			console.log("data", lrData);
			dispatch(saveApproveLeave(lrData));
			setLoading(true);
		}
	}

	function onCancel() {
		//console.log(values);
		history.goBack();
		// props.history.push("/app/claim-requests/approve-leaves");
	}

	return (
		(loading || (leaveRequest && 'id' in leaveRequest && routeParams.leaveRequestId.toString() !== leaveRequest.id.toString())) ?
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
										to="/app/claim-requests/approve-leaves"
										color="inherit"
									>
										<Icon className="text-20">
											{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
										</Icon>
										<span className="mx-4">{(leaveRequest && leaveRequest.statusCode && leaveRequest.statusCode.toUpperCase() == 'APPROVED') ? <Label labelId="BL00438" /> : <Label labelId="BL00207" />}</span>
									</Typography>
								</FuseAnimate>

								<div className="flex items-center max-w-full">
									<FuseAnimate animation="transition.expandIn" delay={300}>
										<img
											className="w-32 sm:w-48 rounded"
											src="app/assets/images/ecommerce/product-image-placeholder.png"
										//alt={form.name}
										/>
									</FuseAnimate>
									<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography className="text-16 sm:text-20 truncate">
											{(leaveRequest && leaveRequest.statusCode && leaveRequest.statusCode.toUpperCase() == 'APPROVED') ? <Label labelId="BL00438" /> : <Label labelId="BL00203" />}
											</Typography>
										</FuseAnimate>
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography variant="caption">{(leaveRequest && leaveRequest.statusCode && leaveRequest.statusCode.toUpperCase() == 'APPROVED') ? <Label labelId="BL00438" /> : <Label labelId="BL00203" />}</Typography>
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
								onClick={() => dispatch(saveApproveLeave(form))}
							>
								Save
							</Button>
						</FuseAnimate> */}
						</div>
					)
				}
				content={
					<>
						{leaveRequest && leaveRequest.id && (
							<div className="p-16 sm:p-24">
								<SmartForm
									defaultValues={leaveRequest}
									template={template}
									// watchFields={['']}
									// validate={validate}
									onSubmit={onSubmit}
									onCancel={onCancel}
									//onChange={data => handleDataChange(data)}
									buttons={(leaveRequest.statusCode.toUpperCase() == 'APPROVED') ? ['cancel'] : ['accept', 'reject', 'cancel']}
								/>
							</div>
						)}
						{/* <br />
						<LeaveHistoryTable /> */}
					</>
				}
				//innerScroll
			/>
	);
}

export default withReducer('leaveRequest', reducer)(EditApproveApproveLeave);
