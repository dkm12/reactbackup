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
import { applyTraining, getViewTraining } from '../store/empViewTrainingSlice';
import reducer from '../store';
import SmartForm from '@smart-form';
import { Label, GetLabel } from '@common/utils/label';

import History from '@components/History';
//import { getClaimHistorys, selectClaimHistorys } from '../store/empClaimHistorysSlice';
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

function ViewTraining(props) {
	const dispatch = useDispatch();
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const userName = useSelector(({ auth }) => auth.user.name);
	const training = useSelector(({ training }) => training.empViewTraining);

	const theme = useTheme();

	const classes = useStyles(props);
	const routeParams = useParams();
	const [nextApprover, setNextApprover] = useState([]);
	const [loading, setLoading] = useState(false);


	//const claimHistorys = useSelector(selectClaimHistorys);
	useEffect(() => {
		setLoading(false);
	}, [training]);

	useDeepCompareEffect(() => {
		async function updateProductState() {
			const { trainingId } = routeParams;
			setLoading(true);
			let params = {
				trainingId: trainingId,
				uuid: uuid
			}
			dispatch(getViewTraining(params));

			//dispatch(getClaimHistorys(routeParams));

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
				//title: 'Travel Claim Detail',
				id: 'trainingSection',
				fields: [
					{
						type: 'text',
						name: 'trngName',
						id: 'trngName',
						title: GetLabel('BL00379'),
						disabled: true
					},
					{
						type: 'text',
						name: 'trngDuration',
						id: 'trngDuration',
						title: GetLabel('BL00383'),
						disabled: true
					},
					{
						type: 'text',
						name: 'trngDesc',
						id: 'trngDesc',
						title: GetLabel('BL00384'),
						disabled: true
					},
					{
						type: 'text',
						name: 'learningPlatform',
						id: 'learningPlatform',
						title: GetLabel('BL00381'),
						disabled: true
					},
					{
						type: 'text',
						name: 'trngCategory',
						id: 'trngCategory',
						title: GetLabel('BL00365'),
						disabled: true
					},
					{
						type: 'text',
						name: 'trngSubCategory',
						id: 'trngSubCategory',
						title: GetLabel('BL00368'),
						disabled: true
					},
					{
						type: 'date',
						name: 'trngPublishTillDate',
						id: 'trngPublishTillDate',
						title: GetLabel('BL00057'),
						disabled: true
					}
				]
			},
			// {
			// 	title: 'For Approver',
			// 	id: 'nextApproverTable',
			// 	fields: [
			// 		{
			// 			type: 'select',
			// 			name: 'pendingWith',
			// 			id: 'pendingWith',
			// 			title: 'Next Approver',
			// 			options: _.isArray(training.nextApprover) ? training.nextApprover : [],
			// 			validationProps: {
			// 				required: 'This is a mandatory field'
			// 			},
			// 			unregister: ['reject','return']
			// 		},
			// 		{
			// 			type: 'textarea',
			// 			name: 'approverRemarks',
			// 			id: 'approverRemarks',
			// 			title: 'Remarks',
			// 			maxlength: 151,
			// 			validationProps: {
			// 				required: 'This is a mandatory field',
			// 				validationProps: {
			// 					maxLength: {
			// 						value: 150,
			// 						message: 'Maximum 150 characters are allowed.'
			// 					}
			// 				}
			// 			}
			// 			// ,
			// 			// unregister: ['accept']
			// 		}
			// 	]
			// },
		]
	};

	console.log("training.nextApprover.length", training.nextApprover);
	console.log("template.sections[9]", template.sections[9]);
	// if (training && 'nextApprover' in training
	// 	&& training.statusCode.toUpperCase() === "PENDING_WITH_FINANCE_DIR"
	// 	&& _.isArray(training.nextApprover)
	// 	&& training.nextApprover.length === 0) {
	// 	delete template.sections[9].fields[0];
	// }

	// if (training && 'statusCode' in training && training.statusCode.toUpperCase() === "PENDING_WITH_PRESIDENT_DIR") {
	// 	delete template.sections[9].fields[0];
	// }

	function onSubmit(values) {
		console.log("values", values);
		if (values.button.toUpperCase() === "APPLY") {
			let lrData = {};
			lrData.trngId = training.trngId;
			dispatch(applyTraining(lrData));
			setLoading(true);
		}
		// if (values.button.toUpperCase() === "ACCEPT") {
		// 	let lrData = {};
		// 	//lrData = data;
		// 	lrData.trxNo = values.data.trxNo;
		// 	lrData.approverId = uuid;
		// 	if (values.data.statusCode.toUpperCase() == "PENDING_WITH_HOD".toUpperCase()
		// 		|| values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_ONE".toUpperCase()
		// 		|| (values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_DIR".toUpperCase()
		// 			&& values.data.claimedTotalAmt >= 100000)
		// 		|| values.data.statusCode.toUpperCase() == "PENDING_WITH_PRESIDENT_DIR".toUpperCase()


		// 	) {
		// 		lrData.pendingWith = values.data.pendingWith;
		// 	}
		// 	lrData.currentStatus = values.data.statusCode;
		// 	lrData.outcome = "FORWARD";
		// 	lrData.remarks = values.data.approverRemarks;
		// 	console.log("data", lrData);
		// 	dispatch(saveViewTraining(lrData));
		// 	setLoading(true);

		// }
		// if (values.button.toUpperCase() === "REJECT") {
		// 	let lrData = {};
		// 	//lrData = data;
		// 	lrData.trxNo = values.data.trxNo;
		// 	lrData.approverId = uuid;
		// 	if (values.data.statusCode.toUpperCase() == "PENDING_WITH_HOD".toUpperCase()
		// 		|| values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_ONE".toUpperCase()
		// 		|| (values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_DIR".toUpperCase()
		// 			&& values.data.claimedTotalAmt >= 100000)
		// 		|| values.data.statusCode.toUpperCase() == "PENDING_WITH_PRESIDENT_DIR".toUpperCase()
		// 	) {
		// 		lrData.pendingWith = values.data.pendingWith;
		// 	}
		// 	lrData.currentStatus = values.data.statusCode;
		// 	lrData.outcome = "REJECT";
		// 	lrData.remarks = values.data.approverRemarks;
		// 	console.log("data", lrData);
		// 	dispatch(saveViewTraining(lrData));
		// 	setLoading(true);
		// }
		// if (values.button.toUpperCase() === "RETURN") {
		// 	let lrData = {};
		// 	//lrData = data;
		// 	lrData.trxNo = values.data.trxNo;
		// 	values.data.approverId = uuid;
		// 	if (values.data.statusCode.toUpperCase() == "PENDING_WITH_HOD".toUpperCase()
		// 		|| values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_ONE".toUpperCase()
		// 		|| (values.data.statusCode.toUpperCase() == "PENDING_WITH_FINANCE_DIR".toUpperCase()
		// 			&& values.data.claimedTotalAmt >= 100000)
		// 		|| values.data.statusCode.toUpperCase() == "PENDING_WITH_PRESIDENT_DIR".toUpperCase()
		// 	) {
		// 		lrData.pendingWith = values.data.pendingWith;
		// 	}
		// 	lrData.currentStatus = values.data.statusCode;
		// 	lrData.outcome = "RETURN";
		// 	lrData.remarks = values.data.approverRemarks;
		// 	console.log("data", lrData);
		// 	dispatch(saveViewTraining(lrData));
		// 	setLoading(true);
		// }
	}

	function onCancel() {
		//console.log(values);
		props.history.push("/app/employee-service/open-training-list");
	}


	// console.log("training",training);
	// console.log("routeParams.trainingId",routeParams.trainingId.toString());
	// console.log("training.trngId",training.trngId);
	// console.log("routeParams.trainingId.toString() !== training.trngId",routeParams.trainingId.toString() !== training.trngId);
	return (
		(loading || (training && 'trngId' in training && routeParams.trainingId.toString() !== training.trngId.toString())) ?
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
										to="/app/employee-service/open-training-list"
										color="inherit"
									>
										<Icon className="text-20">
											{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
										</Icon>
										<span className="mx-4"><Label labelId="BL00375" /></span>
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
												<Label labelId="BL00387" />
											</Typography>
										</FuseAnimate>
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography variant="caption"><Label labelId="BL00387" /></Typography>
										</FuseAnimate>
									</div>
								</div>
							</div>

							<div className="flex flex-1 justify-end px-12">
								{/* <FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography variant="caption">
												{training && training.trngId !== null && claimHistorys && _.isArray(claimHistorys) ? <History data={claimHistorys} /> : ""}
											</Typography>
										</FuseAnimate> */}
							</div>
							{/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Button
								className="whitespace-no-wrap normal-case"
								variant="contained"
								color="secondary"
								disabled={!canBeSubmitted()}
								onClick={() => dispatch(saveViewTraining(form))}
							>
								Save
							</Button>
						</FuseAnimate> */}
						</div>
					)
				}
				content={
					<>
						{training && training.trngId && (
							<div className="p-16 sm:p-24">
								<SmartForm
									defaultValues={training}
									template={template}
									onSubmit={onSubmit}
									onCancel={onCancel}
									buttons={training && training.isApplied ? ['cancel'] : ['Apply', 'cancel']}
								/>
							</div>
						)}
					</>
				}
			/>
	);
}

export default withReducer('training', reducer)(ViewTraining);
