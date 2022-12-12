import FuseAnimate from '@core/core/Animate';
import FuseLoading from '@core/core/Loading';
import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import { useForm, useDeepCompareEffect } from '@core/hooks';
import FuseUtils from '@core/utils';
import _ from '@lodash';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { saveAdvanceImprest, newAdvanceImprest, getAdvanceImprest } from '../store/empAdvanceImprestSlice';
import reducer from '../store';
import SmartForm from '@smart-form';
import masterApi from '@common/utils/masterApi';
import ClaimHistoryTable from '../ClaimHistory/ClaimHistoryTable';
import uploadDoc from '@common/utils/uploadDoc';
import History from '@components/History';
import { getClaimHistorys, selectClaimHistorys } from '../store/empClaimHistorysSlice';
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

function ClaimRequest(props) {
	const dispatch = useDispatch();
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const advanceImprest = useSelector(({ advanceImprest }) => advanceImprest.empAdvanceImprest);
	const theme = useTheme();

	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const routeParams = useParams();
	const { advanceImprestId } = routeParams;

	const [masterData, setMasterData] = useState({});
	const [loading, setLoading] = useState(false);

	const [disable, setDisable] = useState(false);

	const claimHistorys = useSelector(selectClaimHistorys);


	useEffect(() => {
		setLoading(false);
	}, [advanceImprest]);

	useDeepCompareEffect(() => {
		async function updateProductState() {
			console.log("routeParams", routeParams);
			if (advanceImprestId === 'new') {
				dispatch(newAdvanceImprest({ uuid: uuid }));
			} else {
				dispatch(getAdvanceImprest(routeParams));

				dispatch(getClaimHistorys(routeParams));
				setLoading(true);
			}
		}
		updateProductState();
		setLoading(false);
	}, [dispatch, routeParams]);


	let template = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
		//title: 'Job Application Form',
		description: 'Form for applying Job',
		sections: [
			{
				//title: '',
				id: 'crListSummary',
				fields: [
					{
						type: 'text',
						name: 'purpose',
						id: 'purpose',
						title: GetLabel('BL00211'),
						maxlength: 51,
						pattern: {
							value: /[A-Za-z]{3}/,
							message: "Invalid text"
						},
						disabled: advanceImprest && advanceImprest.outcome && advanceImprest.outcome.toUpperCase() === "SUBMIT",
						validationProps: {
							required: 'This is a mandatory field',
							maxLength: {
								value: 50,
								message: 'Maximum 50 characters are allowed.'
							}
						}
					},
					{
						type: 'textarea',
						name: 'description',
						id: 'description',
						title: GetLabel('BL00055'),
						pattern: {
							value: /[A-Za-z]{3}/,
							message: "Invalid text"
						},
						maxlength: 151,
						disabled: advanceImprest && advanceImprest.outcome && advanceImprest.outcome.toUpperCase() === "SUBMIT",
						validationProps: {
							required: 'This is a mandatory field',
							maxLength: {
								value: 150,
								message: 'Maximum 150 characters are allowed.'
							}
						}
					},
					{
						type: 'number',
						name: 'amount',
						id: 'amount',
						title: GetLabel('BL00122'),
						pattern: {
							value: /[0-9]/,
							message: "Invalid number"
						},
						disabled: advanceImprest && advanceImprest.outcome && advanceImprest.outcome.toUpperCase() === "SUBMIT",
						validationProps: {
							required: 'This is a mandatory field',
							manual: [
								{
									condition: `amount > 0`,
									message: "Amount should be greater than 0."
								},
								{
									condition: `amount < 10000000000`,
									message: "Amount should be less than 10000000000."
								}
							]
						}
					},
					{
						type: 'file',
						name: 'attachmentFile',
						id: 'attachmentFile',
						title: GetLabel('BL00123'),
						disabled: advanceImprest && advanceImprest.outcome && advanceImprest.outcome.toUpperCase() === "SUBMIT",
						accept: 'image/jpeg,image/png,image/jpg,application/pdf',
						validationProps: {
							size: {
								value: 1,
								message: 'File size should not be more than 1mb.'
							},
						}
					},
					{
						type: 'attachment',
						name: 'attachment',
						id: 'attachment',
						title: 'Uploaded',
						dynamic: {
							field: 'createdBy',
							value: uuid
						}
					},
				]
			}
		]
	};

	if (advanceImprest && advanceImprest.outcome && advanceImprest.outcome.toUpperCase() === "SUBMIT") {
		delete template.sections[0].fields[3];
	}


	if (advanceImprest && advanceImprest.outcome && advanceImprest.outcome.toUpperCase() === "SUBMIT" && advanceImprest.attachment === null) {
		delete template.sections[0].fields[4];
	}

	async function onSubmit(values) {
		if (disable) {
			return;
		}
		setDisable(true);
		let lrData = {};
		if (advanceImprest !== null) {
			lrData.id = advanceImprest.id;
		}
		else {
			lrData.id = null;
		}
		lrData.purpose = values.data.purpose;
		lrData.description = values.data.description;
		lrData.amount = values.data.amount;
		let fileURL = values.data.attachment;
		if (values.data && values.data.attachmentFile && values.data.attachmentFile.length > 0) {
			let fileObj = values.data.attachmentFile[0];
			let fileData = await uploadDoc.saveDoc(fileObj, "leave");
			console.log("fileData", fileData);
			if (_.isArray(fileData) && fileData.length > 0) {
				fileURL = fileData[0].fileUrl;
			}
		}
		lrData.attachment = fileURL;
		if (values.button.toUpperCase() === "SAVE") {
			lrData.outcome = "SAVE";
			console.log("data", lrData);
			dispatch(saveAdvanceImprest(lrData));
			setLoading(true);
		}
		if (values.button.toUpperCase() === "SUBMIT") {
			lrData.outcome = "SUBMIT";
			console.log("data", lrData);
			setLoading(true);
			dispatch(saveAdvanceImprest(lrData));
		}
	}

	function onCancel() {
		//console.log(values);
		props.history.push("/app/employee-service/advance-imprest");
	}

	// if ((!advanceImprest || (advanceImprest && routeParams.advanceImprestId !== advanceImprest.id)) && routeParams.advanceImprestId !== 'new') {
	// 	return <FuseLoading />;
	// }

	return (
		(loading || (advanceImprest && advanceImprest.id && routeParams.advanceImprestId.toString() !== advanceImprest.id.toString())) ?
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
										to="/app/employee-service/advance-imprest"
										color="inherit"
									>
										<Icon className="text-20">
											{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
										</Icon>
										<span className="mx-4"><Label labelId="BL00151" /></span>
									</Typography>
								</FuseAnimate>

								<div className="flex items-center max-w-full">
									<FuseAnimate animation="transition.expandIn" delay={300}>
										<img
											className="w-32 sm:w-48 rounded"
											src="assets/images/ecommerce/product-image-placeholder.png"
										//	alt={form.name}
										/>
									</FuseAnimate>
									<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography className="text-16 sm:text-20 truncate">
												{advanceImprest && advanceImprest.id !== null ? <Label labelId="BL00178" /> : <Label labelId="BL00179" />}
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
										{advanceImprest && advanceImprest.id !== null && claimHistorys && _.isArray(claimHistorys) ? <History data={claimHistorys} /> : ""}
									</Typography>
								</FuseAnimate>
							</div>
						</div>
					)
				}
				content={

					<div className="p-16 sm:p-24">
						{advanceImprestId == "new" && (
							<SmartForm
								//defaultValues={advanceImprest}
								template={template}
								//watchFields={['']}
								// validate={validate}
								onSubmit={onSubmit}
								onCancel={onCancel}
								//onChange={data => handleDataChange(data)}
								buttons={advanceImprest && advanceImprest.outcome && advanceImprest.outcome.toUpperCase() === "SUBMIT" ? ['cancel'] : ['save', 'submit', 'cancel']}
							/>
						)}
						{advanceImprestId !== "new" && advanceImprest && advanceImprest.id && (
							<SmartForm
								defaultValues={advanceImprest}
								template={template}
								//watchFields={['']}
								// validate={validate}
								onSubmit={onSubmit}
								onCancel={onCancel}
								//onChange={data => handleDataChange(data)}
								buttons={advanceImprest && advanceImprest.outcome && advanceImprest.outcome.toUpperCase() === "SUBMIT" && advanceImprest.statusName.toUpperCase() !== "Returned".toUpperCase() ? ['cancel'] : ['save', 'submit', 'cancel']}
							/>
						)}
					</div>
				}
			//innerScroll
			/>
	);
}

export default withReducer('advanceImprest', reducer)(ClaimRequest);
