import FuseAnimate from '@core/core/Animate';
import FusePageSimple from '@core/core/PageSimple';
import FuseLoading from '@core/core/Loading';
import reducer from '../store/index';
import Icon from '@material-ui/core/Icon';
import _ from '@lodash';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { useDeepCompareEffect } from '@core/hooks';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import uploadDoc from '@common/utils/uploadDoc';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import FormData from 'form-data';
// import AboutTab from './tabs/AboutTab';
// import PhotosVideosTab from './tabs/PhotosVideosTab';
// import TimelineTab from './tabs/TimelineTab';
import SmartForm from '@smart-form';
import axios from 'axios';
import api from '@api';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getTrainingInfo, saveTrainingInfo, newTrainingRequest } from '../store/empTrainingFormSlice'
import masterApi from '@common/utils/masterApi';
import { Label, GetLabel } from '@common/utils/label';

import { regex } from 'app/auth';

const useStyles = makeStyles(theme => ({
	layoutHeader: {
		height: 320,
		minHeight: 320,
		[theme.breakpoints.down('md')]: {
			height: 240,
			minHeight: 240
		}
	}
}));

function TrainingForm(props) {

	const dispatch = useDispatch();
	// const ids = useSelector(({ training }) => training.trainingsList.ids);
	const theme = useTheme();
	const training = useSelector(({ training }) => training.empTrainingForm);
	const routeParams = useParams();
	const { trgId } = routeParams;
	const [masterData, setMasterData] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(false);
	}, [training]);


	useDeepCompareEffect(() => {
		async function updateProductState() {
			console.log("routeParams", routeParams);


			let catData = await masterApi.getAllActiveTrainingCategory();
			let catArray = [];
			_.isArray(catData)
				&& catData.map((d) => (catArray.push({ value: d.trngCatCode, title: d.trngCatName })));


			let subCatArray = [];
			let subCatData = await masterApi.getAllActiveTrainingSubCategory();
			_.isArray(subCatData)
				&& subCatData.map((d) => (subCatArray.push({ value: d.trngSubcatCode, title: d.trngSubcatName })));

			//console.log("cityDropDown", data);
			//setCities(cityArray);
			setMasterData(
				{
					categories: catArray,
					subCategories: subCatArray
				}
			);
			if (trgId === 'new') {
				dispatch(newTrainingRequest());
			} else {
				dispatch(getTrainingInfo(trgId));
			}
		}
		updateProductState();
		setLoading(false);
	}, [dispatch, routeParams]);

	let template = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed', type: 'grid' },
		sections: [
			{
				layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
				id: 'personal_information',
				fields: [
					{
						type: 'text',
						name: 'trngName',
						id: 'trngName',
						title: GetLabel('BL00379'),
						disabled: training && training.trngStatus && training.trngStatus.toUpperCase() === "OPEN",
						maxlength: 51,
						pattern: {
							value: regex.maxSize50,
							message: 'Please enter alpha-numeric and below 50 characters'
						},
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
						name: 'trngDuration',
						id: 'trngDuration',
						title: GetLabel('BL00383'),
						disabled: training && training.trngStatus && training.trngStatus.toUpperCase() === "OPEN",
						maxlength: 51,
						pattern: {
							value: regex.maxSize50,
							message: 'Please enter alpha-numeric and below 50 characters'
						},
						validationProps: {
							required: 'This is a mandatory field',
							maxLength: {
								value: 50,
								message: 'Maximum 50 characters are allowed.'
							}
						}
					},
					{
						type: 'textarea',
						name: 'trngDesc',
						id: 'trngDesc',
						title: GetLabel('BL00384'),
						disabled: training && training.trngStatus && training.trngStatus.toUpperCase() === "OPEN",
						maxlength: 251,
						pattern: {
							value: regex.maxSize250,
							message: 'Please enter alpha-numeric and below 250 characters'
						},
						validationProps: {
							required: 'This is a mandatory field',
							maxLength: {
								value: 250,
								message: 'Maximum 250 characters are allowed.'
							}
						}
					},
					{
						type: 'text',
						name: 'learningPlatform',
						id: 'learningPlatform',
						title: GetLabel('BL00381'),
						disabled: training && training.trngStatus && training.trngStatus.toUpperCase() === "OPEN",
						maxlength: 51,
						pattern: {
							value: regex.maxSize50,
							message: 'Please enter alpha-numeric and below 50 characters'
						},
						validationProps: {
							required: 'This is a mandatory field',
							maxLength: {
								value: 50,
								message: 'Maximum 50 characters are allowed.'
							}
						}
					},
					{
						type: 'select',
						name: 'trngCategory',
						id: 'trngCategory',
						title: GetLabel('BL00365'),
						options: masterData.categories,
						disabled: training && training.trngStatus && training.trngStatus.toUpperCase() === "OPEN",
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'select',
						name: 'trngSubCategory',
						id: 'trngSubCategory',
						title: GetLabel('BL00368'),
						options: masterData.subCategories,
						disabled: training && training.trngStatus && training.trngStatus.toUpperCase() === "OPEN",
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'date',
						name: 'trngPublishTillDate',
						id: 'trngPublishTillDate',
						title: GetLabel('BL00057'),
						validationProps: {
							required: 'This is a mandatory field',
							manual: [
								{
									condition: `trngPublishTillDate >= today`,
									message: "Publish Till should be greater than or equal to today's date."
								}
							]
						}
					},

				]
			}

		]
	};



	async function onSubmit(values) {
		let lrData = {};
		if (values.button.toUpperCase() === "SAVE") {

			lrData.trngName = values.data.trngName;
			lrData.trngDuration = values.data.trngDuration;
			lrData.trngDesc = values.data.trngDesc;
			lrData.learningPlatform = values.data.learningPlatform;
			lrData.trngCategory = values.data.trngCategory;
			lrData.trngSubCategory = values.data.trngSubCategory;
			lrData.trngPublishTillDate = values.data.trngPublishTillDate;

			lrData.trngStatus = "SAVE AS DRAFT";
			console.log("data", lrData);
			if (training !== null && 'trngId' in training && trgId !== 'new') {
				lrData.trngId = training.trngId;
				dispatch(saveTrainingInfo({ type: "update", data: lrData }));
			}
			else {
				//lrData.id = null;
				dispatch(saveTrainingInfo({ type: "save", data: lrData }));
			}

			setLoading(true);
		}
		if (values.button.toUpperCase() === "PUBLISH") {
			if ('trngStatus' in values.data && values.data.trngStatus.toUpperCase() === "OPEN") {
				lrData.trngName = values.data.trngName;
				lrData.trngDuration = values.data.trngDuration;
				lrData.trngDesc = values.data.trngDesc;
				lrData.learningPlatform = values.data.learningPlatform;
				lrData.trngCategory = values.data.trngCategory;
				lrData.trngSubCategory = values.data.trngSubCategory;
				lrData.trngPublishTillDate = values.data.trngPublishTillDate;
			}
			else {
				lrData.trngName = values.data.trngName;
				lrData.trngDuration = values.data.trngDuration;
				lrData.trngDesc = values.data.trngDesc;
				lrData.learningPlatform = values.data.learningPlatform;
				lrData.trngCategory = values.data.trngCategory;
				lrData.trngSubCategory = values.data.trngSubCategory;
				lrData.trngPublishTillDate = values.data.trngPublishTillDate;
			}
			lrData.trngStatus = "Open";
			console.log("data", lrData);
			setLoading(true);
			if (training !== null && 'trngId' in training && trgId !== 'new') {
				lrData.trngId = training.trngId;
				dispatch(saveTrainingInfo({ type: "update", data: lrData }));
			}
			else {
				lrData.id = null;
				dispatch(saveTrainingInfo({ type: "save", data: lrData }));
			}

		}

		// if(training && training.trngId && trgId !== 'new'){
		// 	if(values.button == "update") {
		// 		console.log("Id",trgId);
		// 		dispatch(saveTrainingInfo({type: "update", data: {...values.data, trngId: trgId}}));

		// 	}
		// 	else if(values.button == "publish"){
		// 		dispatch(saveTrainingInfo({type: "publish", data: {...values.data, trngId: trgId}}));
		// 	}
		// 	props.history.push("/app/hr-services/training-admin-list");
		// }
		// else{
		// 	dispatch(saveTrainingInfo({type: "save", data: {...values.data}}));
		// }


		// props.history.push("/app/hr-services/training-admin-list");

	}

	function onCancel() {

		props.history.push("/app/hr-services/training-admin-list");
	}

	// console.log("loading",loading);
	// console.log("loading",routeParams.trgId.toString());
	// console.log("loading",training && 'trngId' in training && training.trngId.toString());
	// console.log("loading",training && training.trngId);
	return (
		(loading || (training && training.trngId && routeParams.trgId.toString() !== training.trngId.toString())) ?
			<FuseLoading />
			:
			<FusePageSimple
				classes={{
					toolbar: 'px-16 sm:px-24',
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
										to="/app/hr-services/training-admin-list"
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
												{/* {leaveRequest && leaveRequest.id !== null ? "Edit Leave Request" : "New Leave Request"} */}
												{trgId == 'new' ? <Label labelId="BL00388" /> : <Label labelId="BL00385" />}
											</Typography>
										</FuseAnimate>
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography variant="caption">

												{/* {leaveRequest && leaveRequest.id !== null ? "Edit Leave Request" : "New Leave Request"} */}

											</Typography>
										</FuseAnimate>
									</div>
								</div>
							</div>

						</div>
					)
				}
				content={
					<div className="p-16 sm:p-24">
						{trgId !== 'new' && training && training.trngId && <SmartForm
							defaultValues={training}
							template={template}
							//watchFields={['firstname', 'include_portfolio', 'email', 'country']}
							//validate={validate}
							onSubmit={onSubmit}
							onCancel={onCancel}
							//onChange={values => console.log('outvalues', values)}
							buttons={training && training.trngStatus && training.trngStatus.toUpperCase() === "OPEN" ? ['publish', 'cancel'] : ['save', 'publish', 'cancel']}
						/>}

						{trgId == 'new' && training && training && <SmartForm
							// defaultValues={training}
							template={template}
							//watchFields={['firstname', 'include_portfolio', 'email', 'country']}
							//validate={validate}
							onSubmit={onSubmit}
							onCancel={onCancel}
							//onChange={values => console.log('outvalues', values)}
							buttons={training && training.trngStatus && training.trngStatus.toUpperCase() === "OPEN" ? ['publish', 'cancel'] : ['save', 'publish', 'cancel']}
						/>}

					</div>
				}
			/>

	);
}

function validate(watchValues, errorMethods) {
	let { errors, setError, clearErrors } = errorMethods;

	// Firstname validation
	if (watchValues && watchValues['firstname'] === 'Admin') {
		console.log(`watchValues`, watchValues)
		if (!errors['firstname']) {
			setError('firstname', {
				type: 'manual',
				message: 'You cannot use this first name'
			})
		}
	} else {
		if (errors && errors['firstname'] && errors['firstname']['type'] === 'manual') {
			clearErrors('firstname');
		}
	}
}


export default withReducer('training', reducer)(TrainingForm);
