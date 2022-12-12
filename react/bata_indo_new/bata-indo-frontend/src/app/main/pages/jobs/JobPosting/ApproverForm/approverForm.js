import FuseAnimate from '@core/core/Animate';
import FuseChipSelect from '@core/core/ChipSelect';
import FuseLoading from '@core/core/Loading';
import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import { useForm, useDeepCompareEffect } from '@core/hooks';
import FuseUtils from '@core/utils';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useParams } from 'react-router-dom';
import reducer from '../../store';
import SmartForm from '@smart-form';
import masterApi from '@common/utils/masterApi';
import History from '@components/History';
import { saveWorkFlow } from '../../store/empApplicantsInfoSlice';
import { referralApi } from '../../store/referralApi';
import { getClaimHistorys, selectClaimHistorys } from '../../store/IJPempHistorySlice';
import { Label, GetLabel } from '@common/utils/label';

const useStyles = makeStyles(theme => ({
	productImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	productImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $productImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $productImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $productImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));

function ApproverForm(props) {
	const dispatch = useDispatch();
	const [applicants, setApplicants] = useState({});
	const theme = useTheme();
	const classes = useStyles(props);
	const routeParams = useParams();
	const [empSelect, setEmpSelect] = useState([]);
	const [dummyStatus, setDummyStatus] = useState('');
	const { ijpRId } = routeParams;
	const IJPHistorys = useSelector(selectClaimHistorys);

	useDeepCompareEffect(() => {
		async function updateProductState() {
			let EmployeeAllData = await referralApi.getIJPapplicantById(ijpRId);
			// console.log(EmployeeAllData.currentStatusCode)
			console.log(EmployeeAllData)
			await setApplicants(EmployeeAllData);
			if (EmployeeAllData && EmployeeAllData.currentStatusCode == "PENDING_WITH_RM") {
				setDummyStatus('Select Next Approver');
				let EmpCatData = await masterApi.getIJPApprover();
				const data = [];
				_.isArray(EmpCatData)
					&& EmpCatData.map((d) => (data.push({ value: d.employId, title: d.employId+' - '+d.fullname })));
				setEmpSelect(data);
			}
			if (EmployeeAllData && EmployeeAllData.currentStatusCode == 'PENDING_WITH_IJP_APPROVER') {
				setDummyStatus('Select Talent HR');
				let TalentHrData = await masterApi.getTalentHr();
				const data = [];
				_.isArray(TalentHrData)
					&& TalentHrData.map((d) => (data.push({ value: d.employId, title: d.employId+' - '+d.fullname })));
				setEmpSelect(data)
			}
			if (EmployeeAllData && EmployeeAllData.currentStatusCode == 'PENDING_WITH_TALENT_HR') {
				setDummyStatus('Select Induction HR');
				let IndHrData = await masterApi.getIndHr();
				const data = [];
				_.isArray(IndHrData)
					&& IndHrData.map((d) => (data.push({ value: d.employId, title: d.employId+' - '+d.fullname })));
				setEmpSelect(data)
			}
		}
		updateProductState();
		dispatch(getClaimHistorys(ijpRId));
		// dispatch(getClaimHistorys(7));
	}, [dispatch, routeParams]);

	let template = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
		description: 'applying Job approval',
		sections: [
			{
				layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },

				id: 'InfoSection',
				fields: [
					{
						type: 'text',
						name: 'ijpTrxNo',
						id: 'ijpTrxNo',
						title: GetLabel('BL00187'),
						disabled: true
					},
					{
						type: 'text',
						name: 'jbdTitle',
						id: 'jbdTitle',
						title: GetLabel('BL00069'),
						disabled: true
					},
					{
						type: 'text',
						name: 'jbdDesigName',
						id: 'jbdDesigName',
						title: GetLabel('BL00072'),
						disabled: true
					},
					{
						type: 'text',
						name: 'jbdDeptName',
						id: 'jbdDeptName',
						title: GetLabel('BL00073'),
						disabled: true
					},
					{
						type: 'text',
						name: 'jbdLocName',
						id: 'jbdLocName',
						title: GetLabel('BL00074'),
						disabled: true
					},
					{
						type: 'text',
						name: 'jbdYoExp',
						id: 'jbdYoExp',
						title: GetLabel('BL00071'),
						disabled: true
					},
					{
						type: 'text',
						name: 'ijpTotalExp',
						id: 'ijpTotalExp',
						title: GetLabel('BL00310'),
						disabled: true
					},
					{
						type: 'text',
						name: 'ijpCurrentRoleSince',
						id: 'ijpCurrentRoleSince',
						title: GetLabel('BL00298'),
						disabled: true
					},
					{
						type: 'text',
						name: 'fullname',
						id: 'fullname',
						title: GetLabel('BL00311'),
						disabled: true
					},
					{
						type: 'text',
						name: 'contactNo',
						id: 'contactNo',
						title: GetLabel('BL00283'),
						disabled: true
					},
					{
						type: 'text',
						name: 'officialEmailId',
						id: 'officialEmailId',
						title: GetLabel('BL00304'),
						disabled: true
					},
					{
						type: 'text',
						name: 'empCurrentDesigName',
						id: 'empCurrentDesigName',
						title: GetLabel('BL00084'),
						disabled: true
					},
					{
						type: 'attachment',
						name: 'ijpResumeFileName',
						id: 'ijpResumeFileName',
						title: GetLabel('BL00086')
					}
				]
			},
			{
				title: (dummyStatus == '' || dummyStatus == 'APPROVED') ? null : 'For Approver',
				id: 'nextApproverTable',
				fields: [
					{
						type: (dummyStatus == '' || dummyStatus == 'APPROVED') ? 'hidden' : 'autocomplete',
						name: 'pendingWith',
						id: 'pendingWith',
						title: dummyStatus,
						options: empSelect,
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: (dummyStatus == '' || dummyStatus == 'APPROVED') ? 'hidden' : 'textarea',
						name: 'tempRemarks',
						id: 'tempRemarks',
						title: GetLabel('BL00140'),
						validationProps: {
							required: 'This is a mandatory field',
							maxLength: {
								value: 200,
								message: 'Maximum 200 characters are allowed.'
							}
						}
					}
				]
			},
		]
	};
	function onSubmit(values) {
		console.log(values);
		let apData = {};
		apData.trxNo = values.data.ijpTrxNo;
		apData.remarks = values.data.tempRemarks;
		apData.currentStatus = values.data.currentStatusCode;
		apData.pendingWith = values.data.pendingWith;

		if (values.button.toUpperCase() === "ACCEPT") {
			apData.outcome = "APPROVE";
		}
		if (values.button.toUpperCase() === "REJECT") {
			apData.outcome = "REJECT";
		}
		if (values.button.toUpperCase() === "SUBMIT") {
			apData.outcome = "APPROVE";
		}
		dispatch(saveWorkFlow(apData));
	}

	function onCancel() {
		//console.log(values);
		props.history.push("/app/jobs/jobposting/applicants");
	}

	return (
		((applicants && applicants.id && routeParams.ijpRId.toString() !== applicants.id.toString())) ?
			<FuseLoading />
			:
			<FusePageSimple
				classes={{
					toolbar: 'px-16 sm:px-24'
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
										to="/app/jobs/jobposting/applicants"
										color="inherit"
									>
										<Icon className="text-20">
											{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
										</Icon>
										<span className="mx-4"><Label labelId="BL00297" /></span>
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
												<Label labelId="BL00312" />
											</Typography>
										</FuseAnimate>
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography variant="caption"><Label labelId="BL00312" /></Typography>
										</FuseAnimate>
									</div>
								</div>
							</div>
							<div className="flex flex-1 justify-end px-12">
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Typography variant="caption">
										{applicants && applicants.id !== null && IJPHistorys && _.isArray(IJPHistorys) ? <History data={IJPHistorys} /> : ""}
									</Typography>
								</FuseAnimate>
							</div>
						</div>
					)
				}
				content={
					<>
						{applicants && applicants.ijpRecrId && applicants.currentStatusCode &&
							<div className="p-16 sm:p-24">
								<SmartForm
									defaultValues={applicants}
									template={template}
									// watchFields={['']}
									// validate={validate}
									onSubmit={onSubmit}
									onCancel={onCancel}
									//onChange={data => handleDataChange(data)}
									buttons={(applicants.currentStatusCode == 'PENDING_WITH_TALENT_HR') ? ['submit', 'cancel'] : (applicants.currentStatusCode == 'APPROVED' ? ['cancel'] : ['accept', 'reject', 'cancel'])}
								/>
							</div>
						}

					</>
				}
			// innerScroll
			/>
	);
}

export default withReducer('applicants', reducer)(ApproverForm);
