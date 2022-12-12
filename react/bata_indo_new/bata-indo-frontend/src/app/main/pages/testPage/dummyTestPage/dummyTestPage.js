import React, { Component, useState, useEffect } from 'react'

import axios from 'axios'
// import { Breadcrumb } from 'app/components'
import { Card } from '@material-ui/core'
import SmartForm from '@smart-form'
import api from '@api/index'
import masterApi from '@common/utils/masterApi'
import _ from '@lodash'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

function TestForm() {
	const [formdata, setFormdata] = useState([]);
	const dispatch = useDispatch()
	const [empCategories, setEmpCategories] = useState([]);
	// const jpId = 'new';
	const routeParams = useParams();
	const { jpId } = routeParams;
	// const jpId = 68;
console.log('jpid console',jpId,routeParams )
	const today = new Date();
	async function onSubmit(val) {
		console.log('dee val', val)
		let postData = { ...val.data, jbdApplyEmpCats: val.data.jbdApplyEmpCats.toString() }
		const response = await axios.post(api.jobs.ijpSave, postData);
		console.log('api res', response)
	}

async function getbyId(){

	const response = await axios.get(api.jobs.ijpGetById + '/' + jpId);
	console.log('edit', response)
	if (response && response.data && response.data.data) {
		setFormdata([...formdata, response.data.data]);
		// setFormdata(response.data.data)
		console.log('FORN EDIT DETA', response.data.data)

}
}


	function onCancel() {
		console.log('cancel')

	}

	async function optionData() {
		let EmpCatData = await masterApi.getAllActiveEmployeeCategorys();
		console.log('empcatata', EmpCatData)
		const empCatdata = [];
		_.isArray(EmpCatData)
			&& EmpCatData.map((d) => (empCatdata.push({ value: d.ecCode, title: d.ecName })));
		setEmpCategories(empCatdata);

		
		}




	useEffect(() => {
		optionData();
		getbyId();
	}, [dispatch])


	useEffect(() => {

		console.log('form datataaa', formdata)
	}, [formdata])

	let templateForm = {
		layout: { column: 1, spacing: 2, size: 'medium', label: 'top', type: 'grid' },
		title: 'Upload Form',
		description: 'Form for applying Job',
		sections: [
			{
				layout: { column: 2, spacing: 2, size: 'small', label: 'top' },
				id: 'personal_information',
				fields: [
					{
						type: 'text',
						name: 'jbdTitle',
						id: 'jbdTitle',
						title: 'Job Title',
						disabled: false,
						pattern: {
							value: /^(?=.*[a-zA-Z]).{1,49}$/,
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
						title: 'Job Description',
						disabled: false,
						pattern: {
							value: /^(?=.*[a-zA-Z]).{1,49}$/,
							message: 'Please enter alpha-numeric and below 50 characters'
						},
						validationProps: {
							required: 'This is a mandatory field'
						}
					},

					{
						type: 'text',
						name: 'jbdYOExp',
						id: 'jbdYOExp',
						title: 'year Of Exp.',
						disabled: false,
						// pattern: {
						//   value: /^(?=.*[a-zA-Z]).{1,49}$/,
						//   message: 'Please enter alpha-numeric and below 50 characters'
						// },
						validationProps: {
							required: 'This is a mandatory field'
						}
					},



					{
						type: 'autocomplete',
						name: 'jbdDesigName',
						id: 'jbdDesigName',
						title: 'Designation',
						options: empCategories,
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'autocomplete',
						name: 'jbdDeptName',
						id: 'jbdDeptName',
						title: 'Department',
						options: [{ 'title': 'software', 'value': 'software1' }, { 'title': 'cloud1', 'value': 'cloud1' }, { 'title': 'gst1', 'value': 'gst1' }],
						validationProps: {
							required: 'This is a mandatory field'
						}
					},

					{
						type: 'autocomplete',
						name: 'jbdLocName',
						id: 'jbdLocName',
						title: 'Location',
						options: [{ 'title': 'software', 'value': 'software1' }, { 'title': 'cloud1', 'value': 'cloud1' }, { 'title': 'gst1', 'value': 'gst1' }],
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'date',
						name: 'jbdPubFrmDate',
						id: 'jbdPubFrmDate',
						title: 'Publis from date',
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

						}
					},
					{
						type: 'date',
						name: 'jbdPubToDate',
						id: 'jbdPubToDate',
						title: 'Publish end date',
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
						title: 'Number Of Vacancy',
						// pattern: {
						//   value: regex.vacancyReg,
						//   message: 'Please enter valid no of vacancy'
						// },
						validationProps: {
							required: 'This is a mandatory field',
						}
					},


					{
						type: 'multiSelect',
						name: 'jbdApplyEmpCats',
						id: 'jbdApplyEmpCats',
						title: 'Employee Category',
						options: [{ 'title': 'software', 'value': 'software1' }, { 'title': 'cloud1', 'value': 'cloud1' }, { 'title': 'gst1', 'value': 'gst1' }],
						validationProps: {
							required: 'This is a mandatory field'
						}

					}





				]
			}
		]
	}


	return (
		<>
			<div className="m-sm-30">
				{/* <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Test Form', path: '/TestForm' },
                        { name: 'Test Form' },
                    ]}
                />
            </div> */}
				<Card className="px-6 pt-2 pb-4">
					{
						(jpId != "new" && formdata.length > 0) &&
						<SmartForm
							defaultValues={formdata[0]}
							template={templateForm}
							// watchFields={['firstname', 'include_portfolio', 'email', 'country']}
							// validate={validate}
							onSubmit={onSubmit}
							onCancel={onCancel}
							buttons={['submit', 'save', 'cancel']}
						/>}
					{
						(jpId == "new") &&
						<SmartForm

							template={templateForm}
							// watchFields={['firstname', 'include_portfolio', 'email', 'country']}
							// validate={validate}
							onSubmit={onSubmit}
							onCancel={onCancel}
							buttons={['submit', 'save', 'cancel']}
						/>
					}

				</Card>
			</div>
		</>
	)

}


export default TestForm