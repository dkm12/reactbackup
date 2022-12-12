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
import { saveReplyConsentMemorandum, getConsentMemorandum, getNextApprover, sendConsentMemorandum } from '../store/empEditConsentMemorandumSlice';
import reducer from '../store';
import SmartForm from '@smart-form';
import uploadDoc from '@common/utils/uploadDoc';
import masterApi from '@common/utils/masterApi';
import HistoryMemoDesc from '@components/HistoryMemoDesc';
import { getMemoDescHistory, selectMemoDescHistory } from '../store/empMemoDescHistorySlice';
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

function EditApproveConsentMemorandum(props) {
	const dispatch = useDispatch();
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const userName = useSelector(({ auth }) => auth.user.name);
	const memorandum = useSelector(({ memorandum }) => memorandum.empEditConsentMemorandum);

	const theme = useTheme();

	const classes = useStyles(props);
	const routeParams = useParams();
	const [nextApprover, setNextApprover] = useState([]);
	const [loading, setLoading] = useState(false);
	const [approverUsers, setApproverUsers] = useState([]);

	const memoDescHistory = useSelector(selectMemoDescHistory);

	useEffect(() => {
		setLoading(false);
	}, [memorandum]);

	useDeepCompareEffect(() => {
		async function updateProductState() {
			const { memorandumId } = routeParams;

			let usersData = await masterApi.getAllUsers();
			let data = [];
			_.isArray(usersData)
				&& usersData.map((d) => (data.push({ value: d.employId, title: d.fullname + "(" + d.employId + ")" })));
			//console.log("cityDropDown", data);
			setApproverUsers(data);


			let params = {
				memorandumId: memorandumId,
				uuid: uuid
			}
			dispatch(getConsentMemorandum(params));

			dispatch(getMemoDescHistory(routeParams));
			setLoading(true);
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
							{ title: GetLabel('BL00238'), value: 'Normal' },
							{ title: GetLabel('BL00238'), value: 'Express' }
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
						title: 'Approver',
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
			{
				layout: { column: 2, spacing: 1, size: 'medium', label: 'fixed' },
				title: GetLabel('BL00248'),
				id: 'consentTable',
				fields: [
					{
						type: 'select',
						name: 'consentRaisedBy',
						id: 'consentRaisedBy',
						title: GetLabel('BL00248'),
						options: approverUsers,
						disabled: true
					},
					{
						type: 'textarea',
						name: 'mchQuery',
						id: 'mchQuery',
						title: GetLabel('BL00249'),
						disabled: true
					}
				]
			},
			{
				layout: { column: 2, spacing: 1, size: 'medium', label: 'fixed' },
				title: GetLabel('BL00250'),
				id: 'consentReplyTable',
				fields: [
					{
						type: 'textarea',
						name: 'chAnswer',
						id: 'chAnswer',
						title: GetLabel('BL00251'),
						maxlength: 251,
						validationProps: {
							required: 'This is a mandatory field',
							maxLength: {
								value: 250,
								message: 'Maximum 250 characters are allowed.'
							}
						},
						unregister: ['consent']
					},
					{
						type: 'array',
						name: 'attListConsentReply',
						id: 'attListConsentReply',
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
		let id = -1;
		let consentList = values.data.consentList;

		let attList = await updateAttachment(values.data.attListConsentReply);

		for (let count = 0; count < consentList.length; count++) {
			if (consentList[count].consentRaisedTo === uuid && consentList[count].status === "RAISED") {
				id = consentList[count].id;
			}
		}
		if (values.button.toUpperCase() === "REPLY") {
			let lrData = {};
			//lrData = data;
			lrData.id = id;
			lrData.chAnswer = values.data.chAnswer;
			lrData.attList = attList;
			dispatch(saveReplyConsentMemorandum(lrData));
			setLoading(true);
		}
	}

	function onCancel() {
		//console.log(values);
		props.history.push("/app/employee-service/consent-memorandum");
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
										to="/app/employee-service/consent-memorandum"
										color="inherit"
									>
										<Icon className="text-20">
											{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
										</Icon>
										<span className="mx-4"><Label labelId="BL00252" /></span>
									</Typography>
								</FuseAnimate>

								<div className="flex items-center max-w-full">
									<FuseAnimate animation="transition.expandIn" delay={300}>
										<img
											className="w-32 sm:w-48 rounded"
											src="assets/images/ecommerce/product-image-placeholder.png"
										//alt={form.name}
										/>
									</FuseAnimate>
									<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography className="text-16 sm:text-20 truncate">
												<Label labelId="BL00253" />
											</Typography>
										</FuseAnimate>
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography variant="caption"><Label labelId="BL00253" /></Typography>
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
								onClick={() => dispatch(saveReplyConsentMemorandum(form))}
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
									onSubmit={onSubmit}
									onCancel={onCancel}
									//onChange={data => handleDataChange(data)}
									buttons={['reply', 'cancel']}
								/>
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

export default withReducer('memorandum', reducer)(EditApproveConsentMemorandum);
