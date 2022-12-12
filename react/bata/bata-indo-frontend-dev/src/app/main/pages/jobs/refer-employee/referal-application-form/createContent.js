import reducer from '../../store';
import _ from '@lodash';
import uploadDoc from '@common/utils/uploadDoc';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import SmartForm from '@smart-form';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'app/store/core/messageSlice';
import { saveApplicants } from '../../store/referalApplicantSlice'
import FuseLoading from '@core/core/Loading';
import { referralApi } from '../../store/referralApi';
import dateFunc from '@common/utils/dateFunc';
// import history from '@history';
import { makeStyles } from '@material-ui/core/styles';
import { regex } from 'app/auth';
// import { withRouter } from 'react-router-dom';
import { Label, GetLabel } from '@common/utils/label';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	smartForm2: {
		marginTop: '-70px',
	},
}));

function CreateContent(props) {
	let history = useHistory();
	const role = useSelector(({ auth }) => auth.user.role);
	const classes = useStyles();
	const dispatch = useDispatch();
	const [formObj, setFormData] = useState([]);
	const [statusList, setStatusList] = useState([]);
	const [currStatus, setCurrStatus] = useState('');
	const [loading, setLoading] = useState(false);
	const today = new Date();
	const myUrlData = {jobId: props.jobId, type: props.type}
	
	useEffect(() => {
		async function getMaster() {
			if (formObj.length == 0) {
				if (myUrlData.type != 'new') {
					let getdata = await referralApi.getDataById(myUrlData.type);
					setCurrStatus(getdata.jrtStatus.trim())
					if ((getdata.jrtViewedStatus) == 'UNREAD') {
						let res = await referralApi.updateReadStatus(myUrlData.type);
						console.log(res);
					}
					if ((getdata.jrtStatus).trim() == 'Referred') {
						setStatusList([{ title: 'Shortlisted', value: 'Shortlisted' }, { title: 'Not Shortlisted', value: 'Not Shortlisted' }]);
					}
					if ((getdata.jrtStatus).trim() == 'Shortlisted') {
						setStatusList([{ title: 'Selected', value: 'Selected' }, { title: 'Not Selected', value: 'Not Selected' }]);
					}
					// if ((getdata.jrtStatus).trim() == 'Selected') {
					// 	setStatusList([{ title: 'Joined', value: 'Joined' }, { title: 'Not Joined', value: 'Not Joined' }]);
					// }
					let setData = {
						'jrtJobId': getdata.jrtJobId,
						'jrtFullName': getdata.jrtFullName,
						'jrtMobNo': getdata.jrtMobNo,
						'jrtEmailId': getdata.jrtEmailId,
						'jrtEmailId': getdata.jrtEmailId,
						'jrtYOExp': getdata.jrtYOExp,
						'jrtCurrentOrg': getdata.jrtCurrentOrg,
						'jrtCurrLocName': getdata.jrtCurrLocName,
						'jrtCurrDesgName': getdata.jrtCurrDesgName,
						'jrtCurrDeptName': getdata.jrtCurrDeptName,
						'status': getdata.jrtStatus,
						'jrtReffByEmpCode': getdata.jrtReffByEmpCode,
						'createdOn': getdata.createdOn,
						'jrtDOJ': getdata.jrtDOJ,
						'jrtTalentHrRemark1': getdata.jrtTalentHrRemark1,
						'jrtTalentHrRemark2': getdata.jrtTalentHrRemark2,
						'jrtResumeAttachId': getdata.jrtResumeAttachId,
					}
					setFormData([...formObj, setData]);
				}
				else {
					let setData = {
						'jrtJobId': myUrlData.jobId,
					}
					setFormData([...formObj, setData]);
				}
			}
		}
		getMaster();

	}, [dispatch]);

	let template = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed', type: 'grid' },
		sections: [
			{
				layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
				title: 'Applicant Details',
				id: 'applicant_details',
				fields: [
					{
						type: 'text',
						name: 'jrtFullName',
						id: 'jrtFullName',
						title: GetLabel('BL00079'),
						disabled: myUrlData.type != 'new',
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
						name: 'jrtMobNo',
						id: 'jrtMobNo',
						disabled: myUrlData.type != 'new',
						title: GetLabel('BL00081'),
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
						name: 'jrtEmailId',
						id: 'jrtEmailId',
						title: GetLabel('BL00082'),
						disabled: myUrlData.type != 'new',
						pattern: {
							value: regex.emailReg,
							message: 'Please enter valid email'
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
						name: 'jrtYOExp',
						id: 'jrtYOExp',
						title: GetLabel('BL00071'),
						disabled: myUrlData.type != 'new',
						pattern: {
							value: regex.numOfYearReg,
							message: 'Please enter valid no of years'
						},
						validationProps: {
							required: 'This is a mandatory field',
						}
					},
					{
						type: 'text',
						name: 'jrtCurrentOrg',
						id: 'jrtCurrentOrg',
						title: GetLabel('BL00080'),
						disabled: myUrlData.type != 'new',
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
						name: 'jrtCurrLocName',
						id: 'jrtCurrLocName',
						title: GetLabel('BL00083'),
						disabled: myUrlData.type != 'new',
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
						name: 'jrtCurrDesgName',
						id: 'jrtCurrDesgName',
						title: GetLabel('BL00084'),
						disabled: myUrlData.type != 'new',
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
						name: 'jrtCurrDeptName',
						id: 'jrtCurrDeptName',
						title: GetLabel('BL00085'),
						disabled: myUrlData.type != 'new',
						pattern: {
							value: regex.maxSize50,
							message: 'Please enter alpha-numeric and below 50 characters'
						},
						validationProps: {
							required: 'This is a mandatory field',
						}
					},
					{
						type: (myUrlData.type == 'new') ? 'file' : 'hidden',
						name: 'jrtResumeAttachId2',
						id: 'jrtResumeAttachId2',
						accept: '.pdf,.doc,.docx',
						title: GetLabel('BL00086'),
						disabled: myUrlData.type != 'new',
						validationProps: {
							required: 'This is a mandatory field',
							size: {
								value: 1,
								message: 'File size should not be more than 1mb.'
							},
						}
					},
					{
						type: 'hidden',
						name: 'jrtJobId',
						id: 'jrtJobId',
						title: GetLabel('BL00294'),
					}, {
						type: (myUrlData.type == 'new') ? 'hidden' : 'text',
						name: 'status',
						id: 'status',
						title: GetLabel('BL00089'),
						disabled: true
					},
					{
						type: (myUrlData.type == 'new') ? 'hidden' : 'text',
						name: 'jrtReffByEmpCode',
						id: 'jrtReffByEmpCode',
						title: GetLabel('BL00087'),
						disabled: true
					},
					{
						type: (myUrlData.type == 'new') ? 'hidden' : 'date',
						name: 'createdOn',
						id: 'createdOn',
						title: GetLabel('BL00092'),
						disabled: true
					},
					{
						type: (currStatus == 'Selected' || currStatus == 'Joined') ? 'date' : 'hidden',
						name: 'jrtDOJ',
						id: 'jrtDOJ',
						title: GetLabel('BL00259'),
						disabled: true
					},
					{
						type: (currStatus == 'Referred' || myUrlData.type == 'new') ? 'hidden' : 'text',
						name: 'jrtTalentHrRemark1',
						id: 'jrtTalentHrRemark1',
						title: GetLabel('BL00258'),
						disabled: true
					},
					{
						type: (myUrlData.type == 'new' || currStatus == 'Referred' || currStatus == 'Shortlisted' || currStatus == 'Not Shortlisted') ? 'hidden' : 'text',
						name: 'jrtTalentHrRemark2',
						id: 'jrtTalentHrRemark2',
						title: GetLabel('BL00257'),
						disabled: true
					},
					{
						type: (currStatus == 'Not Joined') ? 'text' : 'hidden',
						name: 'jrtIndHrRemark',
						id: 'jrtIndHrRemark',
						title: GetLabel('BL00091'),
						disabled: true
					},
					{
						type: (myUrlData.type == 'new') ? 'hidden' : 'attachment',
						name: 'jrtResumeAttachId',
						id: 'jrtResumeAttachId',
						title: GetLabel('BL00086')
					}
				]
			}
		]
	};

	let template2 = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed', type: 'grid' },
		sections: [
			{
				layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
				title: 'Update Status',
				id: 'update_status',
				fields: [
					{
						type: 'select',
						name: 'jrtStatus',
						id: 'jrtStatus',
						title: GetLabel('BL00194'),
						options: statusList,
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'textarea',
						name: 'commentMsg',
						id: 'commentMsg',
						title: GetLabel('BL00140'),
						pattern: {
							value: regex.maxSize250,
							message: 'Please enter alpha-numeric and below 250 characters'
						},
						validationProps: {
							required: 'This is a mandatory field',
						}
					},
				]
			}
		]
	}
	if ((role.includes("TALENT-HR") && (currStatus == 'Shortlisted'))) {
		template2.sections[0].fields.push(
			{
				type: 'date',
				name: 'joinDate',
				id: 'joinDate',
				title: 'Join Date',
				min: today,
				validationProps: {
					required: 'This is a mandatory field'
				}
			}
		)
	}
	async function uploadFile(objList) {
		console.log(objList);
		if (objList.data.jrtResumeAttachId2.length) {
			let resp = await uploadDoc.saveDoc(objList.data.jrtResumeAttachId2[0], "referralJob");
			return resp[0].fileUrl;
		}
		else {
			return '';
		}
	}

	async function onSubmit(values) {
		if (myUrlData.type == 'new') {
			let url = await uploadFile(values)
			console.log(url);
			let postData = {
				'jrtJobId': values.data.jrtJobId,
				'jrtResumeAttachId': (url ? url : ''),
				'jrtFullName': values.data.jrtFullName,
				'jrtMobNo': values.data.jrtMobNo,
				'jrtEmailId': values.data.jrtEmailId,
				'jrtEmailId': values.data.jrtEmailId,
				'jrtYOExp': values.data.jrtYOExp,
				'jrtCurrentOrg': values.data.jrtCurrentOrg,
				'jrtCurrLocName': values.data.jrtCurrLocName,
				'jrtCurrDesgName': values.data.jrtCurrDesgName,
				'jrtCurrDeptName': values.data.jrtCurrDeptName
			}
			let res = await dispatch(saveApplicants(postData));
			console.log(res);
		}
	}
	async function onUpdate(values) {
		if (formObj[0].status == 'Referred') {
			let putData = {
				"jrtStatus": values.data.jrtStatus,
				"jrtTalentHrRemark1": values.data.commentMsg
			}
			let res = await referralApi.updateFirstRemarks(myUrlData.type, putData);
			console.log(res);
			if (res.status == '200') {
				dispatch(showMessage({ message: res.message, variant: 'success' }));
				// history.goBack();
				history.push('/app/jobs/refer-emp/refapplicants');
			}
			else dispatch(showMessage({ message: res.message, variant: 'error' }));
		}

		if (formObj[0].status == 'Shortlisted') {
			let putData = {
				"jrtStatus": values.data.jrtStatus,
				"jrtTalentHrRemark2": values.data.commentMsg,
				"jrtDOJ": values.data.joinDate
			}
			let res = await referralApi.updateSecRemarks(myUrlData.type, putData);
			console.log(res);
			if (res.status == '200') {
				dispatch(showMessage({ message: res.message, variant: 'success' }));
				history.push('/app/jobs/refer-emp/refapplicants');
				// history.goBack();
			}
			else dispatch(showMessage({ message: res.message, variant: 'error' }));
		}

		// if (formObj[0].status == 'Selected') {
		// 	let putData = {
		// 		"jrtStatus": values.data.jrtStatus,
		// 		"jrtIndHrRemark": values.data.commentMsg,
		// 	}
		// 	let res = await referralApi.updateHiringRemarks(props.type, putData);
		// 	console.log(res);
		// 	if (res.status == '200') {
		// 		dispatch(showMessage({ message: res.message, variant: 'success' }));
		// 		history.goBack();
		// 	}
		// 	else dispatch(showMessage({ message: res.message, variant: 'error' }));
		// }
	}

	function onCancel() {
		if(myUrlData.type == 'new') history.push("/app/jobs/jobposting/newpostingLists");
		else history.push("/app/jobs/refer-emp/refapplicants");
	}

	function validate(watchValues, errorMethods) {

		let { errors, setError, clearErrors } = errorMethods;

		console.log(`watchValues`, watchValues)
		if (watchValues[0]) {
			console.log(`watchValues`, watchValues[0])
			for (const [ind, value] of Object.entries(watchValues[0])) {
				console.log(value.size)
			}
			// if (!errors[watchValues[0]]) {
			// 	setError(watchValues[0], {
			// 		type: 'manual',
			// 		message: 'You cannot use this first name'
			// 	})
			// }
		}
		// if (errors && errors['firstname'] && errors['firstname']['type'] === 'manual') {
		// 	clearErrors('firstname');
		// }
	}

	return (
		(loading || (formObj.length == 0)) ?
			<FuseLoading />
			:
			<div className="p-16 sm:p-24">

				<SmartForm
					defaultValues={formObj[0]}
					template={template}
					watchFields={['commentMsg']}
					validate={validate}
					onSubmit={onSubmit}
					onCancel={onCancel}
					buttons={(myUrlData.type == 'new') ? ['submit', 'cancel'] : ((role.includes("TALENT-HR") && (currStatus == 'Referred' || currStatus == 'Shortlisted')) ? null : ['cancel'])}
				// buttons={['submit', 'cancel']}
				/>

				{myUrlData.type != 'new' && (role.includes("TALENT-HR") && (currStatus == 'Referred' || currStatus == 'Shortlisted')) && (
					<div className="p-16 sm:p-24">
						<SmartForm

							defaultValues={formObj[0]}
							template={template2}
							onSubmit={onUpdate}
							onCancel={onCancel}
							// onChange={onInput}
							buttons={['submit', 'cancel']}
						/>
					</div>
				)}
			</div>

	);
}

export default withReducer('applicant', reducer)(CreateContent);
// export default withRouter(withReducer('applicants', reducer)(CreateContent));
