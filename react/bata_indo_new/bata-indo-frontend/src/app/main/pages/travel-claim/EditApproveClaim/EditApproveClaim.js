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
import { saveApproveClaim, getApproveClaim, getNextApprover } from '../store/empApproveClaimSlice';
import reducer from '../store';
import ClaimHistoryTable from '../ClaimHistory/ClaimHistoryTable';
import SmartForm from '@smart-form';
import { Label, GetLabel } from '@common/utils/label';

import History from '@components/History';
import { getClaimHistorys, selectClaimHistorys } from '../store/empClaimHistorysSlice';
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

function EditApproveApproveClaim(props) {
	const dispatch = useDispatch();
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const userName = useSelector(({ auth }) => auth.user.name);
	const travelClaim = useSelector(({ travelClaim }) => travelClaim.empApproveClaim);

	const theme = useTheme();

	const classes = useStyles(props);
	const routeParams = useParams();
	const [nextApprover, setNextApprover] = useState([]);
	const [loading, setLoading] = useState(false);


	const claimHistorys = useSelector(selectClaimHistorys);
	useEffect(() => {
		setLoading(false);
	}, [travelClaim]);

	useDeepCompareEffect(() => {
		async function updateProductState() {
			const { travelClaimId } = routeParams;
			setLoading(true);
			let params = {
				travelClaimId: travelClaimId,
				uuid: uuid
			}
			dispatch(getApproveClaim(params));

			dispatch(getClaimHistorys(routeParams));

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
				// title: GetLabel('BL00125'),
				id: 'travelSection',
				fields: [
					{
						type: 'text',
						name: 'fullname',
						id: 'fullname',
						title: GetLabel('BL00184'),
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
						title: GetLabel('BL00185'),
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
					},
					{
						type: 'date',
						name: 'fromDate',
						id: 'fromDate',
						title: GetLabel('BL00105'),
						disabled: true
					},
					{
						type: 'date',
						name: 'toDate',
						id: 'toDate',
						title: GetLabel('BL00106'),
						disabled: true
					},
					{
						type: 'number',
						name: 'claimedTotalAmt',
						id: 'claimedTotalAmt',
						title: GetLabel('BL00186'),
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
				title: GetLabel('BL00125'),
				id: 'trvlDtlList1Section',
				layout: { column: 1, spacing: 2, size: 'medium', label: 'fixed' },
				fields: [
					{
						type: 'table',
						name: 'trvlDtlList',
						id: 'trvlDtlList',
						columns: {
							ids: ['trvlDate', 'trvlFromDisplayName', 'trvltToDisplayName', 'modeOfTravelName', 'trvlKm', 'trvlAmt', 'attachmentId'],
							// titles: ['Travel Date', 'Travel From', 'Travel To', 'Mode of Travel', 'Distance', 'Fare Amount', 'Attachment']
							titles: GetLabel(['BL00130', 'BL00131', 'BL00132', 'BL00133', 'BL00223', 'BL00197', 'BL00123'])
						}
					}
				]
			},
			{
				//title: '',
				id: 'travelDtlSummary',
				fields: [
					{
						type: 'number',
						name: 'travelDtlTotal',
						id: 'travelDtlTotal',
						title: GetLabel('BL00124'),
						disabled: true,
						calculation: {
							type: 'add',
							from: ['trvlDtlList*trvlAmt']
						}
					},
					{
						type: 'text',
						name: 'travelDtlRemark',
						id: 'travelDtlRemark',
						title: GetLabel('BL00140'),
						disabled: true
					}
				]
			},
			{
				title: GetLabel('BL00135'),
				id: 'trvlHotelListSection',
				layout: { column: 1, spacing: 2, size: 'medium', label: 'fixed' },
				fields: [
					{
						type: 'table',
						name: 'trvlHotelList',
						id: 'trvlHotelList',
						columns: {
							ids: ['hotelName', 'cityDisplayName', 'trvltFrom', 'trvltTo', 'billNo', 'trvlAmt', 'taxAmt', 'taxAmtTotal', 'attachmentId'],
							// titles: ['Hotel Name', 'City', 'From', 'To', 'Bill No.', 'Amount (Excluding Tax)', 'Tax Amount', 'Total (Including Tax)', 'Attachment']
							titles: GetLabel(['BL00136', 'BL00137', 'BL00127', 'BL00128', 'BL00120', 'BL00198', 'BL00138', 'BL00139', 'BL00123'])
						}
					}
				]
			},
			{
				//title: 'travelDtlSummary',
				id: 'hotelDtlSummary',
				fields: [
					{
						type: 'number',
						name: 'hotelDtlTotal',
						id: 'hotelDtlTotal',
						title: GetLabel('BL00124'),
						disabled: true,
						calculation: {
							type: 'add',
							from: ['trvlHotelList*trvlAmt', 'trvlHotelList*taxAmt']
						}
					},
					{
						type: 'text',
						name: 'hotelDtlRemark',
						id: 'hotelDtlRemark',
						title: GetLabel('BL00140'),
						disabled: true
					}
				]
			},
			{
				title: GetLabel('BL00141'),
				id: 'trvlFoodListSection',
				layout: { column: 1, spacing: 2, size: 'medium', label: 'fixed' },
				fields: [
					{
						type: 'table',
						name: 'trvlFoodList',
						id: 'trvlFoodList',
						columns: {
							ids: ['restaurantName', 'cityDisplayName', 'fhdDate', 'invoiceNo', 'foodAmt', 'attachmentId'],
							// titles: ['Restaurant Name', 'City', 'Date', 'Invoice No.', 'Amount', 'Attachment']
							titles: GetLabel(['BL00142', 'BL00137', 'BL00143', 'BL00199', 'BL00122', 'BL00123'])
						}
					}
				]
			},
			{
				//title: 'travelDtlSummary',
				id: 'foodDtlSummary',
				fields: [
					{
						type: 'number',
						name: 'foodDtlTotal',
						id: 'foodDtlTotal',
						title: GetLabel('BL00124'),
						disabled: true,
						calculation: {
							type: 'add',
							from: ['trvlFoodList*foodAmt']
						}
					},
					{
						type: 'text',
						name: 'foodDtlRemark',
						id: 'foodDtlRemark',
						title: GetLabel('BL00140'),
						disabled: true
					}
				]
			},
			{
				title: GetLabel('BL00144'),
				id: 'trvlOthBillListSection',
				layout: { column: 1, spacing: 2, size: 'medium', label: 'fixed' },
				fields: [
					{
						type: 'table',
						name: 'trvlOthBillList',
						id: 'trvlOthBillList',
						columns: {
							ids: ['othBillTypeName', 'billDesc', 'othBillAmt', 'attachmentId'],
							// titles: ['Bill Type', 'Bill Description', 'Bill Amount', 'Attachment']
							titles: GetLabel(['BL00145', 'BL00149', 'BL00150', 'BL00123'])
						}
					}
				]
			},
			{
				//title: 'travelDtlSummary',
				id: 'otherDtlSummary',
				fields: [
					{
						type: 'number',
						name: 'otherDtlTotal',
						id: 'otherDtlTotal',
						title: GetLabel('BL00124'),
						disabled: true,
						calculation: {
							type: 'add',
							from: ['trvlOthBillList*othBillAmt']
						}
					},
					{
						type: 'text',
						name: 'otherDtlRemark',
						id: 'otherDtlRemark',
						title: GetLabel('BL00140'),
						disabled: true
					}
				]
			},
			{
				title: GetLabel('BL00189'),
				id: 'nextApproverTable',
				fields: [
					{
						type: 'select',
						name: 'pendingWith',
						id: 'pendingWith',
						title: GetLabel('BL00189'),
						options: _.isArray(travelClaim.nextApprover) ? travelClaim.nextApprover : [],
						validationProps: {
							required: 'This is a mandatory field'
						},
						unregister: ['reject', 'return']
					},
					{
						type: 'textarea',
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
						// ,
						// unregister: ['accept']
					}
				]
			},
		]
	};

	console.log("travelClaim.nextApprover.length", travelClaim.nextApprover);
	console.log("template.sections[9]", template.sections[9]);
	if (travelClaim && 'nextApprover' in travelClaim
		&& travelClaim.statusCode.toUpperCase() === "PENDING_WITH_FINANCE_DIR"
		&& _.isArray(travelClaim.nextApprover)
		&& travelClaim.nextApprover.length === 0) {
		delete template.sections[9].fields[0];
	}

	if (travelClaim && 'statusCode' in travelClaim && travelClaim.statusCode.toUpperCase() === "PENDING_WITH_PRESIDENT_DIR") {
		delete template.sections[9].fields[0];
	}

	function onSubmit(values) {
		console.log("values", values);
		if (values.button.toUpperCase() === "ACCEPT") {
			let lrData = {};
			//lrData = data;
			lrData.trxNo = values.data.trxNo;
			lrData.approverId = uuid;
			if (values.data.statusCode.toUpperCase() == "PENDING_WITH_HOD".toUpperCase()
				|| values.data.statusCode.toUpperCase() == "PENDING_WITH_CLAIM_HR".toUpperCase()
				|| values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_ONE".toUpperCase()
				|| (values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_DIR".toUpperCase()
					&& values.data.claimedTotalAmt >= 10000000)
				|| values.data.statusCode.toUpperCase() == "PENDING_WITH_PRESIDENT_DIR".toUpperCase()


			) {
				lrData.pendingWith = values.data.pendingWith;
			}
			lrData.currentStatus = values.data.statusCode;
			lrData.outcome = "FORWARD";
			lrData.remarks = values.data.approverRemarks;
			console.log("data", lrData);
			dispatch(saveApproveClaim(lrData));
			setLoading(true);

		}
		if (values.button.toUpperCase() === "REJECT") {
			let lrData = {};
			//lrData = data;
			lrData.trxNo = values.data.trxNo;
			lrData.approverId = uuid;
			if (values.data.statusCode.toUpperCase() == "PENDING_WITH_HOD".toUpperCase()
				|| values.data.statusCode.toUpperCase() == "PENDING_WITH_CLAIM_HR".toUpperCase()
				|| values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_ONE".toUpperCase()
				|| (values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_DIR".toUpperCase()
					&& values.data.claimedTotalAmt >= 10000000)
				|| values.data.statusCode.toUpperCase() == "PENDING_WITH_PRESIDENT_DIR".toUpperCase()
			) {
				lrData.pendingWith = values.data.pendingWith;
			}
			lrData.currentStatus = values.data.statusCode;
			lrData.outcome = "REJECT";
			lrData.remarks = values.data.approverRemarks;
			console.log("data", lrData);
			dispatch(saveApproveClaim(lrData));
			setLoading(true);
		}
		if (values.button.toUpperCase() === "RETURN") {
			let lrData = {};
			//lrData = data;
			lrData.trxNo = values.data.trxNo;
			values.data.approverId = uuid;
			if (values.data.statusCode.toUpperCase() == "PENDING_WITH_HOD".toUpperCase()
				|| values.data.statusCode.toUpperCase() == "PENDING_WITH_CLAIM_HR".toUpperCase()
				|| values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_ONE".toUpperCase()
				|| (values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_DIR".toUpperCase()
					&& values.data.claimedTotalAmt >= 10000000)
				|| values.data.statusCode.toUpperCase() == "PENDING_WITH_PRESIDENT_DIR".toUpperCase()
			) {
				lrData.pendingWith = values.data.pendingWith;
			}
			lrData.currentStatus = values.data.statusCode;
			lrData.outcome = "RETURN";
			lrData.remarks = values.data.approverRemarks;
			console.log("data", lrData);
			dispatch(saveApproveClaim(lrData));
			setLoading(true);
		}
	}

	function onCancel() {
		//console.log(values);
		props.history.push("/app/claim-requests/approve-travel-claim");
	}


	// console.log("travelClaim",travelClaim);
	// console.log("routeParams.travelClaimId",routeParams.travelClaimId.toString());
	// console.log("travelClaim.id",travelClaim.id);
	// console.log("routeParams.travelClaimId.toString() !== travelClaim.id",routeParams.travelClaimId.toString() !== travelClaim.id);
	return (
		(loading || (travelClaim && 'id' in travelClaim && routeParams.travelClaimId.toString() !== travelClaim.id.toString())) ?
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
										to="/app/claim-requests/approve-travel-claim"
										color="inherit"
									>
										<Icon className="text-20">
											{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
										</Icon>
										<span className="mx-4"><Label labelId="BL00042" /></span>
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
												<Label labelId="BL00174" />
											</Typography>
										</FuseAnimate>
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography variant="caption"><Label labelId="BL00174" /></Typography>
										</FuseAnimate>
									</div>
								</div>
							</div>

							<div className="flex flex-1 justify-end px-12">
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Typography variant="caption">
										{travelClaim && travelClaim.id !== null && claimHistorys && _.isArray(claimHistorys) ? <History data={claimHistorys} /> : ""}
									</Typography>
								</FuseAnimate>
							</div>
							{/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Button
								className="whitespace-no-wrap normal-case"
								variant="contained"
								color="secondary"
								disabled={!canBeSubmitted()}
								onClick={() => dispatch(saveApproveClaim(form))}
							>
								Save
							</Button>
						</FuseAnimate> */}
						</div>
					)
				}
				content={
					<>
						{travelClaim && travelClaim.id && (
							<div className="p-16 sm:p-24">
								<SmartForm
									defaultValues={travelClaim}
									template={template}
									//watchFields={['']}
									// validate={validate}
									onSubmit={onSubmit}
									onCancel={onCancel}
									//onChange={data => handleDataChange(data)}
									buttons={['accept', 'reject', 'return', 'cancel']}
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

export default withReducer('travelClaim', reducer)(EditApproveApproveClaim);
