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
import { savePayAdvanceImprest, getPayAdvanceImprest, getNextApprover } from '../store/empPayAdvanceImprestSlice';
import reducer from '../store';
import ClaimHistoryTable from '../ClaimHistory/ClaimHistoryTable';
import SmartForm from '@smart-form';
import { Label, GetLabel } from '@common/utils/label';

import History from '@components/History';
import { getClaimHistorys, selectClaimHistorys } from '../store/empClaimHistorysSlice';
function EditApprovePayAdvanceImprest(props) {
	const dispatch = useDispatch();
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const advanceImprest = useSelector(({ advanceImprest }) => advanceImprest.empPayAdvanceImprest);
	const theme = useTheme();
	const routeParams = useParams();
	const [loading, setLoading] = useState(false);
	const claimHistorys = useSelector(selectClaimHistorys);


	console.log("advanceImprest", advanceImprest);
	useDeepCompareEffect(() => {
		async function updateProductState() {
			const { advanceImprestId } = routeParams;
			let params = {
				advanceImprestId: advanceImprestId,
				uuid: uuid
			}
			dispatch(getPayAdvanceImprest(params));
			dispatch(getClaimHistorys(routeParams));
		}
		updateProductState();
		setLoading(false);
	}, [dispatch, routeParams]);

	let template = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
		description: 'Form for applying Job',
		sections: [
			{
				layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
				title: GetLabel('BL00151'),
				id: 'travelSection',
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
						title: GetLabel('BL00185'),
						disabled: true
					},
					{
						type: 'number',
						name: 'amount',
						id: 'amount',
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
				title: GetLabel('BL00225'),
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

	if (advanceImprest && 'paidAmt' in advanceImprest && (advanceImprest.paidAmt === "" || advanceImprest.paidAmt === null || advanceImprest.paidAmt === 0)) {
		delete template.sections[1];
	}

	let template2 = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
		description: 'Form for applying Job',
		sections: [
			{
				title: GetLabel('BL00225'),
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
						// ,
						// disabled: advanceImprest && 'paidAmt' in advanceImprest && advanceImprest.paidAmt > 0 ? true : false
					},
					{
						type: 'textarea',
						name: 'billProcessorRemark',
						id: 'billProcessorRemark',
						title: GetLabel('BL00140'),
						validationProps: {
							required: 'This is a mandatory field'
						}
						// ,
						// disabled: advanceImprest && 'paidAmt' in advanceImprest && advanceImprest.paidAmt > 0 ? true : false
					}
				]
			}
		]
	};

	function onSubmit(values) {
		console.log("values", values);
		if (values.button.toUpperCase() === "PAY") {
			let lrData = {};
			lrData.id = advanceImprest.id;
			lrData.paidAmt = values.data.paidAmt;
			lrData.billProcessorRemark = values.data.billProcessorRemark;
			//console.log("data", lrData);
			dispatch(savePayAdvanceImprest(lrData));
			setLoading(true);
		}
	}

	function onCancel() {
		//console.log(values);
		props.history.push("/app/cashier-requests/advance-imprest");
	}


	return (
		(loading || (advanceImprest && 'id' in advanceImprest && routeParams.advanceImprestId.toString() !== advanceImprest.id.toString())) ?
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
										to="/app/cashier-requests/advance-imprest"
										color="inherit"
									>
										<Icon className="text-20">
											{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
										</Icon>
										<span className="mx-4"><Label labelId="BL00177" /></span>
									</Typography>
								</FuseAnimate>

								<div className="flex items-center max-w-full">
									<FuseAnimate animation="transition.expandIn" delay={300}>
										<img
											className="w-32 sm:w-48 rounded"
											src="assets/images/ecommerce/product-image-placeholder.png"
										//alt={form.name}
										/>
									</FuseAnimate>
									<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography className="text-16 sm:text-20 truncate">
												<Label labelId="BL00227" />
											</Typography>
										</FuseAnimate>
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography variant="caption"><Label labelId="BL00224" /></Typography>
										</FuseAnimate>
									</div>
								</div>
							</div>
							<div className="flex flex-1 justify-end px-12">
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Typography variant="caption">
										{advanceImprest && advanceImprest.id !== null && claimHistorys && _.isArray(claimHistorys) ? <History data={claimHistorys} /> : ""}
									</Typography>
								</FuseAnimate>
							</div>
							{/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
							<Button
								className="whitespace-no-wrap normal-case"
								variant="contained"
								color="secondary"
								disabled={!canBeSubmitted()}
								onClick={() => dispatch(savePayAdvanceImprest(form))}
							>
								Save
							</Button>
						</FuseAnimate> */}
						</div>
					)
				}
				content={
					<>
						{advanceImprest && advanceImprest.id && (
							<div className="p-16 sm:p-24">
								<SmartForm
									defaultValues={advanceImprest}
									template={template}
									//watchFields={['']}
									// validate={validate}
									//onSubmit={onSubmit}
									onCancel={onCancel}
									//onChange={data => handleDataChange(data)}
									buttons={advanceImprest && 'paidAmt' in advanceImprest && (advanceImprest.paidAmt === "" || advanceImprest.paidAmt === null || advanceImprest.paidAmt === 0) ? null : ['cancel']}
								/>
								{advanceImprest && 'paidAmt' in advanceImprest && (advanceImprest.paidAmt === "" || advanceImprest.paidAmt === null || advanceImprest.paidAmt === 0) ?
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
						<ClaimHistoryTable />  */}
					</>
				}
			//innerScroll
			/>
	);
}

export default withReducer('advanceImprest', reducer)(EditApprovePayAdvanceImprest);
