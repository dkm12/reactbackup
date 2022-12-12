import reducer from '../../store';
import _ from '@lodash';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import uploadDoc from '@common/utils/uploadDoc';
import masterApi from '@common/utils/masterApi';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import SmartForm from '@smart-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { showMessage } from 'app/store/core/messageSlice';
import { saveJob } from '../../store/refEmpNewPostingsSlice'
import FuseLoading from '@core/core/Loading';
import { referralApi } from '../../store/referralApi';
import history from '@history';
import moment from 'moment';
import { regex } from 'app/auth';
import { Label, GetLabel } from '@common/utils/label';

function CreateContent(props) {
	const dispatch = useDispatch();
	const [locationList, setLocationList] = useState([]);
	const [deptList, setDeptList] = useState([]);
	const [desigList, setDesigList] = useState([]);
	const [formObj, setFormData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [fileUrl, setFileUrl] = useState('');
	const today = new Date();

	useEffect(() => {
		async function getMaster() {
			let locList = await masterApi.getAllActiveCities();
			for await (let item of locList) {
				setLocationList(locationList => [...locationList, { title: item.cityName, value: item.cityName }]);
			}
			let dptList = await masterApi.getAllActivedepartments();
			for await (let item of dptList) {
				setDeptList(deptList => [...deptList, { title: item.dptName, value: item.dptName }]);
			}
			let dsgList = await masterApi.getAllActivedesignation();
			for await (let item of dsgList) {
				setDesigList(desigList => [...desigList, { title: item.dsgName, value: item.dsgName }]);
			}

console.log("deepak Mishra testing file Upload")


		}
		async function getFormData() {
			await getMaster();
			if (formObj.length == 0) {
				if (props.id != 'new') {
					let getdata = await referralApi.getJobById(props.id);
					console.log(getdata)
					console.log(getdata)
					let setData = {
						'jbdTitle': getdata.jbdTitle,
						'jbdDesc': getdata.jbdDesc,
						'jbdYOExp': getdata.jbdYOExp,
						'jbdDesigName': getdata.jbdDesigName,
						'jbdDeptName': getdata.jbdDeptName,
						'jbdLocName': getdata.jbdLocName,
						'jbdPubFrmDate': getdata.jbdPubFrmDate,
						'jbdPubToDate': getdata.jbdPubToDate,
						'jbdNumVacancy': getdata.jbdNumVacancy,
						'attach': getdata.jbdAttachId
					}
					setFormData([...formObj, setData]);
				}
				else {
					setFormData([...formObj, { 'formtype': 'new' }]);
				}
			}
		}
		getFormData();
	}, [dispatch]);

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
							message: 'Please enter alpha-numeric'
						},
						validationProps: {
							required: 'This is a mandatory field',
						},
					},
					{
						type: 'text',
						name: 'jbdYOExp',
						id: 'jbdYOExp',
						title: GetLabel('BL00071'),
						pattern: {
							value: regex.numOfYearReg,
							message: 'Please enter valid no of years'
						},
						validationProps: {
							required: 'This is a mandatory field',
						},
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
						min: (props.id == 'new') && today,
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
									condition: (props.id == 'new') ? `jbdPubFrmDate >= today` : `jbdPubFrmDate != jbdPubFrmDate`,
									message: (props.id == 'new') ? "From Date should be more than or equal to today's date." : "This is a mandatory field"
								}
							]
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
									condition: (props.id == 'new') ? `jbdPubToDate >= today` : `jbdPubToDate != jbdPubToDate`,
									message: (props.id == 'new') ? "Till date should be more than or equal to today's date." : "This is a mandatory field"
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
							message: 'Please enter below 1,000,000'
						},
						validationProps: {
							required: 'This is a mandatory field',
						}
					},
					{
						type: 'file',
						name: 'attachmentFile',
						id: 'attachmentFile',
						accept: '.pdf,.doc,.docx',
						title: 'Attachment',
					},

				]
			}

		]
	};

	async function uploadFile(objList) {
		console.log(objList);
		if (objList.data.attachmentFile.length) {
			let resp = await uploadDoc.saveDoc(objList.data.attachmentFile[0], "referralApplicant");
			return resp[0].fileUrl;
		}
		else {
			return '';
		}
	}

	function onInput(objList) {
		// console.log(locationList)
		// console.log(deptList)
		// console.log("objList", objList);
	}

	async function onSubmit(values) {
		console.log(values.data)
		// return;
		let url = await uploadFile(values)
		if (url) setFileUrl(url);
		else {
			if (props.id != 'new') setFileUrl(formObj[0].attach)
		}
		console.log(url)
		let postData = {
			'jbdTitle': values.data.jbdTitle,
			'jbdDesc': values.data.jbdDesc,
			'jbdYOExp': values.data.jbdYOExp,
			'jbdDesigName': values.data.jbdDesigName,
			'jbdDeptName': values.data.jbdDeptName,
			'jbdLocName': values.data.jbdLocName,
			'jbdPubFrmDate': values.data.jbdPubFrmDate,
			'jbdPubToDate': values.data.jbdPubToDate,
			'jbdNumVacancy': values.data.jbdNumVacancy,
			'jbdAttachId': fileUrl
		}
		console.log(postData)
		if (props.id == 'new') {
			let res = await dispatch(saveJob(postData));
			console.log(res);
		}
		else {
			let res = await referralApi.updateJobById(props.id, postData);
			console.log(res);
			if (res.status == '200') {
				dispatch(showMessage({ message: res.message, variant: 'success' }));
				history.goBack();
			}
			else dispatch(showMessage({ message: res.message, variant: 'error' }));
		}
	}

	function onCancel() {
		history.goBack();
	}

	return (
		(loading || (formObj.length == 0)) ?
			<FuseLoading />
			:
			<div className="p-16 sm:p-24">
				<SmartForm
					defaultValues={formObj[0]}
					template={template}
					watchFields={['attachmentFile', 'jbdNumVacancy']}
					// validate={validate}
					onSubmit={onSubmit}
					onCancel={onCancel}
					onChange={onInput}
					buttons={['submit', 'cancel']}
				/>
			</div>
	);
}

export default withReducer('applicants', reducer)(CreateContent);
