import FuseAnimate from '@core/core/Animate';
import FuseChipSelect from '@core/core/ChipSelect';
import FuseLoading from '@core/core/Loading';
import FusePageCarded from '@core/core/PageCarded';
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
import AddLeaveRequestTable from './pageComponents/AddLeaveRequestTable';
import LeaveHistoryTable from '../LeaveHistory/LeaveHistoryTable';
import SmartForm from '@smart-form';

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

function AddLeaveRequestRequest(props) {
	const dispatch = useDispatch();
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const userName = useSelector(({ auth }) => auth.user.name);
	const leaveRequest = useSelector(({ leaveRequest }) => leaveRequest.empLeaveRequest);
	const theme = useTheme();

	const classes = useStyles(props);
	const { form, handleChange, setForm } = useForm(null);
	const routeParams = useParams();

	let [inputList, setInputList] = useState(
		{
			id: null,
			createdBy: uuid,
			empName: userName,
			empCode: uuid,
			dsgCode: "",
			dsgName: "",
			dptCode: "",
			dptName: "",
			locCode: "",
			locName: "",
			leaveType: "annualLeave",
			leaveCategory: "",
			leaveFrom: "",
			leaveTo: "",
			attachment: "",
			outcome: "SAVE"
		}
	);

	let template = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
		//title: 'Job Application Form',
		description: 'Form for applying Job',
		sections: [
			{
				layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
				//title: 'Personal Information',
				id: 'personal_information',
				fields: [
					{
						type: 'text',
						name: 'empCode',
						id: 'empCode',
						title: 'Employee Code'
					},
					{
						type: 'text',
						name: 'empName',
						id: 'empName',
						title: 'Full Name'
					},
					{
						type: 'text',
						name: 'dsgName',
						id: 'dsgName',
						title: 'Designation'
					},
					{
						type: 'text',
						name: 'dptName',
						id: 'dptName',
						title: 'Department'
					},
					{
						type: 'text',
						name: 'locName',
						id: 'locName',
						title: 'Location'
					}
				]
			},
			{
				layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
				//title: 'Personal Information',
				id: 'leaveDataSection',
				fields: [
					{
						type: 'radio',
						name: 'leaveType',
						id: 'leaveType',
						title: 'Type Of Leave',
						options: [
							{ title: 'Special Leave', value: 'specialLeave' },
							{ title: 'Annual Leave', value: 'annualLeave' }
						]
					},
					{
						type: 'text',
						name: 'leaveCount',
						id: 'leaveCount',
						title: 'Leave Count'
					},
					{
						type: 'date',
						name: 'leaveFrom',
						id: 'leaveFrom',
						title: 'Leave From Date',
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'date',
						name: 'leaveTo',
						id: 'leaveTo',
						title: 'Leave To Date',
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'select',
						name: 'leaveCategory',
						id: 'leaveCategory',
						title: 'Leave Category',
						options: [
							{ title: 'Special Leave', value: 'specialLeave' }
						],
						dynamic: {
							field: 'leaveType',
							value: 'specialLeave'
						}
					},
					{
						type: 'file',
						name: 'attachment',
						id: 'attachment',
						title: 'Attachment',
						dynamic: {
							field: 'leaveType',
							value: 'specialLeave'
						}
					}
				]
			}
		]
	};


	useDeepCompareEffect(() => {
		function updateProductState() {
			const { leaveRequestId } = routeParams;

			if (leaveRequestId === 'new') {
				dispatch(newLeaveRequest(
					{
						uuid: uuid,
						userName: userName
					}
				));
				setInputList({
					id: null,
					createdBy: uuid,
					empName: userName,
					empCode: uuid,
					dsgCode: "",
					dsgName: "",
					dptCode: "",
					dptName: "",
					locCode: "",
					locName: "",
					leaveType: "annualLeave",
					leaveCategory: "",
					leaveFrom: "",
					leaveTo: "",
					attachment: "",
					outcome: "SAVE"
				});
			} else {
				dispatch(getLeaveRequest(routeParams));
			}
		}
		updateProductState();
	}, [dispatch, routeParams]);


	useEffect(() => {
		if (leaveRequest !== null) {
			setInputList({
				id: leaveRequest.id,
				createdBy: leaveRequest.createdBy,
				empName: leaveRequest.empName,
				empCode: leaveRequest.empCode,
				dsgCode: leaveRequest.dsgCode,
				dsgName: leaveRequest.dsgName,
				dptCode: leaveRequest.dptCode,
				dptName: leaveRequest.dptName,
				locCode: leaveRequest.locCode,
				locName: leaveRequest.locName,
				leaveType: leaveRequest.leaveType,
				leaveCategory: leaveRequest.leaveCategory,
				leaveFrom: leaveRequest.leaveFrom,
				leaveTo: leaveRequest.leaveTo,
				attachment: leaveRequest.attachment,
				outcome: leaveRequest.outcome
			});
		}
		if ((leaveRequest && !form) || (leaveRequest && form && leaveRequest.id !== form.id)) {
			setForm(leaveRequest);
		}
	}, [form, leaveRequest, setForm]);

	function handleUploadChange(e) {
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = () => {
			setForm(
				_.set({ ...form }, `images`, [
					{
						id: FuseUtils.generateGUID(),
						url: `data:${file.type};base64,${btoa(reader.result)}`,
						type: 'image'
					},
					...form.images
				])
			);
		};

		reader.onerror = () => {
			console.log('error on load image');
		};
	}

	function canBeSubmitted() {
		// return form.name.length > 0 && !_.isEqual(leaveRequest, form);
		return true;
	}

	// if ((!leaveRequest || (leaveRequest && routeParams.leaveRequestId !== leaveRequest.id)) && routeParams.leaveRequestId !== 'new') {
	// 	return <FuseLoading />;
	// }

	const handleDataChange = (data) => {
		let lrData = inputList;
		lrData = data;
		setInputList(lrData);
	}

	const handleSaveLR = (data) => {

		let lrData = inputList;
		//lrData = data;
		lrData.outcome = "SAVE";
		console.log("data", lrData);
		dispatch(saveLeaveRequest(lrData));
	}

	const handleSubmitLR = (data) => {
		let lrData = inputList;
		//lrData = data;
		lrData.outcome = "SUBMIT";
		console.log("data", lrData);
		dispatch(saveLeaveRequest(lrData));
	}

	function onSubmit(values) {
		console.log(values);
	}

	function validate(watchValues, errorMethods) {
		let { errors, setError, clearErrors } = errorMethods;

		console.log("watchValues", watchValues);
		console.log("watchValues['leaveType']", watchValues['leaveType']);
		// Firstname validation
		if (watchValues && watchValues['leaveType'] === 'specialLeave') {
			if (watchValues && watchValues['leaveCategory'] === '') {
				setError('leaveCategory', {
					type: 'manual',
					message: 'Please select leave category'
				})
			}
			// if(!errors['firstname']){
			// 	setError('firstname', {
			// 		type: 'manual',
			// 		message: 'You cannot use this first name'
			// 	})
			// }
		} else {
			// if(errors && errors['firstname'] && errors['firstname']['type'] === 'manual'){
			// 	clearErrors('firstname');
			// }
		}
	}

	return (
		<FusePageCarded
			classes={{
				toolbar: 'p-0',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				form && (
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-col items-start max-w-full">
							<FuseAnimate animation="transition.slideRightIn" delay={300}>
								<Typography
									className="normal-case flex items-center sm:mb-12"
									component={Link}
									role="button"
									to="/hr-services/leave-requests"
									color="inherit"
								>
									<Icon className="text-20">
										{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
									</Icon>
									<span className="mx-4">Leave Requests List</span>
								</Typography>
							</FuseAnimate>

							<div className="flex items-center max-w-full">
								<FuseAnimate animation="transition.expandIn" delay={300}>
									<img
										className="w-32 sm:w-48 rounded"
										src="app/assets/images/ecommerce/product-image-placeholder.png"
										alt={form.name}
									/>
								</FuseAnimate>
								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography className="text-16 sm:text-20 truncate">
											{inputList.id === -1 ? "New Leave Request" : "Edit Leave Request"}
										</Typography>
									</FuseAnimate>
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography variant="caption">

											{inputList.id === -1 ? "Add Leave Request" : "Edit Leave Request"}

										</Typography>
									</FuseAnimate>
								</div>
							</div>
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
					<AddLeaveRequestTable
					value={inputList}
					onChange={data => handleDataChange(data)}
					handleSave={() => handleSaveLR(form)}
					handleSubmit={() => handleSubmitLR(form)}
				/>
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
			innerScroll
		/>
	);
}

export default withReducer('leaveRequest', reducer)(AddLeaveRequestRequest);
