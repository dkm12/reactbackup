import reducer from '../../store';
import _ from '@lodash';
import masterApi from '@common/utils/masterApi';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import SmartForm from '@smart-form';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'app/store/core/messageSlice';
import FuseLoading from '@core/core/Loading';
import { referralApi } from '../../store/referralApi';
import history from '@history';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import dateFunc from '@common/utils/dateFunc';
import Moment from 'moment';
import { regex } from 'app/auth';
import { Label, GetLabel } from '@common/utils/label';

const useStyles = makeStyles((theme) => ({
	smartForm2: {
		marginTop: '-50px',
	},
}));

function JoineeFormContent(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [empCatdata, setEmpCategories] = useState([]);
	const [empTypedata, setEmpTypes] = useState([]);
	const [divdata, setDiv] = useState([]);
	const [zonedata, setZone] = useState([]);
	const [verticaldata, setVertical] = useState([]);
	const [desigdata, setDesig] = useState([]);
	const [deptdata, setDept] = useState([]);
	const [subdeptdata, setSubdept] = useState([]);
	const [citydata, setCity] = useState([]);
	const [statedata, setState] = useState([]);
	const [rmdata, setRm] = useState([]);
	const [hoddata, setHod] = useState([]);
	const [salutationdata, setSalutation] = useState([]);
	const [genderdata, setGender] = useState([]);
	const [maritalstatusdata, setMaritalStatus] = useState([]);
	const [joined, setJoined] = useState(false);
	const [notjoined, setnotJoined] = useState(false);
	const today = new Date();

	useEffect(() => {
		async function getMaster() {
			let EmpTypeData = await masterApi.getAllActiveEmployeeTypes();
			const temp = [];
			_.isArray(EmpTypeData)
				&& EmpTypeData.map((d) => (temp.push({ value: d.etCode, title: d.etName })));
			setEmpTypes(temp);

			let EmpCatData = await masterApi.getAllActiveEmployeeCategorys();
			const temp2 = [];
			_.isArray(EmpCatData)
				&& EmpCatData.map((d) => (temp2.push({ value: d.ecCode, title: d.ecName })));
			setEmpCategories(temp2);

			let divData = await masterApi.getAllActivedivisions();
			const temp3 = [];
			_.isArray(divData)
				&& divData.map((d) => (temp3.push({ value: d.divCode, title: d.divName })));
			setDiv(temp3);

			let zoneData = await masterApi.getAllActivezones();
			const temp4 = [];
			_.isArray(zoneData)
				&& zoneData.map((d) => (temp4.push({ value: d.zoneCode, title: d.zoneName })));
			setZone(temp4);

			let verticalData = await masterApi.getAllActiveverticals();
			const temp5 = [];
			_.isArray(verticalData)
				&& verticalData.map((d) => (temp5.push({ value: d.vtCode, title: d.vtName })));
			setVertical(temp5);

			let dsgList = await masterApi.getAllActivedesignation();
			const temp6 = [];
			_.isArray(dsgList)
				&& dsgList.map((d) => (temp6.push({ value: d.dsgCode, title: d.dsgName })));
			setDesig(temp6);

			let dptList = await masterApi.getAllActivedepartments();
			const temp7 = [];
			_.isArray(dptList)
				&& dptList.map((d) => (temp7.push({ value: d.dptCode, title: d.dptName })));
			setDept(temp7);

			// let subDeptData = await masterApi.getAllActiveSubDepartments();
			// const temp8 = [];
			// _.isArray(subDeptData)
			// 	&& subDeptData.map((d) => (temp8.push({ value: d.sbdCode, title: d.sbdName })));
			// setSubdept(temp8);

			let cityData = await masterApi.getAllActiveCities();
			const temp9 = [];
			_.isArray(cityData)
				&& cityData.map((d) => (temp9.push({ value: d.cityCode, title: d.cityName })));
			setCity(temp9);

			let statesData = await masterApi.getAllActiveStates();
			const temp10 = [];
			_.isArray(statesData)
				&& statesData.map((d) => (temp10.push({ value: d.stateCode, title: d.stateName })));
			setState(temp10);

			let rmData = await masterApi.getAllUsersData();
			const temp11 = [];
			_.isArray(rmData)
				&& rmData.map((d) => (temp11.push({ value: d.employId, title: d.employId+' - '+d.fullname })));
			setRm(temp11);
			const temp12 = [];
			_.isArray(rmData)
				&& rmData.map((d) => (temp12.push({ value: d.employId, title: d.employId+' - '+d.fullname })));
			setHod(temp12);

			// let hodData = await masterApi.getAllActiveHods();
			let salutation = await masterApi.getAllActiveSalutations();
			const temp13 = [];
			_.isArray(salutation)
				&& salutation.map((d) => (temp13.push({ value: d.saluCode, title: d.saluName })));
			setSalutation(temp13);

			let genderData = await masterApi.getAllActiveGenders();
			const temp14 = [];
			_.isArray(genderData)
				&& genderData.map((d) => (temp14.push({ value: d.genderCode, title: d.genderName })));
			setGender(temp14);

			let maritalData = await masterApi.getAllActivemaritalStatus();
			const temp15 = [];
			_.isArray(maritalData)
				&& maritalData.map((d) => (temp15.push({ value: d.msCode, title: d.msName })));
			setMaritalStatus(temp15);
		}
		getMaster();
	}, [dispatch]);

	let templateFirst = {
		layout: { column: 1, spacing: 2, size: 'medium', label: 'fixed', type: 'grid' },
		sections: [
			{
				layout: { column: 4, spacing: 2, size: 'medium', label: 'fixed' },
				id: 'joinee_status',
				fields: [
					{
						type: 'select',
						name: 'jrtStatus',
						id: 'jrtStatus',
						title: GetLabel('BL00291'),
						options: [{ title: GetLabel('BL00097'), value: 'Joined' }, { title: GetLabel('BL00098'), value: 'Not Joined' }],
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: (notjoined) ? 'textarea' : 'hidden',
						name: 'jrtIndHrRemark',
						id: 'jrtIndHrRemark',
						title: GetLabel('BL00140'),
						validationProps: {
							required: 'This is a mandatory field',
							maxLength: {
								value: 200,
								message: 'Maximum 200 characters are allowed.'
							}
						}
					},
				]
			}
		]
	}

	let template = {
		layout: { column: 1, spacing: 2, size: 'medium', label: 'fixed', type: 'grid' },
		sections: [
			{
				layout: { column: 4, spacing: 2, size: 'medium', label: 'fixed' },
				title: GetLabel('BL00263'),
				id: 'official_information',
				fields: [
					{
						type: 'autocomplete',
						name: 'typeOfEmployee',
						id: 'typeOfEmployee',
						title: GetLabel('BL00264'),
						options: empTypedata,
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'autocomplete',
						name: 'empCategory',
						id: 'empCategory',
						options: empCatdata,
						title: GetLabel('BL00265'),
						validationProps: {
							required: 'This is a mandatory field'
						},
					},
					{
						type: 'autocomplete',
						name: 'divCode',
						id: 'divCode',
						options: divdata,
						title: GetLabel('BL00266'),
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'autocomplete',
						name: 'zoneCode',
						id: 'zoneCode',
						title: GetLabel('BL00267'),
						options: zonedata,
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'autocomplete',
						name: 'verticalCode',
						id: 'verticalCode',
						title: GetLabel('BL00268'),
						options: verticaldata,
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'autocomplete',
						name: 'dsgCode',
						id: 'dsgCode',
						title: GetLabel('BL00072'),
						options: desigdata,
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'autocomplete',
						name: 'dptCode',
						id: 'dptCode',
						title: GetLabel('BL00073'),
						options: deptdata,
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'text',
						name: 'subDptCode',
						id: 'subDptCode',
						title: GetLabel('BL00269'),
						// options: subdeptdata,
						pattern: {
							value: regex.maxSize50,
							message: 'Please enter alpha-numeric and below 50 characters'
						},
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'autocomplete',
						name: 'city',
						id: 'city',
						title: GetLabel('BL00270'),
						options: citydata,
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'autocomplete',
						name: 'state',
						id: 'state',
						title: GetLabel('BL00271'),
						options: statedata,
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'date',
						name: 'doj',
						id: 'doj',
						max: 'today',
						title: GetLabel('BL00272'),
						validationProps: {
							required: "This is a mandatory field",
							manual: [
								{
									condition: `doj <= today`,
									message: "Joining date should be less than or equal to today's date."
								}
							]
						}
					},
					{
						type: 'autocomplete',
						name: 'rmCode',
						id: 'rmCode',
						title: GetLabel('BL00273'),
						options: rmdata,
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'autocomplete',
						name: 'hodCode',
						id: 'hodCode',
						title: GetLabel('BL00274'),
						options: hoddata,
						validationProps: {
							required: 'This is a mandatory field'
						}
					},

				]
			},
			{
				layout: { column: 4, spacing: 2, size: 'medium', label: 'fixed' },
				title: GetLabel('BL00275'),
				id: 'personal_information',
				fields: [
					{
						type: 'autocomplete',
						name: 'salutation',
						id: 'salutation',
						options: salutationdata,
						title: GetLabel('BL00276'),
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'text',
						name: 'firstName',
						id: 'firstName',
						title: GetLabel('BL00277'),
						validationProps: {
							required: 'This is a mandatory field',
							maxLength: {
								value: 50,
								message: 'Maximum 50 characters are allowed.'
							}
						},
					},
					{
						type: 'text',
						name: 'middleName',
						id: 'middleName',
						title: GetLabel('BL00278'),
					},
					{
						type: 'text',
						name: 'lastName',
						id: 'lastName',
						title: GetLabel('BL00279'),
						validationProps: {
							required: 'This is a mandatory field',
							maxLength: {
								value: 50,
								message: 'Maximum 50 characters are allowed.'
							}
						}
					},
					{
						type: 'date',
						name: 'dob',
						id: 'dob',
						max: 'today',
						title: GetLabel('BL00280'),
						validationProps: {
							required: 'This is a mandatory field',
							manual: [
								{
									condition: `dob <= today`,
									message: "Date of birth should be less than or equal to today's date."
								}
							]
						}
					},
					{
						type: 'autocomplete',
						name: 'gender',
						id: 'gender',
						title: GetLabel('BL00281'),
						options: genderdata,
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'autocomplete',
						name: 'maritalStatus',
						id: 'maritalStatus',
						options: maritalstatusdata,
						title: GetLabel('BL00282'),
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'text',
						name: 'contactNumber',
						id: 'contactNumber',
						title: GetLabel('BL00283'),
						pattern: {
							value: regex.phoneReg,
							message: 'Please enter valid contact number'
						},
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'text',
						name: 'emgContactNumber',
						id: 'emgContactNumber',
						title: GetLabel('BL00284'),
						pattern: {
							value: regex.phoneReg,
							message: 'Please enter valid contact number'
						},
					},
					{
						type: 'text',
						name: 'presentAddress',
						id: 'presentAddress',
						title: GetLabel('BL00285'),
						validationProps: {
							required: 'This is a mandatory field',
							maxLength: {
								value: 200,
								message: 'Maximum 200 characters are allowed.'
							}
						}
					},
					{
						type: 'text',
						name: 'permanentAddress',
						id: 'permanentAddress',
						title: GetLabel('BL00286'),
						validationProps: {
							required: 'This is a mandatory field',
							maxLength: {
								value: 200,
								message: 'Maximum 200 characters are allowed.'
							}
						}
					},

				]
			}
		]
	};

	function onInputfirstForm(objList) {
		if (objList.jrtStatus == 'Joined') {
			setJoined(true);
			setnotJoined(false);
		}
		if (objList.jrtStatus == 'Not Joined') {
			setnotJoined(true)
			setJoined(false);
		}
		if (objList.jrtStatus == '') {
			setnotJoined(false);
			setJoined(false);
		}
	}
	async function onSubmitNotJoined(val) {
		if (val.data.jrtStatus == 'Not Joined') {
			let res = await referralApi.updateHiringRemarks(props.id, val.data);
			if (res.status == '200') {
				dispatch(showMessage({ message: res.message, variant: 'success' }));
				// history.goBack();
				props.history.push(`/app/jobs/refer-emp/refapplicants`);
			}
			else dispatch(showMessage({ message: res.message, variant: 'error' }));
		}
	}
	function blurFun(){
		console.log("OKKKKKKK")
	}
	async function onSubmit(values) {
		let postData = values.data;
		postData.rmCode = values.data.rmCode
		postData.hodCode = values.data.hodCode
		postData.doj = Moment(values.data.doj).format("DD-MMM-YYYY");
		postData.dob = Moment(values.data.dob).format("DD-MMM-YYYY");
		console.log(postData);
		let res = await referralApi.saveNewJoineeData(props.id, postData);
		if (res.status == '200') {
			dispatch(showMessage({ message: res.message, variant: 'success' }));
			// history.goBack();
			props.history.push(`/app/jobs/refer-emp/refapplicants`);
		}
		else dispatch(showMessage({ message: res.message, variant: 'error' }));
	}

	async function onCancel() {
		props.history.push('/app/jobs/refer-emp/refapplicants');
		// history.goBack();
	}


	return (
		<>
			{/* (loading || (formObj.length == 0)) ?
			<FuseLoading />
		 	: */}
			<div className="p-16 sm:p-24">
				<SmartForm
					template={templateFirst}
					watchFields={['jrtStatus']}
					onSubmit={onSubmitNotJoined}
					onCancel={onCancel}
					onChange={onInputfirstForm}
					buttons={(notjoined) ? ['submit', 'cancel'] : null}
				/>
			</div>
			{(joined) ? <div className={classes.smartForm2}>
				<SmartForm
					className={classes.smartForm2}
					template={template}
					watchFields={['attachmentFile', 'jbdNumVacancy']}
					onSubmit={onSubmit}
					onCancel={onCancel}
					onBlur ={blurFun}
					buttons={['submit', 'cancel']}
				/>
			</div> : null}
		</>
	);
}

export default withRouter(withReducer('applicants', reducer)(JoineeFormContent));
