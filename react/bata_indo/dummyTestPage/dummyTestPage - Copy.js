// import FuseAnimate from '@core/core/Animate';
import FusePageSimple from '@core/core/PageSimple';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import SmartForm from '@smart-form';
// import axios from 'axios';
// import api from '@api';
// import History from '@components/History';
// import TabPanel from '@components/TabPanel'
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

function TestPageComp() {
	const classes = useStyles();
	const [state, setstate] = useState({})
	let template = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed', type: 'grid' },
		title: 'Advace Imprest Test',
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

	}



	return (
		<FusePageSimple
			classes={{
				header: classes.layoutHeader,
				toolbar: 'px-16 sm:px-24'
			}}
			content={
				<>
					<div className="p-16 sm:p-24">


						<SmartForm
							defaultValues={usdata}
							template={template}
							watchFields={['firstname', 'include_portfolio', 'email', 'country']}
							validate={validate}
							onSubmit={onSubmit}
							onChange={values => console.log('outvalues', values)}
							buttons={['save', 'submit', 'approve', 'reject', 'cancel', 'reset']}
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


export default TestPageComp;
