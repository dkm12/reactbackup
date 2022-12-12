import FuseAnimate from '@core/core/Animate';
import FuseLoading from '@core/core/Loading';
import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import { useForm, useDeepCompareEffect } from '@core/hooks';
import FuseUtils from '@core/utils';
import _ from '@lodash';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { saveMemorandum, newMemorandum, getMemorandum } from '../store/empAddMemorandumSlice';
import reducer from '../store';
import SmartForm from '@smart-form';
import masterApi from '@common/utils/masterApi';
import uploadDoc from '@common/utils/uploadDoc';
import HistoryMemoDesc from '@components/HistoryMemoDesc';
import { Label, GetLabel, GetLabelWithLang } from '@common/utils/label';

import { getMemoDescHistory, selectMemoDescHistory } from '../store/empMemoDescHistorySlice';
import { regex } from 'app/auth';


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

function MemorandumRequest(props) {
	const dispatch = useDispatch();
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const memorandum = useSelector(({ memorandum }) => memorandum.empAddMemorandum);
	const theme = useTheme();

	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const routeParams = useParams();
	const { memorandumId } = routeParams;
	const lang = useSelector(({ i18n }) => i18n.language);
	const [masterData, setMasterData] = useState({});
	const [loading, setLoading] = useState(false);
	const [disable, setDisable] = useState(false);
	const [approverUsers, setApproverUsers] = useState([]);
	const memoDescHistory = useSelector(selectMemoDescHistory);

	useEffect(() => {
		setLoading(false);
	}, [memorandum]);

	useDeepCompareEffect(() => {
		async function updateProductState() {
			console.log("routeParams", routeParams);

			let usersData = await masterApi.getAllUsers();
			let data = [];
			_.isArray(usersData)
				&& usersData.map((d) => (data.push({ value: d.employId, title: d.fullname + "(" + d.employId + ")" })));
			//console.log("cityDropDown", data);
			setApproverUsers(data);

			if (memorandumId === 'new') {
				dispatch(newMemorandum({ uuid: uuid }));
			} else {
				dispatch(getMemorandum(routeParams));
				dispatch(getMemoDescHistory(routeParams));
				setLoading(true);
			}
		}
		updateProductState();
		//	setLoading(false);
	}, [dispatch, routeParams]);

	console.log("memorandum", memorandum);
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
						name: 'mmType',
						id: 'mmType',
						title: GetLabel('BL00238'),
						disabled: memorandum && memorandum.id && memorandum.id !== null && memorandum.mmPendingId !== -1,
						options: [
							{ title: 'Normal', value: 'Normal' },
							{ title: 'Express', value: 'Express' }
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
						disabled: memorandum && memorandum.id && memorandum.id !== null && memorandum.mmPendingId !== -1,
						options: [
							{ title: GetLabel('BL00243'), value: 'Standard' },
							{ title: GetLabel('BL00244'), value: 'Confidential' }
						],
						validationProps: {
							required: 'This is a mandatory field'
						},
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
						maxlength: 51,
						pattern: {
							value: regex.maxSize50,
							message: 'Please enter alpha-numeric and below 50 characters'
						},
						disabled: memorandum && memorandum.id && memorandum.id !== null && memorandum.mmPendingId !== -1,
						validationProps: {
							required: 'This is a mandatory field'
							// ,
							// maxLength: {
							// 	value: 50,
							// 	message: 'Maximum 50 characters are allowed.'
							// }
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
						//disabled: memorandum && memorandum.id && memorandum.id !== null && memorandum.mmPendingId !== -1,
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
						title: GetLabel('BL00245'),
						options: approverUsers,
						disabled: memorandum && memorandum.id && memorandum.id !== null ? true : false,
						validationProps: {
							required: 'This is a mandatory field'
						}
					}
				]
			},
			{
				//title: 'Travel Details',
				id: 'attachmentList',
				layout: { column: 1, spacing: 2, size: 'small', label: 'fixed' },
				fields: [
					{
						type: 'array',
						name: 'attList',
						id: 'attList',
						//title: 'Array',
						layout: { column: 8, spacing: 2, size: 'small', label: 'blank', type: 'table' },
						columns: ['Attachment', 'File'],
						columns: GetLabel(['BL00134', 'BL00222']),
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
								id: 'attachmentUrl',
								dynamic: {
									field: 'createdBy',
									value: uuid
								}
							}
						]
					}
				]
			},
		]
	};

	//console.log("memorandum", memorandum);
	if (memorandum && 'id' in memorandum && memorandum.id === null) {
		console.log("template.sections[4]", template.sections[4]);
		template.sections[4].fields[0].columns = template.sections[4].fields[0].columns.filter(item => item !== 'File');
	}

	// if (memorandum && 'id' in memorandum && memorandum.id === null) {
	// 	template.sections[0].fields[0].columns = template.sections[0].fields[0].columns.filter(item => item !== 'File');
	// }

	if (memorandum && memorandum.id && memorandum.id !== null && memorandum.mmPendingId !== -1) {
		template = {
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
							title: GetLabelWithLang('BL00164', lang),
							disabled: true
						},
						{
							type: 'text',
							name: 'createdBy',
							id: 'createdBy',
							title: GetLabelWithLang('BL00165', lang),
							disabled: true
						},
						{
							type: 'text',
							name: 'department',
							id: 'department',
							title: GetLabelWithLang('BL00167', lang),
							disabled: true
						},
						{
							type: 'text',
							name: 'designation',
							id: 'designation',
							title: GetLabelWithLang('BL00166', lang),
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
							title: GetLabelWithLang('BL00238', lang),
							disabled: true,
							options: [
								{ title: GetLabelWithLang('BL00240', lang), value: 'Normal' },
								{ title: GetLabelWithLang('BL00241', lang), value: 'Express' }
							],
							validationProps: {
								required: 'This is a mandatory field'
							},
						},
						{
							type: 'radio',
							name: 'mmClass',
							id: 'mmClass',
							title: GetLabelWithLang('BL00242', lang),
							disabled: true,
							options: [
								{ title: GetLabelWithLang('BL00243', lang), value: 'Standard' },
								{ title: GetLabelWithLang('BL00244', lang), value: 'Confidential' }
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
							title: GetLabelWithLang('BL00054', lang),
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
							title: GetLabelWithLang('BL00055', lang),
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
							title: GetLabelWithLang('BL00246', lang),
							options: approverUsers,
							disabled: true
						}
					]
				},
				{
					title: GetLabelWithLang('BL00413', lang),
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
								titles: GetLabelWithLang(['BL00246', 'BL00089', 'BL00143', 'BL00140', 'BL00134'], lang)
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
	}

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

	function updateApproverArray(objList) {
		//console.log("objList",objList);
		return Promise.all(
			objList.map(async product => {
				product.maPriorityEmp = product;
				return product;
			})
		);
	}

	async function onSubmit(values) {
		if (disable) {
			return;
		}
		//setDisable(true);
		console.log(values);
		//setLoading(true);
		let attList = await updateAttachment(values.data.attList);
		let approverListData = values.data.approverListData;
		let approverList = [];
		approverListData.forEach((item, index) => {
			approverList.push({
				"maPriority": (index + 1),
				"maPriorityEmp": item
			});
		}
		);

		// //console.log("trvlDtlList",trvlDtlList);
		// if (values.button.toUpperCase() === "SAVE") {
		// 	let lrData = {};
		// 	//lrData = data;

		// 	lrData.totalAmt = values.data.totalAmt;
		// 	lrData.empRemark = values.data.empRemark;


		// 	lrData.outcome = "SAVE";
		// 	lrData.crList = crList;
		// 	if (memorandum !== null) {
		// 		lrData.id = memorandum.id;
		// 	}

		// 	console.log("data", lrData);
		// 	dispatch(saveMemorandum(lrData));
		// }
		if (values.button.toUpperCase() === "SUBMIT") {
			let lrData = {};
			//lrData = data;
			lrData.mmType = values.data.mmType;
			lrData.mmTitle = values.data.mmTitle;
			lrData.mmDesc = values.data.mmDesc;
			lrData.mmClass = values.data.mmClass;
			lrData.attList = attList;

			if (memorandumId !== 'new') {
				lrData.id = memorandum.id;
				lrData.approverList = approverList;
			}
			else {
				lrData.approverList = approverList;
			}
			console.log("data", lrData);
			dispatch(saveMemorandum(lrData));
		}
	}

	function onCancel() {
		//console.log(values);
		props.history.push("/app/employee-service/memorandum");
	}

	// if ((!memorandum || (memorandum && routeParams.memorandumId !== memorandum.id)) && routeParams.memorandumId !== 'new') {
	// 	return <FuseLoading />;
	// }

	return (
		(loading || (memorandum && memorandum.id && routeParams.memorandumId.toString() !== memorandum.id.toString())) ?
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
										to="/app/employee-service/memorandum"
										color="inherit"
									>
										<Icon className="text-20">
											{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
										</Icon>
										<span className="mx-4"><Label labelId="BL00029" /></span>
									</Typography>
								</FuseAnimate>

								<div className="flex items-center max-w-full">
									<FuseAnimate animation="transition.expandIn" delay={300}>
										<img
											className="w-32 sm:w-48 rounded"
											src="assets/images/ecommerce/product-image-placeholder.png"
										//	alt={form.name}
										/>
									</FuseAnimate>
									<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography className="text-16 sm:text-20 truncate">
												{memorandum && memorandum.id !== null ? <Label labelId="BL00235" /> : <Label labelId="BL00236" />}
											</Typography>
										</FuseAnimate>
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography variant="caption"><Label labelId="BL00234" /></Typography>
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
						</div>
					)
				}
				content={

					<div className="p-16 sm:p-24">
						{memorandumId == "new" && (
							<SmartForm
								//defaultValues={memorandum}
								template={template}
								//watchFields={['']}
								// validate={validate}
								onSubmit={onSubmit}
								onCancel={onCancel}
								//onChange={data => handleDataChange(data)}
								buttons={memorandum && memorandum.id && memorandum.id !== null ? ['cancel'] : ['submit', 'cancel']}
							/>
						)}
						{memorandumId !== "new" && memorandum && memorandum.id && (
							<SmartForm
								defaultValues={memorandum}
								template={template}
								//watchFields={['']}
								// validate={validate}
								onSubmit={onSubmit}
								onCancel={onCancel}
								//onChange={data => handleDataChange(data)}
								buttons={memorandum && memorandum.id && memorandum.id !== null && memorandum.mmPendingId !== -1 ? ['cancel'] : ['submit', 'cancel']}
							/>
						)}
					</div>
				}
			//innerScroll
			/>
	);
}

export default withReducer('memorandum', reducer)(MemorandumRequest);
