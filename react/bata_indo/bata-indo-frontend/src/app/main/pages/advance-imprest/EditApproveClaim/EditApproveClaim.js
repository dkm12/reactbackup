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
	const advanceImprest = useSelector(({ advanceImprest }) => advanceImprest.empApproveClaim);

	const theme = useTheme();

	const classes = useStyles(props);
	const routeParams = useParams();
	const [nextApprover, setNextApprover] = useState([]);
	const [loading, setLoading] = useState(false);
	const claimHistorys = useSelector(selectClaimHistorys);


	useEffect(() => {
		setLoading(false);
	}, [advanceImprest]);

	useDeepCompareEffect(() => {
		async function updateProductState() {
			const { advanceImprestId } = routeParams;
			let params = {
				advanceImprestId: advanceImprestId,
				uuid: uuid
			}
			dispatch(getApproveClaim(params));
			dispatch(getClaimHistorys(routeParams));
			setLoading(true);
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
				//title: 'Advance Imprest Detail',
				id: 'travelSection',
				fields: [
					{
						type: 'text',
						name: 'fullname',
						id: 'fullname',
						title: GetLabel('BL00184'),
						disabled: true
					},
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
						type: 'text',
						name: 'purpose',
						id: 'purpose',
						title: GetLabel('BL00211'),
						disabled: true
					},
					{
						type: 'textarea',
						name: 'description',
						id: 'description',
						title: GetLabel('BL00055'),
						disabled: true
					},
					{
						type: 'number',
						name: 'amount',
						id: 'amount',
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
					},
					{
						type: 'attachment',
						name: 'attachment',
						id: 'attachment',
						title: GetLabel('BL00123')
					}
				]
			},
			{
				title: GetLabel('BL00225'),
				id: 'nextApproverTable',
				fields: [
					{
						type: 'select',
						name: 'pendingWith',
						id: 'pendingWith',
						title: GetLabel('BL00189'),
						options: _.isArray(advanceImprest.nextApprover) ? advanceImprest.nextApprover : [],
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
							maxLength: {
								value: 150,
								message: 'Maximum 150 characters are allowed.'
							}
						}

					}
				]
			},
		]
	};


	if (advanceImprest && advanceImprest.attachment === null) {
		delete template.sections[0].fields[9];
	}

	if (advanceImprest && 'nextApprover' in advanceImprest
		&& advanceImprest.statusCode.toUpperCase() === "PENDING_WITH_FINANCE_DIR"
		&& _.isArray(advanceImprest.nextApprover)
		&& advanceImprest.nextApprover.length === 0) {
		delete template.sections[1].fields[0];
	}

	if (advanceImprest && 'statusCode' in advanceImprest && advanceImprest.statusCode.toUpperCase() === "PENDING_WITH_PRESIDENT_DIR") {
		delete template.sections[1].fields[0];
	}

	function onSubmit(values) {
		console.log("values", values);
		if (values.button.toUpperCase() === "ACCEPT") {
			let lrData = {};
			//lrData = data;
			lrData.trxNo = values.data.trxNo;
			lrData.approverId = uuid;
			if (values.data.statusCode.toUpperCase() == "PENDING_WITH_HOD".toUpperCase()
				|| values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_ONE".toUpperCase()
				|| (values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_DIR".toUpperCase()
					&& values.data.amount >= 100000)
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
				|| values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_ONE".toUpperCase()
				|| (values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_DIR".toUpperCase()
					&& values.data.amount >= 100000)
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
				|| values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_ONE".toUpperCase()
				|| (values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_DIR".toUpperCase()
					&& values.data.amount >= 100000)
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
		props.history.push("/app/claim-requests/approve-advance-imprest");
	}


	// console.log("advanceImprest",advanceImprest);
	// console.log("routeParams.advanceImprestId",routeParams.advanceImprestId.toString());
	// console.log("advanceImprest.id",advanceImprest.id);
	// console.log("routeParams.advanceImprestId.toString() !== advanceImprest.id",routeParams.advanceImprestId.toString() !== advanceImprest.id);
	return (
		(loading || (advanceImprest && 'id' in advanceImprest && routeParams.advanceImprestId.toString() !== advanceImprest.id.toString())) ?
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
										to="/app/claim-requests/approve-advance-imprest"
										color="inherit"
									>
										<Icon className="text-20">
											{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
										</Icon>
										<span className="mx-4"><Label labelId="BL00043" /></span>
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
												<Label labelId="BL00226" />
											</Typography>
										</FuseAnimate>
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography variant="caption"><Label labelId="BL00226" /></Typography>
										</FuseAnimate>
									</div>
								</div>
							</div>
							<div className="flex flex-1 justify-end px-12">
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Typography variant="caption">
										{advanceImprest && advanceImprest.id !== null && claimHistorys && _.isArray(claimHistorys) ? <History data={claimHistorys} /> : ""}
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
						{advanceImprest && advanceImprest.id && (
							<div className="p-16 sm:p-24">
								<SmartForm
									defaultValues={advanceImprest}
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

export default withReducer('advanceImprest', reducer)(EditApproveApproveClaim);
