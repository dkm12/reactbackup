import FuseAnimate from '@core/core/Animate';
import FuseChipSelect from '@core/core/ChipSelect';
import FuseLoading from '@core/core/Loading';
import FusePageSimple from '@core/core/PageSimple';
import FusePageCarded from '@core/core/PageCarded';
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
import { savePayLocalConveyance, getPayLocalConveyance } from '../store/empPayLocalConveyanceSlice';
import { getLocalClaimHistorys, selectLocalClaimHistorys } from '../store/empLocalClaimHistorysSlice';
import History from '@components/History';
import reducer from '../store';
import LocalClaimHistoryTable from '../LocalClaimHistory/LocalClaimHistoryTable';
import SmartForm from '@smart-form';
import { Label, GetLabel } from '@common/utils/label';


function EditApprovePayLocalConveyance(props) {

	const dispatch = useDispatch();
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const localConveyance = useSelector(({ localConveyance }) => localConveyance.empPayLocalConveyance);
	const theme = useTheme();
	const routeParams = useParams();
	const [loading, setLoading] = useState(false);
	const localClaimHistorys = useSelector(selectLocalClaimHistorys);



	console.log("localConveyance", localConveyance);
	useDeepCompareEffect(() => {
		function updateProductState() {
			const { localConveyanceId } = routeParams;
			let params = {
				localConveyanceId: localConveyanceId,
				uuid: uuid
			}
			dispatch(getPayLocalConveyance(params));
			dispatch(getLocalClaimHistorys(params));
			setLoading(true);
		}
		updateProductState();
		setLoading(false);
	}, [dispatch, routeParams]);


	let template = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
		sections: [
			{
				layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
				title: 'Local Conveyance Detail',
				id: 'localSection',
				fields: [
					{
						type: 'text',
						name: 'fullname',
						id: 'fullname',
						title: GetLabel('BL00184'),
						disabled: true
					},
					{
						type: 'text',
						name: 'createdBy',
						id: 'createdBy',
						title: GetLabel('BL00101'),
						disabled: true
					},
					{
						type: 'number',
						name: 'totalAmt',
						id: 'totalAmt',
						title: GetLabel('BL00186'),
						disabled: true
					},
					{
						type: 'text',
						name: 'trxNo',
						id: 'trxNo',
						title: GetLabel('BL00187'),
						disabled: true
					}

				]
			},
			{
				title: GetLabel('BL00200'),
				id: 'cashierTable',
				fields: [
					{
						type: 'number',
						name: 'paidAmt',
						id: 'paidAmt',
						title: GetLabel('BL00201'),
						disabled: true
					},
					{
						type: 'textarea',
						name: 'billProcessorRemark',
						id: 'billProcessorRemark',
						title: GetLabel('BL00140'),
						disabled: true
					}
				]
			}
		]
	};
	if (localConveyance && 'paidAmt' in localConveyance && (localConveyance.paidAmt === "" || localConveyance.paidAmt === null || localConveyance.paidAmt === 0)) {
		delete template.sections[1];
	}
	let template2 = {

		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
		sections: [
			{
				title: 'For Cashier',
				id: 'cashierTable',
				fields: [
					{
						type: 'number',
						name: 'paidAmt',
						id: 'paidAmt',
						title: GetLabel('BL00201'),
						validationProps: {
							required: 'This is a mandatory field'
						}
					},
					{
						type: 'textarea',
						name: 'billProcessorRemark',
						id: 'billProcessorRemark',
						title: GetLabel('BL00140'),
						validationProps: {
							required: 'This is a mandatory field'
						}
					}
				]
			}
		]
	};



	function onSubmit(values) {
		console.log("values", values);
		if (values.button.toUpperCase() === "PAY") {
			let lrData = {};
			lrData.lcId = localConveyance.lcId;
			lrData.paidAmt = values.data.paidAmt;
			lrData.billProcessorRemark = values.data.billProcessorRemark;
			console.log("data", lrData);
			dispatch(savePayLocalConveyance(lrData));
			setLoading(true);

		}
	}

	function onCancel() {
		props.history.push("/app/cashier-requests/local-claim-cashier");
	}
	return (

		(loading || (localConveyance && 'lcId' in localConveyance && routeParams.localConveyanceId.toString() !== localConveyance.lcId.toString())) ?
			<FuseLoading />
			:
			<FusePageSimple
				classes={{
					toolbar: 'p-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
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
										to="/app/cashier-requests/local-claim-cashier"
										color="inherit"
									>
										<Icon className="text-20">
											{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
										</Icon>
										<span className="mx-4"><Label labelId="BL00175" /></span>
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
												<Label labelId="BL00224" />
											</Typography>
										</FuseAnimate>
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography variant="caption"><Label labelId="BL00039" /></Typography>
										</FuseAnimate>
									</div>
								</div>
							</div>
							<div className="flex flex-1 justify-end px-12">
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Typography variant="caption">
										{localConveyance && localConveyance.lcId !== null && localClaimHistorys && _.isArray(localClaimHistorys) ? <History data={localClaimHistorys} /> : ""}
									</Typography>
								</FuseAnimate>
							</div>
						</div>
					)
				}
				content={
					<>
						{localConveyance && localConveyance.lcId && (
							<div className="p-16 sm:p-24">
								<SmartForm
									defaultValues={localConveyance}
									template={template}
									//watchFields={['']}
									// validate={validate}
									// onSubmit={onSubmit}
									onCancel={onCancel}
									//onChange={data => handleDataChange(data)}
									buttons={localConveyance && 'paidAmt' in localConveyance && localConveyance && (localConveyance.paidAmt === '' || localConveyance.paidAmt === null || localConveyance.paidAmt === 0) ? null : ['cancel']}
								/>
								{localConveyance && 'paidAmt' in localConveyance && (localConveyance.paidAmt === "" || localConveyance.paidAmt === null || localConveyance.paidAmt === 0) ?
									<SmartForm
										template={template2}
										//watchFields={['']}
										// validate={validate}
										onSubmit={onSubmit}
										onCancel={onCancel}
										//onChange={data => handleDataChange(data)}
										buttons={['pay', 'cancel']}
									/>
									: ""
								}
							</div>
						)}
						{/* <br />
						<LocalClaimHistoryTable /> */}
					</>
				}
			//innerScroll
			/>
	);
}

export default withReducer('localConveyance', reducer)(EditApprovePayLocalConveyance);
