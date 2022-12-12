import FuseAnimate from '@core/core/Animate';
import FusePageSimple from '@core/core/PageSimple';
import FuseLoading from '@core/core/Loading';
import uploadDoc from '@common/utils/uploadDoc';
import _ from '@lodash';
import Avatar from '@material-ui/core/Avatar';
import { useDeepCompareEffect } from '@core/hooks';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import reducer from '../../store';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import FormData from 'form-data';
// import AboutTab from './tabs/AboutTab';
// import PhotosVideosTab from './tabs/PhotosVideosTab';
// import TimelineTab from './tabs/TimelineTab';
import SmartForm from '@smart-form';
import axios from 'axios';
import api from '@api';
import { saveApplicantInfo, newApplicantRequest } from '../../store/empApplicantsInfoSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { regex } from 'app/auth';
import { Label, GetLabel } from '@common/utils/label';

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



function Applicants(props) {
	const dispatch = useDispatch();
	const applicants = useSelector(({ applicants }) => applicants.empApplicantsInfoSlice);
	const theme = useTheme();
	const routeParams = useParams();
	// const uuid = useSelector(({ auth }) => auth.user.uuid);
	const { jbdId } = routeParams;
	useDeepCompareEffect(() => {
		async function updateProductState() {
			console.log("routeParams", routeParams);
			dispatch(newApplicantRequest());
		}
		updateProductState();
	}, [dispatch, routeParams]);
	let template = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed', type: 'grid' },
		// title: 'Job Application Form',
		description: 'Form for applying Job',
		sections: [
			{
				layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
				id: 'personal_information',
				fields: [
					{
						type: 'text',
						name: 'ijpCurrRoleSince',
						id: 'ijpCurrRoleSince',
						title: GetLabel('BL00298'),
						disabled: false,
						pattern: {
							value: regex.yearReg,
							message: 'Please enter valid format YYYY'
						},
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'text',
						name: 'ijpTotalExp',
						id: 'ijpTotalExp',
						title: GetLabel('BL00071'),
						pattern: {
							value: regex.numOfYearReg,
							message: 'Please enter valid no of year'
						},
						validationProps: {
							required: 'This is a mandatory field',
							maxLength: {
								value: 25,
								message: 'Maximum 25 characters are allowed.'
							}
						}
					},
					{
						type: 'file',
						name: 'ijpResumeFile',
						id: 'ijpResumeFile',
						accept: '.pdf,.doc,.docx',
						title: GetLabel('BL00086'),
						validationProps: {
							required: 'This is a mandatory field',
							size: {
								value: 1,
								message: 'File size should not be more than 1mb.'
							},
						}
					},
				]
			}

		]
	};

	async function uploadFile(objList) {
		console.log(objList);
		if (objList.data.ijpResumeFile.length) {
			let resp = await uploadDoc.saveDoc(objList.data.ijpResumeFile[0], "referralApplicant");
			return resp[0].fileUrl;
		}
		else {
			return '';
		}
	}

	async function onSubmit(values) {
		let url = await uploadFile(values)
		await dispatch(saveApplicantInfo({ ...values.data, jrtJobId: jbdId, ijpResumeFileName: url }));
	}

	function onCancel() {

		props.history.push("/app/jobs/CurrentInternalJobs");
	}

	return (
		((applicants && applicants.id && routeParams.jbdId.toString() !== applicants.id.toString())) ?
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
										to="/app/jobs/CurrentInternalJobs"
										color="inherit"
									>
										<Icon className="text-20">
											{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
										</Icon>
										<span className="mx-4"><Label labelId="BL00295" /></span>
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
												<Label labelId="BL00296" />
											</Typography>
										</FuseAnimate>
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography variant="caption"><Label labelId="BL00296" /></Typography>
										</FuseAnimate>
									</div>
								</div>
							</div>
						</div>
					)
				}
				content={
					<div className="p-16 sm:p-24">
						<SmartForm
							// defaultValues={usdata}
							template={template}
							watchFields={['firstname', 'include_portfolio', 'email', 'country']}
							validate={validate}
							onSubmit={onSubmit}
							onCancel={onCancel}
							onChange={values => console.log('outvalues', values)}
							buttons={applicants && applicants.outcome && applicants.outcome.toUpperCase() === "SUBMIT" ? ['cancel'] : ['submit', 'cancel']}
						/>

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


export default withReducer('applicants', reducer)(Applicants);
