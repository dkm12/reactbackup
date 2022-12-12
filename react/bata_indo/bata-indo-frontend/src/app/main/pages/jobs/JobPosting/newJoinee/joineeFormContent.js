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

	useEffect(() => {
		async function getMaster() {
			let EmpCatData = await masterApi.getAllActiveEmployeeCategorys();
			// let hodData = await masterApi.getAllActiveHods();
			const temp2 = []; //
			_.isArray(EmpCatData)
				&& EmpCatData.map((d) => (temp2.push({ value: d.ecCode, title: d.ecName })));
			setEmpCategories(temp2);

			let divData = await masterApi.getAllActivedivisions();
			const temp3 = []; //
			_.isArray(divData)
				&& divData.map((d) => (temp3.push({ value: d.divCode, title: d.divName })));
			setDiv(temp3);

			let zoneData = await masterApi.getAllActivezones();
			const temp4 = []; //zoneCode
			_.isArray(zoneData)
				&& zoneData.map((d) => (temp4.push({ value: d.zoneCode, title: d.zoneName })));
			setZone(temp4);

			let verticalData = await masterApi.getAllActiveverticals();
			const temp5 = []; //vtCode
			_.isArray(verticalData)
				&& verticalData.map((d) => (temp5.push({ value: d.vtCode, title: d.vtName })));
			setVertical(temp5);

			let dsgList = await masterApi.getAllActivedesignation();
			const temp6 = []; //dsgCode
			_.isArray(dsgList)
				&& dsgList.map((d) => (temp6.push({ value: d.dsgCode, title: d.dsgName })));
			setDesig(temp6);

			let dptList = await masterApi.getAllActivedepartments();
			const temp7 = []; //dptCode
			_.isArray(dptList)
				&& dptList.map((d) => (temp7.push({ value: d.dptCode, title: d.dptName })));
			setDept(temp7);

			let subDeptData = await masterApi.getAllActiveSubDepartments();
			const temp8 = []; //sbdCode
			_.isArray(subDeptData)
				&& subDeptData.map((d) => (temp8.push({ value: d.sbdCode, title: d.sbdName })));
			setSubdept(temp8);

			let cityData = await masterApi.getAllActiveCities();
			const temp9 = []; //cityCode
			_.isArray(cityData)
				&& cityData.map((d) => (temp9.push({ value: d.cityCode, title: d.cityName })));
			setCity(temp9);

			let statesData = await masterApi.getAllActiveStates();
			const temp10 = []; //stateCode
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
		}
		getMaster();
	}, [dispatch]);

	let template = {
		layout: { column: 1, spacing: 2, size: 'medium', label: 'fixed', type: 'grid' },
		sections: [
			{
				layout: { column: 4, spacing: 2, size: 'medium', label: 'fixed' },
				title: 'Official Information',
				id: 'official_information',
				fields: [
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
						title: GetLabel('BL00166'),
						options: desigdata,
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'autocomplete',
						name: 'dptCode',
						id: 'dptCode',
						title: GetLabel('BL00167'),
						options: deptdata,
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'autocomplete',
						name: 'subDepCode',
						id: 'subDepCode',
						title: GetLabel('BL00269'),
						options: subdeptdata,
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
		]
	};

	async function onSubmit(values) {
		let postData = values.data;
		postData.rmCode = values.data.rmCode
		postData.hodCode = values.data.hodCode
		console.log(postData);
		let res = await referralApi.saveIJPnewJoinee(props.id, postData);
		if (res.status == '200') {
			dispatch(showMessage({ message: res.message, variant: 'success' }));
			props.history.push(`/app/jobs/jobposting/applicants`);
		}
		else dispatch(showMessage({ message: res.message, variant: 'error' }));
	}

	async function onCancel() {
		props.history.push('/app/jobs/jobposting/applicants');
	}


	return (
		<>
			{/* (loading || (formObj.length == 0)) ?
			<FuseLoading />
		 	: */}
			<div>
				<SmartForm
					template={template}
					watchFields={['attachmentFile', 'jbdNumVacancy']}
					onSubmit={onSubmit}
					onCancel={onCancel}
					buttons={['submit', 'cancel']}
				/>
			</div>
		</>
	);
}

export default withRouter(withReducer('applicants', reducer)(JoineeFormContent));
