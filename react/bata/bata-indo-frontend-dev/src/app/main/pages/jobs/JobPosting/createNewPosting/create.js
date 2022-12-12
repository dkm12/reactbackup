import FuseAnimate from '@core/core/Animate';
import FusePageSimple from '@core/core/PageSimple';
import FuseLoading from '@core/core/Loading';
import reducer from '../../store';
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
import React, { useState } from 'react';
import FormData from 'form-data';
// import AboutTab from './tabs/AboutTab';
// import PhotosVideosTab from './tabs/PhotosVideosTab';
// import TimelineTab from './tabs/TimelineTab';
import SmartForm from '@smart-form';
import axios from 'axios';
import api from '@api';
import { getNewPosting, saveNewPosting, newPostingRequest } from '../../store/empNewPostingSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getJobsList } from '../../store/empNewPostingsSlice';
import masterApi from '@common/utils/masterApi';
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

function Create(props) {

	const dispatch = useDispatch();
	const theme = useTheme();
	const jobs = useSelector(({ jobs }) => jobs.empNewPosting);
	// const [tabValue, setTabValue] = useState(0);
	const routeParams = useParams();
	const [empCategories, setEmpCategories] = useState([]);
	// const uuid = useSelector(({ auth }) => auth.user.uuid);
	const { jpId } = routeParams;
	const [locationList, setLocationList] = useState([]);
	const [deptList, setDeptList] = useState([]);
	const [desigList, setDesigList] = useState([]);
	const today = new Date();

	useDeepCompareEffect(() => {
		async function updateProductState() {

			let EmpCatData = await masterApi.getAllActiveEmployeeCategorys();
			const empCatdata = [];
			_.isArray(EmpCatData)
				&& EmpCatData.map((d) => (empCatdata.push({ value: d.ecCode, title: d.ecName })));
			setEmpCategories(empCatdata);

			let locList = await masterApi.getAllActiveCities();
			const locdata = [];
			_.isArray(locList)
				&& locList.map((d) => (locdata.push({ value: d.cityName, title: d.cityName })));
			setLocationList(locdata);

			let dptList = await masterApi.getAllActivedepartments();
			const deptdata = [];
			_.isArray(dptList)
				&& dptList.map((d) => (deptdata.push({ value: d.dptName, title: d.dptName })));
			setDeptList(deptdata);

			let dsgList = await masterApi.getAllActivedesignation();
			const desigdata = [];
			_.isArray(dsgList)
				&& dsgList.map((d) => (desigdata.push({ value: d.dsgName, title: d.dsgName })));
			setDesigList(desigdata);

			// console.log("routeParams",routeParams);
			if (jpId != 'new') {
				dispatch(getNewPosting(jpId));
			}
		}
		updateProductState();
	}, [dispatch, routeParams]);

	let template = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed', type: 'grid' },
		sections: [
			{
				layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },

				fields: [
					{
						type: 'text',
						name: 'jbdTitle',
						id: 'jbdTitle',
						title: GetLabel('BL00069'),
						disabled: false,
						pattern: {
							value: regex.maxSize50,
							message: 'Please enter alpha-numeric and below 50 characters'
						},
						validationProps: {
							required: 'This is a mandatory field'
						}
					},

					{
						type: 'text',
						name: 'jbdDesc',
						id: 'jbdDesc',
						title: GetLabel('BL00070'),
						pattern: {
							value: regex.maxSize50,
							message: 'Please enter alpha-numeric and below 50 characters'
						},
						validationProps: {
							required: 'This is a mandatory field',
						}
					},
					{
						type: 'text',
						name: 'jbdYOExp',
						id: 'jbdYOExp',
						title: GetLabel('BL00071'),
						pattern: {
							value: regex.numOfYearReg,
							message: 'Please enter valid no of year'
						},
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'autocomplete',
						name: 'jbdDesigName',
						id: 'jbdDesigName',
						title: GetLabel('BL00072'),
						options: desigList,
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'autocomplete',
						name: 'jbdDeptName',
						id: 'jbdDeptName',
						title: GetLabel('BL00073'),
						options: deptList,
						validationProps: {
							required: 'This is a mandatory field'
						}
					},

					{
						type: 'autocomplete',
						name: 'jbdLocName',
						id: 'jbdLocName',
						title: GetLabel('BL00074'),
						options: locationList,
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'date',
						name: 'jbdPubFrmDate',
						id: 'jbdPubFrmDate',
						title: GetLabel('BL00076'),
						min: (jpId == 'new') && today,
						validationProps: {
							required: "This is a mandatory field",
							validate: [
								{
									condition: "jbdPubFrmDate <= jbdPubToDate",
									message: "From date should be less than or equal to till date."
								}
							],
							manual: [
								{
									condition: (jpId == 'new') ? `jbdPubFrmDate >= today` : `jbdPubFrmDate != jbdPubFrmDate`,
									message: (jpId == 'new') ? "From Date should be more than or equal to today's date." : "This is a mandatory field" 
								}
							]
							// manual: [
							// 	{
							// 		condition: "jbdPubFrmDate < jbdPubToDate",
							// 		message: "Value should not be greater than To date."
							// 	}
							//
						}
					},
					{
						type: 'date',
						name: 'jbdPubToDate',
						id: 'jbdPubToDate',
						title: GetLabel('BL00077'),
						min: today,
						validationProps: {
							required: "This is a mandatory field",
							validate: [
								{
									condition: "jbdPubToDate >= jbdPubFrmDate",
									message: "From date should be less than or equal to till date."
								}
							],
							manual: [
								{
									condition: (jpId == 'new') ? `jbdPubToDate >= today` : `jbdPubToDate != jbdPubToDate`,
									message: (jpId == 'new') ? "Till date should be more than or equal to today's date." : "This is a mandatory field"
								}
							]
						}
					},
					{
						type: 'text',
						name: 'jbdNumVacancy',
						id: 'jbdNumVacancy',
						title: GetLabel('BL00075'),
						pattern: {
							value: regex.vacancyReg,
							message: 'Please enter valid no of vacancy'
						},
						validationProps: {
							required: 'This is a mandatory field',
						}
					},
					{
						type: 'multiSelect',
						name: 'jbdApplyEmpCats',
						id: 'jbdApplyEmpCats',
						title: GetLabel('BL00265'),
						options: empCategories,
						validationProps: {
							required: 'This is a mandatory field'
						}

					}
				]
			}
		]
	}
	async function uploadFile(objList) {
		if (objList.data.ijpResumeFile.length) {
			let resp = await uploadDoc.saveDoc(objList.data.ijpResumeFile[0], "referralApplicant");
			return resp[0].fileUrl;
		}
		else {
			return '';
		}
	}

	async function onSubmit(values) {
		// let url = await uploadFile(values)
		if(values.button == "publish") {
			if(jobs && jobs.jbdId) {
				dispatch(saveNewPosting({ type: "publish", data: { ...values.data, jbdId: jobs.jbdId } }));
			}
			else {
				dispatch(saveNewPosting({ type: "savePublish", data: { ...values.data, jbdApplyEmpCats: values.data.jbdApplyEmpCats.toString() } }));
			}
		}
		if(jobs && jobs.jbdId && jpId !== null) {
			dispatch(saveNewPosting({ type: "update", data: { ...values.data, jbdId: jobs.jbdId, jbdApplyEmpCats: values.data.jbdApplyEmpCats.toString() } }));
		} 
		if(values.button == "save"){
			dispatch(saveNewPosting({ type: "save", data: { ...values.data, jbdApplyEmpCats: values.data.jbdApplyEmpCats.toString() } }));
		}
	}

	function onCancel() {
		props.history.push("/app/jobs/jobposting/newpostingLists");
	}


	return (
		((jobs && jobs.id && routeParams.jpId.toString() !== jobs.id.toString())) ?
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
										to="/app/jobs/jobposting/newpostingLists"
										color="inherit"
									>
										<Icon className="text-20">
											{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
										</Icon>
										<span className="mx-4"><Label labelId="BL00372" /></span>
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
												<Label labelId="BL00372" />
											</Typography>
										</FuseAnimate>
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography variant="caption">

												{/* {leaveRequest && leaveRequest.id !== null ? "Edit Leave Request" : "New Leave Request"} */}
												{jpId == 'new' ? <Label labelId="BL00289" /> : <Label labelId="BL00290" />}
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

						{jpId != 'new' && jobs && jobs.jbdId && jobs.jbdId == jpId && <SmartForm
							defaultValues={jobs}
							template={template}
							watchFields={['firstname', 'include_portfolio', 'email', 'country']}
							validate={validate}
							onSubmit={onSubmit}
							onCancel={onCancel}
							onChange={values => console.log('outvalues', values)}
							buttons={jobs && jobs.outcome && jobs.outcome.toUpperCase() === "SUBMIT" ? ['cancel'] : ['save', 'publish', 'cancel']}
						/>}

						{jpId == 'new' &&
							<SmartForm
								template={template}
								watchFields={['firstname', 'include_portfolio', 'email', 'country']}
								validate={validate}
								onSubmit={onSubmit}
								onCancel={onCancel}
								onChange={values => console.log('outvalues', values)}
								buttons={jobs && jobs.outcome && jobs.outcome.toUpperCase() === "SUBMIT" ? ['cancel'] : ['save', 'publish', 'cancel']}
							/>
						}

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


export default withReducer('jobs', reducer)(Create);
