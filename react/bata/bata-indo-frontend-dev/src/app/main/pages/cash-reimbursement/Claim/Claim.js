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
import { saveCashReimbursement, newCashReimbursement, getCashReimbursement } from '../store/empCashReimbursementSlice';
import reducer from '../store';
import SmartForm from '@smart-form';
import masterApi from '@common/utils/masterApi';
import ClaimHistoryTable from '../ClaimHistory/ClaimHistoryTable';
import uploadDoc from '@common/utils/uploadDoc';
import History from '@components/History';
import { getClaimHistorys, selectClaimHistorys } from '../store/empClaimHistorysSlice';
import { Label, GetLabel, GetLabelWithLang } from '@common/utils/label'; const useStyles = makeStyles(theme => ({
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

function ClaimRequest(props) {
	const dispatch = useDispatch();
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const cashReimbursement = useSelector(({ cashReimbursement }) => cashReimbursement.empCashReimbursement);
	const theme = useTheme();

	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const routeParams = useParams();
	const { cashReimbursementId } = routeParams;
	const lang = useSelector(({ i18n }) => i18n.language);
	const [masterData, setMasterData] = useState({});
	const [loading, setLoading] = useState(false);
	const [disable, setDisable] = useState(false);
	const claimHistorys = useSelector(selectClaimHistorys);

	useEffect(() => {
		setLoading(false);
	}, [cashReimbursement]);

	useDeepCompareEffect(() => {
		async function updateProductState() {
			console.log("routeParams", routeParams);
			if (cashReimbursementId === 'new') {
				dispatch(newCashReimbursement({ uuid: uuid }));
			} else {
				dispatch(getCashReimbursement(routeParams));
				dispatch(getClaimHistorys(routeParams));
				setLoading(true);
			}
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
				//title: 'Travel Details',
				id: 'trvlDtlListSection',
				layout: { column: 1, spacing: 2, size: 'small', label: 'fixed' },
				fields: [
					{
						type: 'array',
						name: 'crList',
						id: 'crList',
						//title: 'Array',
						layout: { column: 8, spacing: 2, size: 'small', label: 'blank', type: 'table' },
						// columns: ['Purpose', 'Bill No.', 'Expense Date', 'Amount', 'Attachment', 'File'],
						columns: GetLabel(['BL00211', 'BL00120', 'BL00121', 'BL00122', 'BL00123', 'BL00222']),
						subFields: [
							{
								type: 'text',
								name: 'purpose',
								id: 'purpose',
								title: 'Purpose',
								maxlength: 51,
								validationProps: {
									required: 'This is a mandatory field',
									maxLength: {
										value: 50,
										message: 'Maximum 50 characters are allowed.'
									}
								}
							},
							{
								type: 'text',
								name: 'billNo',
								id: 'billNo',
								title: 'Bill No.',
								maxlength: 51,
								validationProps: {
									required: 'This is a mandatory field',
									maxLength: {
										value: 50,
										message: 'Maximum 50 characters are allowed.'
									}
								}
							},
							{
								type: 'date',
								name: 'crExpenseDate',
								id: 'crExpenseDate',
								max: 'today',
								title: 'Expense Date',
								validationProps: {
									required: 'This is a mandatory field',
									manual: [
										{
											condition: `this*crExpenseDate <= today`,
											message: "Expense Date should be less than or equal to today's date."
										}
									]
								}
							},
							{
								type: 'number',
								name: 'amount',
								id: 'amount',
								title: 'Amount',
								maxlength: 11,
								validationProps: {
									required: 'This is a mandatory field',
									maxLength: {
										value: 10,
										message: 'Maximum 10 digits are allowed.'
									},
									manual: [
										{
											condition: `this*amount > 0`,
											message: "Amount should be greater than 0."
										},
										{
											condition: `this*amount < 10000000000`,
											message: "Amount should be less than 10000000000."
										}
									]

								}
							},
							{
								type: 'file',
								name: 'attachmentFile',
								id: 'attachmentFile',
								title: 'Attachment',
								accept: 'image/jpeg,image/png,image/jpg,application/pdf',
								validationProps: {
									size: {
										value: 1,
										message: 'File size should not be more than 1mb.'
									},
								}
							},
							{
								type: 'attachment',
								name: 'attachmentId',
								id: 'attachmentId',
								dynamic: {
									field: 'createdBy',
									value: uuid
								}
							}
						]
					}
				]
			},
			{
				//title: '',
				id: 'crListSummary',
				fields: [
					{
						type: 'number',
						name: 'totalAmt',
						id: 'totalAmt',
						title: GetLabel('BL00124'),
						calculation: {
							type: 'add',
							from: ['crList*amount']
						}
					},
					{
						type: 'text',
						name: 'empRemark',
						id: 'empRemark',
						title: GetLabel('BL00140'),
						maxlength: 151,
						validationProps: {
							maxLength: {
								value: 150,
								message: 'Maximum 150 characters are allowed.'
							}
						}
					}
				]
			}
		]
	};

	if (cashReimbursement && 'id' in cashReimbursement && cashReimbursement.id === null) {
		template.sections[0].fields[0].columns = template.sections[0].fields[0].columns.filter(item => item !== 'File');
	}

	if (cashReimbursement && cashReimbursement.outcome && cashReimbursement.outcome.toUpperCase() === "SUBMIT" && cashReimbursement.statusName.toUpperCase() !== "Returned".toUpperCase()) {
		template = {
			layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
			//title: 'Job Application Form',
			description: 'Form for applying Job',
			sections: [
				{
					layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
					title: GetLabelWithLang('BL00412', lang),
					id: 'travelSection',
					fields: [
						{
							type: 'text',
							name: 'fullname',
							id: 'fullname',
							title: GetLabelWithLang('BL00184', lang),
							disabled: true
						},
						// {
						// 	type: 'text',
						// 	name: 'grade',
						// 	id: 'grade',
						// 	title: 'Grade',
						// 	disabled: true
						// },
						// {
						// 	type: 'date',
						// 	name: 'fromDate',
						// 	id: 'fromDate',
						// 	title: 'Date of Join',
						// 	disabled: true
						// },
						{
							type: 'text',
							name: 'createdBy',
							id: 'createdBy',
							title: GetLabelWithLang('BL00185', lang),
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
						},
						{
							type: 'number',
							name: 'totalAmt',
							id: 'totalAmt',
							title: GetLabelWithLang('BL00186', lang),
							disabled: true
						},
						{
							type: 'text',
							name: 'trxNo',
							id: 'trxNo',
							title: GetLabelWithLang('BL00187', lang),
							disabled: true
						},
						{
							type: 'text',
							name: 'statusCode',
							id: 'statusCode',
							title: GetLabelWithLang('BL00188', lang),
							disabled: true
						}
					]
				},
				{
					//title: 'Travel Details',
					id: 'crListSection',
					layout: { column: 1, spacing: 2, size: 'medium', label: 'fixed' },
					fields: [
						{
							type: 'table',
							name: 'crList',
							id: 'crList',
							columns: {
								ids: ['purpose', 'billNo', 'crExpenseDate', 'amount', 'attachmentId'],
								// titles: ['Purpose', 'Bill No', 'Expense Date', 'Amount', 'Attachment']
								titles: GetLabelWithLang(['BL00211', 'BL00120', 'BL00121', 'BL00122', 'BL00123'], lang)
							}
						}
					]
				},
				{
					//title: '',
					id: 'crListSummary',
					fields: [
						{
							type: 'number',
							name: 'totalAmt',
							id: 'totalAmt',
							title: GetLabelWithLang('BL00124', lang),
							disabled: true,
							calculation: {
								type: 'add',
								from: ['crList*amount']
							}
						},
						{
							type: 'text',
							name: 'empRemark',
							id: 'empRemark',
							title: GetLabelWithLang('BL00140', lang),
							disabled: true
						}
					]
				}
			]
		};
	}

	function updateAttachment(objList) {
		//console.log("objList",objList);
		return Promise.all(
			objList.map(async product => {
				let fileURL = product.attachmentId;
				if (product.attachmentFile && product.attachmentFile.length > 0) {
					let fileObj = product.attachmentFile[0];
					let fileData = await uploadDoc.saveDoc(fileObj, "cashrem");
					//console.log("fileData",fileData);
					if (_.isArray(fileData) && fileData.length > 0) {
						fileURL = fileData[0].fileUrl;
					}
				}
				product.attachmentId = fileURL;
				return product;
			})
		);
	}
	async function onSubmit(values) {
		if (disable) {
			return;
		}
		setDisable(true);
		console.log(values);
		setLoading(true);
		let crList = await updateAttachment(values.data.crList);

		//console.log("trvlDtlList",trvlDtlList);
		if (values.button.toUpperCase() === "SAVE") {
			let lrData = {};
			//lrData = data;

			lrData.totalAmt = values.data.totalAmt;
			lrData.empRemark = values.data.empRemark;


			lrData.outcome = "SAVE";
			lrData.crList = crList;
			if (cashReimbursement !== null) {
				lrData.id = cashReimbursement.id;
			}

			console.log("data", lrData);
			dispatch(saveCashReimbursement(lrData));
		}
		if (values.button.toUpperCase() === "SUBMIT") {
			let lrData = {};
			//lrData = data;
			lrData.outcome = "SUBMIT";
			lrData.totalAmt = values.data.totalAmt;
			lrData.empRemark = values.data.empRemark;

			lrData.crList = crList;
			if (cashReimbursement !== null) {
				lrData.id = cashReimbursement.id;
			}

			console.log("data", lrData);
			dispatch(saveCashReimbursement(lrData));
		}
	}

	function onCancel() {
		//console.log(values);
		props.history.push("/app/employee-service/cash-reimbursement");
	}

	// if ((!cashReimbursement || (cashReimbursement && routeParams.cashReimbursementId !== cashReimbursement.id)) && routeParams.cashReimbursementId !== 'new') {
	// 	return <FuseLoading />;
	// }

	return (
		(loading || (cashReimbursement && cashReimbursement.id && routeParams.cashReimbursementId.toString() !== cashReimbursement.id.toString())) ?
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
										to="/app/employee-service/cash-reimbursement"
										color="inherit"
									>
										<Icon className="text-20">
											{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
										</Icon>
										<span className="mx-4"><Label labelId="BL00026" /></span>
									</Typography>
								</FuseAnimate>

								<div className="flex items-center max-w-full">
									<FuseAnimate animation="transition.expandIn" delay={300}>
										<img
											className="w-32 sm:w-48 rounded"
											src="app/assets/images/ecommerce/product-image-placeholder.png"
										//	alt={form.name}
										/>
									</FuseAnimate>
									<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography className="text-16 sm:text-20 truncate">
												{cashReimbursement && cashReimbursement.id !== null ? <Label labelId="BL00178" /> : <Label labelId="BL00179" />}
											</Typography>
										</FuseAnimate>
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography variant="caption"><Label labelId="BL00039" /></Typography>
										</FuseAnimate>
									</div>
								</div>
							</div>
							<div className="flex flex-1 justify-end px-12">
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Typography variant="caption">
										{cashReimbursement && cashReimbursement.id !== null && claimHistorys && _.isArray(claimHistorys) ? <History data={claimHistorys} /> : ""}
									</Typography>
								</FuseAnimate>
							</div>
						</div>
					)
				}
				content={

					<div className="p-16 sm:p-24">
						{cashReimbursementId == "new" && (
							<SmartForm
								//defaultValues={cashReimbursement}
								template={template}
								//watchFields={['']}
								// validate={validate}
								onSubmit={onSubmit}
								onCancel={onCancel}
								//onChange={data => handleDataChange(data)}
								buttons={cashReimbursement && cashReimbursement.outcome && cashReimbursement.outcome.toUpperCase() === "SUBMIT" ? ['cancel'] : ['save', 'submit', 'cancel']}
							/>
						)}
						{cashReimbursementId !== "new" && cashReimbursement && cashReimbursement.id && (
							<SmartForm
								defaultValues={cashReimbursement}
								template={template}
								//watchFields={['']}
								// validate={validate}
								onSubmit={onSubmit}
								onCancel={onCancel}
								//onChange={data => handleDataChange(data)}
								buttons={cashReimbursement && cashReimbursement.outcome && cashReimbursement.outcome.toUpperCase() === "SUBMIT" && cashReimbursement.statusName.toUpperCase() !== "Returned".toUpperCase() ? ['cancel'] : ['save', 'submit', 'cancel']}
							/>
						)}
					</div>
				}
			//innerScroll
			/>
	);
}

export default withReducer('cashReimbursement', reducer)(ClaimRequest);
