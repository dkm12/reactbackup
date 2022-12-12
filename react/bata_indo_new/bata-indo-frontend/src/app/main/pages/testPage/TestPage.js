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
import { Label, GetLabel } from '@common/utils/label';

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
	const [state, setstate] = useState({})
	const [success, setSuccess] = useState(null);
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
						type: 'multiSelect',
						name: 'ms',
						id: 'ms',
						title: 'Multi Select',
						options: [
							{ value: 1, title: 'Name 1' },
							{ value: 2, title: 'Name 2' },
							{ value: 3, title: 'Name 3' },
							{ value: 4, title: 'Name 4' },
							{ value: 5, title: 'Name 5' },
							{ value: 6, title: 'Name 6' }
						]
					},
					{
						type: 'multiSelect',
						name: 'ms2',
						id: 'ms2',
						title: 'Multi Select 2',
						options: [
							{ value: 1, title: 'Name 1' },
							{ value: 2, title: 'Name 2' },
							{ value: 3, title: 'Name 3' },
							{ value: 4, title: 'Name 4' },
							{ value: 5, title: 'Name 5' },
							{ value: 6, title: 'Name 6' }
						]
					},
					{
						type: 'text',
						name: 'firstname',
						id: 'firstname',
						title: 'First Name',
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
			},
			{
				title: 'Work Information',
				id: 'work_information',
				fields: [
					{
						type: 'text',
						name: 'current_employer',
						id: 'current_employer',
						title: 'Current Employer'
					},
					{
						type: 'text',
						name: 'current_role',
						id: 'current_role',
						title: 'Current Role'
					},
					{
						type: 'text',
						name: 'role_description',
						id: 'role_description',
						title: 'Role Description'
					},
					{
						type: 'number',
						name: 'experience',
						id: 'experience',
						title: 'Total Years of Experience'
					}
				]
			},
			{
				title: 'Social Media Links',
				id: 'social_media_links',
				fields: [
					{
						type: 'checkbox',
						name: 'include_portfolio',
						id: 'include_portfolio',
						title: 'Include Portfolio Links'
					},
					{
						type: 'checkbox',
						name: 'include_social',
						id: 'include_social',
						title: 'Include Social Media Links'
					},
					{
						type: 'url',
						name: 'portfolio_url',
						id: 'portfolio_url',
						title: 'Portfolio Link',
						dynamic: {
							field: 'include_portfolio',
							value: [true]
						}
					},
					{
						type: 'url',
						name: 'social_url',
						id: 'social_url',
						title: 'Social Media Link',
						dynamic: {
							field: 'include_social',
							value: [true]
						}
					}
				]
			},
			{
				title: 'Uploads',
				id: 'uploads',
				fields: [
						{
							type: 'file',
							accept: 'images/*',
							name: 'select_resume',
							id: 'select_resume',
							title: 'Select Resume'
						},
						{
							type: 'section',
							layout: { column: 1, spacing: 2, size: 'small', label: 'normal' },
							fields: [
							{
								type: 'array',
								name: 'test',
								layout: { column: 6, spacing: 2, size: 'small', label: 'blank', type: 'table' },
								columns: ['Name', 'Address', 'Mobile', 'From Date', 'To Date', 'Address', 'New File'],
								subFields: [
									{
										type: 'text',
										name: 'name',
										id: 'name',
										title: 'Name',
									},
									{
										type: 'text',
										name: 'address',
										id: 'address',
										title: 'Address',
									},
									{
										type: 'number',
										name: 'mobile',
										id: 'mobile',
										title: 'Mobile',
									},
									{
										type: 'date',
										name: 'fromdate',
										id: 'fromdate',
										title: 'From Date',
									},
									{
										type: 'section',
										layout: { column: 1, spacing: 2, size: 'small', label: 'normal' },
										fields: [
											{
												type: 'number',
												name: 'tollAmount',
												id: 'tollAmount',
												title: 'Toll Amount'
											},
											{
												type: 'number',
												name: 'parking',
												id: 'parking',
												title: 'Parking'
											},
											{
												type: 'number',
												name: 'food',
												id: 'food',
												title: 'Food'
											}
										]
									},
									{
										type: 'section',
										layout: { column: 1, spacing: 2, size: 'small', label: 'normal' },
										fields: [
											{
												type: 'file',
												name: 'tollAmountFile',
												id: 'tollAmountFile',
												title: 'Toll Amount'
											},
											{
												type: 'file',
												name: 'parkingFile',
												id: 'parkingFile',
												title: 'Parking'
											},
											{
												type: 'file',
												name: 'foodFile',
												id: 'foodFile',
												title: 'Food'
											}
										]
									},
									{
										type: 'section',
										layout: { column: 1, spacing: 2, size: 'small', label: 'normal' },
										fields: [
											{
												type: 'number',
												name: 'tab1',
												id: 'tab1',
												title: 'AMT 1'
											},
											{
												type: 'number',
												name: 'tab2',
												id: 'tab2',
												title: 'AMT 2'
											},
											{
												type: 'number',
												name: 'total',
												id: 'total',
												title: 'total',
												calculation: {
													type: 'add',
													from: ['this*tab1', 'this*tab2']
												}
											},
										]
									},
								]
							}
						]
					}
				]
			},
			{
				title: 'Array',
				id: 'array',
				layout: { column: 1, spacing: 2, size: 'small', label: 'fixed' },
				fields: [
					{
						type: 'array',
						name: 'test',
						id: 'array',
						title: 'Array',
						layout: { column: 6, spacing: 2, size: 'small', label: 'blank', type: 'table' },
						columns: ['Name', 'Address', 'Mobile', 'From Date', 'To Date', 'Address', 'New File'],
						subFields: [
							{
								type: 'text',
								name: 'name',
								id: 'name',
								title: 'Name',
							},
							{
								type: 'text',
								name: 'address',
								id: 'address',
								title: 'Address',
							},
							{
								type: 'number',
								name: 'mobile',
								id: 'mobile',
								title: 'Mobile',
							},
							{
								type: 'date',
								name: 'fromdate',
								id: 'fromdate',
								title: 'From Date',
							},
							{
								type: 'section',
								layout: { column: 1, spacing: 2, size: 'small', label: 'normal' },
								fields: [
									{
										type: 'number',
										name: 'tollAmount',
										id: 'tollAmount',
										title: 'Toll Amount'
									},
									{
										type: 'number',
										name: 'parking',
										id: 'parking',
										title: 'Parking'
									},
									{
										type: 'number',
										name: 'food',
										id: 'food',
										title: 'Food'
									}
								]
							},
							{
								type: 'section',
								layout: { column: 1, spacing: 2, size: 'small', label: 'normal' },
								fields: [
									{
										type: 'file',
										name: 'tollAmountFile',
										id: 'tollAmountFile',
										title: 'Toll Amount'
									},
									{
										type: 'file',
										name: 'parkingFile',
										id: 'parkingFile',
										title: 'Parking'
									},
									{
										type: 'file',
										name: 'foodFile',
										id: 'foodFile',
										title: 'Food'
									}
								]
							},
							{
								type: 'section',
								layout: { column: 1, spacing: 2, size: 'small', label: 'normal' },
								fields: [
									{
										type: 'number',
										name: 'tab1',
										id: 'tab1',
										title: 'AMT 1'
									},
									{
										type: 'number',
										name: 'tab2',
										id: 'tab2',
										title: 'AMT 2'
									},
									{
										type: 'number',
										name: 'total',
										id: 'total',
										title: 'total',
										calculation: {
											type: 'add',
											from: ['this*tab1', 'this*tab2']
										}
									},
								]
							},
						]
					}
				]
			},
			{
				id: 'remark',
				fields: [
					{
						type: 'section',
						layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
						fields: [
							{
								type: 'date',
								name: 'date',
								id: 'date',
								title: 'Date'
							},
							{
								type: 'text',
								name: 'remarks',
								id: 'remarks',
								title: 'Remarks',
								disabled: false
							},
							{
								type: 'number',
								name: 'total',
								id: 'total',
								title: 'Total'
							},
							{
								type: 'date',
								name: 'date',
								id: 'date',
								title: 'Date'
							},
							{
								type: 'textarea',
								name: 'remarks',
								id: 'textarea',
								title: 'Remarks'
							}
						]
					},
					{
						type: 'number',
						name: 'testtotal',
						id: 'testtotal',
						title: 'Total 1',
						calculation: {
							type: 'add',
							from: ['test*mobile']
						}
					},

				]
			},
			{
				id: 'remark',
				layout: { column: 1, spacing: 2, size: 'medium', label: 'fixed' },
				fields: [
					{
						type: 'table',
						name: 'testtable',
						id: 'testtable',
						title: 'Table',
						columns: {
							ids: ['first_name', 'last_name', 'email', 'gender', 'ip_address'],
							titles: GetLabel(['BL00001', 'BL00002', 'BL00003', 'BL00004', 'BL00005'])
						}
					}
				]
			},
			{
				title: 'Calculation',
				id: 'calculation',
				fields: [
					{
						type: 'number',
						name: 'field1',
						id: 'field1',
						title: GetLabel('BL00001')
					},
					{
						type: 'number',
						name: 'field2',
						id: 'field2',
						title: 'Field 2'
					},
					{
						type: 'number',
						name: 'field3',
						id: 'field3',
						title: 'Field 3'
					},
					{
						type: 'number',
						name: 'total',
						id: 'total',
						title: 'Total',
						calculation: {
							type: 'add',
							from: ['field1', 'field2', 'field3', 'test*mobile']
						}
					},
				]
			},
		]
	};

	const usdata = {
		country: "ind",
		document: 'https://cdn.shopify.com/s/files/1/2081/8163/files/001-HIDE-AND-SEEK-Free-Childrens-Book-By-Monkey-Pen.pdf?v=1589846897',
		current_employer: "Velocis",
		current_role: "TL",
		email: "chandra.kamal1@gmail.com",
		experience: 5,
		fbcolor: "#F80000",
		firstname: "Chandra",
		include_portfolio: true,
		include_social: true,
		lastname: "Kamal",
		location: "Patna",
		phone_number: "9717773445",
		portfolio_url: "https://google.com",
		role_description: "Admin",
		social_url: "https://google.com",
		test: [
			{
				name: "Kamal",
				address: "Patna",
				fromdate: "2021/02/01",
				todate: "2021/03/01",
				mobile: 9717773445,
				distance: 204
			}
		],
		testtable: [
			{ "id": 1, "first_name": "Eilis", "last_name": "Warbeys", "email": "ewarbeys0@ucsd.edu", "gender": "Genderqueer", "ip_address": "179.104.25.43" },
			{ "id": 2, "first_name": "Billy", "last_name": "Wylam", "email": "bwylam1@wunderground.com", "gender": "Genderfluid", "ip_address": "169.2.179.25" },
			{ "id": 3, "first_name": "Jamima", "last_name": "Fraczek", "email": "jfraczek2@dyndns.org", "gender": "Genderqueer", "ip_address": "243.27.54.231" },
			{ "id": 4, "first_name": "Flinn", "last_name": "O'Looney", "email": "folooney3@xrea.com", "gender": "Agender", "ip_address": "142.59.33.239" },
			{ "id": 5, "first_name": "Gran", "last_name": "Clague", "email": "gclague4@apple.com", "gender": "Agender", "ip_address": "209.164.225.157" },
			{ "id": 6, "first_name": "Ludovico", "last_name": "Piesing", "email": "lpiesing5@tuttocitta.it", "gender": "Male", "ip_address": "7.14.75.176" },
			{ "id": 7, "first_name": "Durante", "last_name": "Daft", "email": "ddaft6@netscape.com", "gender": "Genderqueer", "ip_address": "14.92.223.133" },
			{ "id": 8, "first_name": "Aggi", "last_name": "Glandfield", "email": "aglandfield7@istockphoto.com", "gender": "Female", "ip_address": "103.208.128.36" },
			{ "id": 9, "first_name": "Conan", "last_name": "D'Avaux", "email": "cdavaux8@stanford.edu", "gender": "Genderfluid", "ip_address": "90.141.44.134" }
		]
	}

	function checkDate(a, b) {
		let d1 = new Date(a)
		let d2 = new Date(b)
		return d1 < d2;
	}
	let template2 = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed', type: 'grid' },
		title: 'Upload Form',
		description: 'Form for applying Job',
		sections: [
			{
				layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
				id: 'personal_information',
				fields: [
					{
						type: 'text',
						name: 'folderName',
						id: 'folderName',
						title: 'Folder Name',
						pattern: {
							value: /[A-Za-z]{3}/,
							message: "Invalid text"
						},
						validationProps: {
							required: "required"
						}
					},
					{
						type: 'text',
						name: 'perName',
						id: 'perName',
						title: 'Per Name',
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'date',
						name: 'fromDate',
						id: 'fromDate',
						title: 'From Date',
						unregister: ['save'],
						validationProps: {
							required: "required",
							validate: [
								{
									condition: "fromDate < toDate",
									message: "Value should not be greater than To date."
								}
							]
						}
					},
					{
						type: 'date',
						name: 'toDate',
						id: 'toDate',
						title: 'To Date',
						unregister: ['save'],
						validationProps: {
							required: "required",
							validate: [{
								condition: "toDate > fromDate",
								message: "Value should not be greater than From date."
							}]
						}
					},
					{
						type: 'file',
						name: 'file',
						id: 'file',
						title: 'Upload File',
						validationProps: {
							required: 'This is a mandatory field',
							size: {
								value: 2, // in MB
								message: "File size should not be greater than 5M"
							}
						}
					}
				]
			}
		]
	}

	let template3 = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'top', type: 'flex' },
		title: 'Upload Form',
		description: 'Form for applying Job',
		sections: [
			{
				layout: { column: 2, spacing: 2, size: 'small', label: 'top', type: 'flex' },
				id: 'personal_information',
				fields: [
					{
						type: 'text',
						name: 'folderName',
						id: 'folderName',
						title: 'Folder Name',
						pattern: {
							value: /[A-Za-z]{3}/,
							message: "Invalid text"
						},
						validationProps: {
							required: "required"
						},
						style: {
							minWidth: '200px'
						}
					},
					{
						type: 'text',
						name: 'perName',
						id: 'perName',
						title: 'Per Name',
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'date',
						name: 'fromDate',
						id: 'fromDate',
						title: 'From Date',
						unregister: ['save'],
						validationProps: {
							required: "required",
							validate: [
								{
									condition: "fromDate < toDate",
									message: "Value should not be greater than To date."
								}
							]
						}
					},
					{
						type: 'date',
						name: 'toDate',
						id: 'toDate',
						title: 'To Date',
						unregister: ['save'],
						validationProps: {
							required: "required",
							validate: [{
								condition: "toDate > fromDate",
								message: "Value should not be greater than From date."
							}]
						}
					}
				]
			}
		]
	}

	const onUploadSubmit = async (fd) => {
		// console.log(`fd`, fd.data.file[0])
		// const file = fd.data.file[0]
		// const formData = new FormData();
		// formData.append('file',file);
		// formData.append('folderName',fd.data.folderName);
		// const config = {
		// 	headers: {
		// 		'content-type': 'multipart/form-data'
		// 	}
		// }

		// const response = await axios.post(api.document.saveByReact, formData, config);
		// const data = await response.data;

		console.log("data", fd);

		setTimeout(() => {
			console.log(`success false`)
			setSuccess(true);
		}, 3000);

	}



	const sampleTabs = [
		{ name: 'New Claim', icon: (<AddCircleOutlineIcon />), children: (<div>New Claim</div>) },
		{ name: 'Approved Claims', icon: (<CheckCircleOutlineIcon />), children: (<div>Approved Claims</div>) },
		{ name: 'Pending for Approval', icon: (<AlarmIcon />), children: (<div> Claims Pending for Approvals</div>) }
	]
	return (
		<FusePageSimple
			classes={{
				header: classes.layoutHeader,
				toolbar: 'px-16 sm:px-24'
			}}
			content={
				<>
					<div className="p-16 sm:p-24">
						<TabPanel
							tabs={sampleTabs}
						/>
						<History />
						<SmartForm
							defaultValues={usdata}
							template={template}
							watchFields={['firstname', 'include_portfolio', 'email', 'country']}
							validate={validate}
							onSubmit={onSubmit}
							onChange={values => console.log('outvalues', values)}
							onBlur={values => console.log('onBlur >>>>', values)}
							mode="onBlur"
							buttons={['save', 'submit', 'approve', 'reject', 'cancel', 'reset']}
						/>
						<SmartForm
							// defaultValues={usdata}
							template={template2}
							// watchFields={['firstname', 'include_portfolio', 'email', 'country']}
							// validate={validate}
							onSubmit={onUploadSubmit}
							onBlur={values => console.log('onBlur >>>>', values)}
							mode="onBlur" //"all:onBlur"
							success={success}
							onChange={setstate}
							buttons={['save', 'submit']}
						/>
						<SmartForm
							// defaultValues={usdata}
							template={template3}
							// watchFields={['firstname', 'include_portfolio', 'email', 'country']}
							// validate={validate}
							onSubmit={onUploadSubmit}
							onBlur={values => console.log('onBlur >>>>', values)}
							mode="onBlur" //"all:onBlur"
							success={success}
							onChange={setstate}
							buttons={['search']}
						/>
					</div>
					<div>
						<Label labelId="BL00168" />
						<Label labelId="BL00160" />
					</div>
				</>
			}
		/>
	);
}


function onSubmit(values) {
	console.log(values);
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


export default ProfilePage;
