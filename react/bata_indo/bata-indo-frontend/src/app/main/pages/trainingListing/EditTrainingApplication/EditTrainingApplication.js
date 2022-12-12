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
import { saveTrainingApplication, getTrainingApplication, getNextApprover } from '../store/empTrainingApplicationSlice';
import reducer from '../store';
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

function EditApproveTrainingApplication(props) {
	const dispatch = useDispatch();
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const userName = useSelector(({ auth }) => auth.user.name);
	const training = useSelector(({ training }) => training.empTrainingApplication);

	const theme = useTheme();

	const classes = useStyles(props);
	const routeParams = useParams();
	const [loading, setLoading] = useState(false);


	const claimHistorys = useSelector(selectClaimHistorys);
	useEffect(() => {
		setLoading(false);
	}, [training]);

	useDeepCompareEffect(() => {
		async function updateProductState() {
			const { trngAppId } = routeParams;
			setLoading(true);
			let params = {
				trngAppId: trngAppId,
				uuid: uuid
			}
			dispatch(getTrainingApplication(params));
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
				title: GetLabel('BL00293'),
				id: 'ApplicantSection',
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
						name: 'appliedById',
						id: 'appliedById',
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
						name: 'transactionNumber',
						id: 'transactionNumber',
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
				layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
				title: 'Training Detail',
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
						name: 'learningPlatform',
						id: 'learningPlatform',
						title: GetLabel('BL00381'),
						disabled: true
					}
				]
			},
			{
				title: GetLabel('BL00382'),
				id: 'nextApproverTable',
				fields: [
					{
						type: 'select',
						name: 'action',
						id: 'action',
						title: GetLabel('BL00195'),
						options: training && training.statusCode && training.statusCode.toUpperCase() === "PENDING_WITH_TRNG_ADMIN" ? [
							{ title: "ENROLL", value: "ENROLL" }

						] : [
							{ title: "COMPLETE", value: "COMPLETE" }

						],
						validationProps: {
							required: 'This is a mandatory field'
						}
					}
				]
			},
		]
	};

	if (training && 'statusCode' in training
		&&
		!(training.statusCode.toUpperCase() === "PENDING_WITH_TRNG_ADMIN"
			||
			training.statusCode.toUpperCase() === "ENROLLED")
	) {
		delete template.sections[2];
	}

	function onSubmit(values) {
		console.log("values", values);
		if (values.button.toUpperCase() === "ACCEPT") {
			let lrData = {};
			//lrData = data;
			lrData.trxNo = values.data.transactionNumber;
			lrData.outcome = values.data.action;
			dispatch(saveTrainingApplication(lrData));
			setLoading(true);

		}
	}

	function onCancel() {
		//console.log(values);
		props.history.push("/app/hr-services/training-applications");
	}


	// console.log("training",training);
	// console.log("routeParams.trngAppId",routeParams.trngAppId.toString());
	// console.log("training.trngAppId",training.trngAppId);
	// console.log("routeParams.trngAppId.toString() !== training.trngAppId",routeParams.trngAppId.toString() !== training.trngAppId);
	return (
		(loading || (training && 'trngAppId' in training && routeParams.trngAppId.toString() !== training.trngAppId.toString())) ?
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
										to="/app/hr-services/training-applications"
										color="inherit"
									>
										<Icon className="text-20">
											{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
										</Icon>
										<span className="mx-4">Training Applications</span>
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
												{'View Training Application'}
											</Typography>
										</FuseAnimate>
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography variant="caption">View Training Application</Typography>
										</FuseAnimate>
									</div>
								</div>
							</div>

							<div className="flex flex-1 justify-end px-12">
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Typography variant="caption">
										{training && training.trngAppId !== null && claimHistorys && _.isArray(claimHistorys) ? <History data={claimHistorys} /> : ""}
									</Typography>
								</FuseAnimate>
							</div>
							{/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Button
								className="whitespace-no-wrap normal-case"
								variant="contained"
								color="secondary"
								disabled={!canBeSubmitted()}
								onClick={() => dispatch(saveTrainingApplication(form))}
							>
								Save
							</Button>
						</FuseAnimate> */}
						</div>
					)
				}
				content={
					<>
						{training && training.trngAppId && (
							<div className="p-16 sm:p-24">
								<SmartForm
									defaultValues={training}
									template={template}
									//watchFields={['']}
									// validate={validate}
									onSubmit={onSubmit}
									onCancel={onCancel}
									//onChange={data => handleDataChange(data)}
									buttons={
										training && training.statusCode.toUpperCase() == "PENDING_WITH_TRNG_ADMIN".toUpperCase() ||
											training && training.statusCode.toUpperCase() == "ENROLLED".toUpperCase()
											?
											['accept', 'cancel'] : ['cancel']

									}
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

export default withReducer('training', reducer)(EditApproveTrainingApplication);
