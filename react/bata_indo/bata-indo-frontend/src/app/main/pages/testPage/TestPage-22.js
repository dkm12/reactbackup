import FuseAnimate from '@core/core/Animate';
import FusePageSimple from '@core/core/PageSimple';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import FormData from 'form-data';
import AboutTab from './tabs/AboutTab';
import PhotosVideosTab from './tabs/PhotosVideosTab';
import TimelineTab from './tabs/TimelineTab';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AlarmIcon from '@material-ui/icons/Alarm';
import SmartForm from '@smart-form';
import axios from 'axios';
import api from '@api';
import History from '@components/History';
import TabPanel from '@components/TabPanel'

const useStyles = makeStyles(theme => ({
	layoutHeader: {
		height: 320,
		minHeight: 320,
		[theme.breakpoints.down('md')]: {
			height: 240,
			minHeight: 240
		}
	},	
	firstIcon: {
		paddingLeft: 70
	  }
}));

function ProfilePage() {
	const classes = useStyles();
	let template = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed', type: 'grid' },
		title: 'Job Application Form',
		description: 'Form for applying Job',
		sections: [
			{
				layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
				title: 'Personal Information',
				id: 'personal_information',
				fields: [
					{
						type: 'text',
						name: 'firstname',
						id: 'firstname',
						title: 'First Name',
						disabled: false,
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'text',
						name: 'lastname',
						id: 'lastname',
						title: 'Last Name',
						defaultValue: "Manish",
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'number',
						name: 'testnumber',
						id: 'testnumber',
						title: 'Test Number',
						validationProps: {
							required: 'This is a mandatory field',
						}
					},
					{
						type: 'email',
						name: 'email',
						id: 'email',
						title: 'Email Address',
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'tel',
						name: 'phone_number',
						id: 'phone',
						title: 'Phone Number',
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'text',
						name: 'location',
						id: 'location',
						title: 'Location',
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'select',
						name: 'country',
						id: 'country',
						title: 'Country',
						options: [
							{ title: 'India', value: 'ind' },
							{ title: 'South Africa', value: 'sa' }
						]
					},
					{
						type: 'radio',
						name: 'gender',
						id: 'gender',
						title: 'Gender',
						options: [
							{ title: 'Male', value: 'male' },
							{ title: 'Female', value: 'female' }
						]
					},
					{
						type: 'attachment',
						name: 'document',
						id: 'document',
						title: 'document'
					}
				]
			}
		]
	};

	
	const onUploadSubmit = async (fd) =>{
		console.log(`fd`, fd.data.file[0])
		const file = fd.data.file[0]
		const formData = new FormData();
		formData.append('file',file);
		formData.append('folderName',fd.data.folderName);
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}

		const response = await axios.post(api.document.saveByReact, formData, config);
		const data = await response.data;

		console.log(data);

	}

	

	const sampleTabs = [
		{name: 'New Claim', icon: (<AddCircleOutlineIcon />), children: (<div>New Claim</div>)},
		{name: 'Approved Claims', icon: (<CheckCircleOutlineIcon />), children: (<div>Approved Claims</div>)},
		{name: 'Pending for Approval', icon: (<AlarmIcon />), children: (<div> Claims Pending for Approvals</div>)}
	]
	return (
		<FusePageSimple
			classes={{
				header: classes.layoutHeader,
				toolbar: 'px-16 sm:px-24'
			}}
			content={
				<div className="p-16 sm:p-24">
					<TabPanel
						tabs={sampleTabs}
					/>
					<History />
					<SmartForm
						template={template}
						watchFields={['firstname', 'include_portfolio', 'email', 'country', 'testnumber']}
						validate={validate}
						onSubmit={onSubmit}
						onChange={values => console.log('outvalues', values)}
						buttons={['save', 'submit', 'approve', 'reject', 'cancel', 'reset']}
					/>
				</div>
			}
		/>
	);
}


function onSubmit(values) {
	console.log(values);
}

function validate(watchValues, errorMethods) {
	let {errors, setError, clearErrors, setValid} = errorMethods;
	console.log('watchValueswatchValueswatchValues :>> ', watchValues, errors['testnumber']);
	// Firstname validation
	if (watchValues && watchValues[0] === 'Admin') {
		console.log(`watchValueshhhhhhhhhh>>>>>>>>>`, watchValues, errors['testnumber'])
		if (!errors['firstname']) {
			setError('firstname', {
				type: 'manual',
				message: 'You cannot use this first name'
			})
			setValid(false)
		}
	} else {
		if (errors && errors['firstname'] && errors['firstname']['type'] === 'manual') {
			clearErrors('firstname');
			setValid(true)
		}
	}

	// if (watchValues && watchValues[4] == 0) {
	// 	console.log(`watchValues444444444`, watchValues)
	// 	if (!errors['testnumber']) {
	// 		setError('testnumber', {
	// 			type: 'manual',
	// 			message: 'You cannot 0.'
	// 		})
	// 	}
	// } else {
	// 	if (errors && errors['testnumber'] && errors['testnumber']['type'] === 'manual') {
	// 		clearErrors('testnumber');
	// 	}
	// }
}


export default ProfilePage;
