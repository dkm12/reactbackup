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
import { saveApproveMemorandum, getApproveMemorandum, getNextApprover, sendConsentMemorandum } from '../store/empEditApproveMemorandumSlice';
import reducer from '../store';
import SmartForm from '@smart-form';
import uploadDoc from '@common/utils/uploadDoc';
import HistoryMemoDesc from '@components/HistoryMemoDesc';
import { getMemoDescHistory, selectMemoDescHistory } from '../store/empMemoDescHistorySlice';
import masterApi from '@common/utils/masterApi';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
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
	}
}));

function EditApproveApproveMemorandum(props) {
	const dispatch = useDispatch();
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const userName = useSelector(({ auth }) => auth.user.name);
	const memorandum = useSelector(({ memorandum }) => memorandum.empEditApproveMemorandum);

	const theme = useTheme();

	const classes = useStyles(props);
	const routeParams = useParams();
	const [nextApprover, setNextApprover] = useState([]);
	const [loading, setLoading] = useState(false);
	const [approverUsers, setApproverUsers] = useState([]);
	const memoDescHistory = useSelector(selectMemoDescHistory);
	const [actionValue, setActionValue] = React.useState('');

	const handleActionValueChange = (event) => {
		setActionValue(event.target.value);
	};

	useEffect(() => {
		let data = [];
		let usersData = 'allUsers' in memorandum ? memorandum.allUsers : [];
		_.isArray(usersData)
			&& usersData.map((d) => (data.push({ value: d.employId, title: d.fullname + "(" + d.employId + ")" })));
		//console.log("cityDropDown", data);
		setApproverUsers(data);
		setLoading(false);
	}, [memorandum]);

	useDeepCompareEffect(() => {
		async function updateProductState() {
			const { memorandumId } = routeParams;
			setLoading(true);
			// let usersData = await masterApi.getAllUsers();
			// let data = [];
			// _.isArray(usersData)
			// 	&& usersData.map((d) => (data.push({ value: d.employId, title: d.fullname + "(" + d.employId + ")" })));
			// //console.log("cityDropDown", data);
			// setApproverUsers(data);


			let params = {
				memorandumId: memorandumId,
				uuid: uuid
			}
			dispatch(getApproveMemorandum(params));
			dispatch(getMemoDescHistory(routeParams));
		}
		updateProductState();
	}, [dispatch, routeParams]);

	let template = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
		//title: 'Job Application Form',
		description: 'Form for applying Job',
		sections: [
			{
				layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
				//title: 'Cash Reimbursement Detail',
				id: 'memoSection',
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
						name: 'department',
						id: 'department',
						title: GetLabel('BL00167'),
						disabled: true
					},
					{
						type: 'text',
						name: 'designation',
						id: 'designation',
						title: GetLabel('BL00166'),
						disabled: true
					}
				]
			},
			{
				layout: { column: 2, spacing: 1, size: 'medium', label: 'fixed' },
				//title: 'Personal Information',
				id: 'memoTypeSection',
				fields: [
					{
						type: 'radio',
						name: 'mmType',
						id: 'mmType',
						title: GetLabel('BL00238'),
						disabled: true,
						options: [
							{ title: GetLabel('BL00240'), value: 'Normal' },
							{ title: GetLabel('BL00241'), value: 'Express' }
						],
						validationProps: {
							required: 'This is a mandatory field'
						},
					},
					{
						type: 'radio',
						name: 'mmClass',
						id: 'mmClass',
						title: GetLabel('BL00242'),
						disabled: true,
						options: [
							{ title: GetLabel('BL00243'), value: 'Standard' },
							{ title: GetLabel('BL00244'), value: 'Confidential' }
						]
					}
				]
			},
			{
				layout: { column: 1, spacing: 1, size: 'medium', label: 'fixed' },
				//title: 'Personal Information',
				id: 'memoTitle',
				fields: [
					{
						type: 'text',
						name: 'mmTitle',
						id: 'mmTitle',
						title: GetLabel('BL00054'),
						disabled: true,
						validationProps: {
							required: 'This is a mandatory field'
						}
					}
				]
			},
			{
				layout: { column: 1, spacing: 1, size: 'medium', label: 'fixed' },
				//title: 'Personal Information',
				id: 'memoDescription',
				fields: [
					{
						type: 'ckeditor',
						name: 'mmDesc',
						id: 'mmDesc',
						title: GetLabel('BL00055'),
						validationProps: {
							required: 'This is a mandatory field'
						}
					}
				]
			},
			{
				layout: { column: 1, spacing: 1, size: 'medium', label: 'fixed' },
				//title: 'Personal Information',
				id: 'memoApprovers',
				fields: [
					{
						type: 'multiSelect',
						name: 'approverListData',
						id: 'approverListData',
						title: GetLabel('BL00246'),
						options: approverUsers,
						disabled: true
					}
				]
			},
			{
				title: 'Approver History',
				id: 'approverHistorySection',
				layout: { column: 1, spacing: 2, size: 'medium', label: 'fixed' },
				fields: [
					{
						type: 'table',
						name: 'approverHistory',
						id: 'approverHistory',
						columns: {
							ids: ['approverName', 'status', 'date', 'remarks', 'attList'],
							// titles: ['Approver Name', 'Status', 'Date', 'Remarks', 'Attachment']
							titles: GetLabel(['BL00246', 'BL00089', 'BL00143', 'BL00140', 'BL00123']),
						}
					}
				]
			},
			{
				//title: 'Travel Details',
				id: 'attListArraySection',
				layout: { column: 1, spacing: 2, size: 'medium', label: 'fixed' },
				fields: [
					{
						type: 'table',
						name: 'attListArray',
						id: 'attListArray',
						columns: {
							ids: ['attList'],
							titles: ['Attachment']
						}
					}
				]
			},
		]
	};

	let templateConsent = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
		//title: 'Job Application Form',
		description: 'Form for applying Job',
		sections: [
			{
				layout: { column: 2, spacing: 1, size: 'medium', label: 'fixed' },
				title: GetLabel('BL00248'),
				id: 'consentTable',
				fields: [
					{
						type: 'select',
						name: 'consentRaisedTo',
						id: 'consentRaisedTo',
						title: GetLabel('BL00248'),
						options: approverUsers,
						validationProps: {
							required: 'This is a mandatory field'
						},
						disabled: memorandum.consentRaised
					},
					{
						type: 'textarea',
						name: 'mchQuery',
						id: 'mchQuery',
						title: GetLabel('BL00249'),
						maxlength: 151,
						validationProps: {
							required: 'This is a mandatory field',
							maxLength: {
								value: 150,
								message: 'Maximum 150 characters are allowed.'
							}
						},
						disabled: memorandum.consentRaised
					},
					{
						type: 'textarea',
						name: 'chAnswer',
						id: 'chAnswer',
						title: GetLabel('BL00251'),
						maxlength: 151,
						validationProps: {
							required: 'This is a mandatory field',
							maxLength: {
								value: 150,
								message: 'Maximum 150 characters are allowed.'
							}
						},
						disabled: memorandum.consentRaised,
						dynamic: {
							field: 'consentReply',
							value: [true]
						}
					}
				]
			},
		]
	};

	let templateApprover = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
		//title: 'Job Application Form',
		description: 'Form for applying Job',
		sections: [
			{
				layout: { column: 1, spacing: 1, size: 'medium', label: 'fixed' },
				title: GetLabel('BL00225'),
				id: 'memoDescription',
				fields: [
					{
						type: 'ckeditor',
						name: 'mmDesc',
						id: 'mmDesc',
						title: GetLabel('BL00055'),
						validationProps: {
							required: 'This is a mandatory field'
						}
					}
				]
			},
			{
				layout: { column: 2, spacing: 1, size: 'medium', label: 'fixed' },
				id: 'nextApproverTable',
				fields: [
					{
						type: 'textarea',
						name: 'approverRemarks',
						id: 'approverRemarks',
						title: GetLabel('BL00140'),
						maxlength: 151,
						validationProps: {
							required: 'This is a mandatory field',
							maxLength: {
								value: 150,
								message: 'Maximum 150 characters are allowed.'
							}
						}
					},
					{
						type: 'array',
						name: 'attListApprover',
						id: 'attListApprover',
						//title: 'Array',
						// columns: ['Attachment'],
						columns: GetLabel(['BL00134']),
						subFields: [
							{
								type: 'file',
								name: 'attachmentFile',
								id: 'attachmentFile',
								title: 'Attachment',
							},
							{
								type: 'attachment',
								name: 'attachmentUrl',
								id: 'attachmentUrl'
							}
						]
					}
				]
			},
		]
	};

	// if (memorandum && 'nextApprover' in memorandum
	// 	&& memorandum.statusCode.toUpperCase() === "PENDING_WITH_FINANCE_DIR"
	// 	&& _.isArray(memorandum.nextApprover)
	// 	&& memorandum.nextApprover.length === 0) {
	// 	delete template.sections[3].fields[0];
	// }

	// if (memorandum && 'statusCode' in memorandum && memorandum.statusCode.toUpperCase() === "PENDING_WITH_PRESIDENT_DIR") {
	// 	delete template.sections[3].fields[0];
	// }
	function updateAttachment(objList) {
		//console.log("objList",objList);
		return Promise.all(
			objList.map(async product => {
				let fileURL = product.attachmentUrl;
				if (product.attachmentFile && product.attachmentFile.length > 0) {
					let fileObj = product.attachmentFile[0];
					let fileData = await uploadDoc.saveDoc(fileObj, "cashrem");
					//console.log("fileData",fileData);
					if (_.isArray(fileData) && fileData.length > 0) {
						fileURL = fileData[0].fileUrl;
					}
				}
				product.attachmentUrl = fileURL;
				return product;
			})
		);
	}

	async function onSubmit(values) {
		console.log("values", values);
		let mmId = -1;
		let approverList = values.data.approverList;

		let attListApprover = [];
		let arrayAttachments = [];
		if ('attListApprover' in values.data) {
			attListApprover = await updateAttachment(values.data.attListApprover);
			for (let count = 0; count < attListApprover.length; count++) {
				if (attListApprover[count].attachmentUrl !== "") {
					arrayAttachments.push(attListApprover[count].attachmentUrl);
				}
			}
		}
		for (let count = 0; count < approverList.length; count++) {
			if (approverList[count].maPriorityEmp === uuid) {
				mmId = approverList[count].mmId;
			}
		}
		if (values.button.toUpperCase() === "ACCEPT") {
			let lrData = {};
			//lrData = data;
			lrData.mmId = mmId;
			lrData.outcome = "APPROVE";
			lrData.remarks = values.data.approverRemarks;
			lrData.attachmentUrl = arrayAttachments;
			lrData.desc = values.data.mmDesc;

			console.log("data", lrData);
			dispatch(saveApproveMemorandum(lrData));
			setLoading(true);
		}
		if (values.button.toUpperCase() === "REJECT") {
			let lrData = {};
			//lrData = data;
			lrData.mmId = mmId;
			lrData.approverId = uuid;
			lrData.attachmentUrl = arrayAttachments;
			lrData.currentStatus = values.data.statusCode;
			lrData.outcome = "REJECT";
			lrData.remarks = values.data.approverRemarks;
			console.log("data", lrData);
			dispatch(saveApproveMemorandum(lrData));
			setLoading(true);
		}
		if (values.button.toUpperCase() === "RETURN") {
			let lrData = {};
			//lrData = data;
			lrData.mmId = mmId;
			lrData.outcome = "RETURN";
			lrData.attachmentUrl = arrayAttachments;
			lrData.remarks = values.data.approverRemarks;
			console.log("data", lrData);
			dispatch(saveApproveMemorandum(lrData));
			setLoading(true);
		}

		if (values.button.toUpperCase() === "CONSENT") {
			let lrData = {};
			//lrData = data;
			lrData.mmId = mmId;
			lrData.consentRaisedTo = values.data.consentRaisedTo;
			lrData.mchQuery = values.data.mchQuery;
			dispatch(sendConsentMemorandum(lrData));
			setLoading(true);
		}
	}

	function onCancel() {
		//console.log(values);
		props.history.push("/app/claim-requests/approve-memorandum");
	}


	// console.log("memorandum",memorandum);
	// console.log("routeParams.memorandumId",routeParams.memorandumId.toString());
	// console.log("memorandum.id",memorandum.id);
	// console.log("routeParams.memorandumId.toString() !== memorandum.id",routeParams.memorandumId.toString() !== memorandum.id);
	return (
		(loading || (memorandum && 'id' in memorandum && routeParams.memorandumId.toString() !== memorandum.id.toString())) ?
			<FuseLoading />
			:
			<FusePageSimple
				classes={{
					toolbar: 'p-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
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
										to="/app/claim-requests/approve-memorandum"
										color="inherit"
									>
										<Icon className="text-20">
											{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
										</Icon>
										<span className="mx-4"><Label labelId="BL00254" /></span>
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
												<Label labelId="BL00255" />
											</Typography>
										</FuseAnimate>
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography variant="caption"><Label labelId="BL00255" /></Typography>
										</FuseAnimate>
									</div>
								</div>
							</div>
							<div className="flex flex-1 justify-end px-12">
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Typography variant="caption">
										{memorandum && memorandum.id !== null && memoDescHistory && _.isArray(memoDescHistory) ? <HistoryMemoDesc data={memoDescHistory} /> : ""}
									</Typography>
								</FuseAnimate>
							</div>
							{/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Button
								className="whitespace-no-wrap normal-case"
								variant="contained"
								color="secondary"
								disabled={!canBeSubmitted()}
								onClick={() => dispatch(saveApproveMemorandum(form))}
							>
								Save
							</Button>
						</FuseAnimate> */}
						</div>
					)
				}
				content={
					<>
						{memorandum && memorandum.id && (
							<div className="p-16 sm:p-24">
								<SmartForm
									defaultValues={memorandum}
									template={template}
								//watchFields={['']}
								// validate={validate}
								//onSubmit={onSubmit}
								//onCancel={onCancel}
								//onChange={data => handleDataChange(data)}
								// buttons={
								// 	memorandum.consentRaised === false ?
								// 	['accept','consent', 'reject', 'return', 'cancel']
								// 	: (
								// 		memorandum.consentReply === true ?
								// 		['accept', 'reject', 'return', 'cancel']
								// 		: ['cancel']
								// 	)
								// }
								/>

								{memorandum && memorandum.id && memorandum.consentRaised === false && (
									<FormControl component="fieldset">
										<FormLabel component="legend">Select Action</FormLabel>
										<RadioGroup aria-label="Select Actoin" name="formAction" value={actionValue} onChange={handleActionValueChange}>
											<FormControlLabel value="consent" control={<Radio />} label="Consent" />
											<FormControlLabel value="approve" control={<Radio />} label="Approve/Reject/Return" />
										</RadioGroup>
									</FormControl>
								)}

								{memorandum && memorandum.id && (actionValue === "consent" || memorandum.consentRaised === true) && (
									<SmartForm
										defaultValues={memorandum}
										template={templateConsent}
										//watchFields={['']}
										// validate={validate}
										onSubmit={onSubmit}
										onCancel={onCancel}
										//onChange={data => handleDataChange(data)}
										buttons={
											memorandum.consentRaised === false ?
												['consent', 'cancel']
												: (
													memorandum.consentReply === true ?
														null
														: ['cancel']
												)
										}
									/>
								)}

								{memorandum && memorandum.id && (actionValue === "approve" || (memorandum.consentRaised === true && memorandum.consentReply === true)) && (
									<SmartForm
										defaultValues={memorandum}
										template={templateApprover}
										//watchFields={['']}
										// validate={validate}
										onSubmit={onSubmit}
										onCancel={onCancel}
										//onChange={data => handleDataChange(data)}
										buttons={
											memorandum.consentRaised === false ?
												['accept', 'reject', 'return', 'cancel']
												: (
													memorandum.consentReply === true ?
														['accept', 'reject', 'return', 'cancel']
														: ['cancel']
												)
										}
									/>
								)}
							</div>
						)}
						{/* <br />
						<ClaimHistoryTable /> */}
					</>
				}
			//innerScroll
			/>
	);
}

export default withReducer('memorandum', reducer)(EditApproveApproveMemorandum);
