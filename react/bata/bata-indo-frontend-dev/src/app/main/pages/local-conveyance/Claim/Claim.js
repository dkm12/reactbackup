import FuseAnimate from '@core/core/Animate';
import FuseLoading from '@core/core/Loading';
import FusePageSimple from '@core/core/PageSimple';
import { useDeepCompareEffect } from '@core/hooks';
import _ from '@lodash';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import SmartForm from '@smart-form';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { saveLocalConveyance, newLocalConveyance, getLocalConveyance } from '../store/empLocalConveyanceSlice';
import reducer from '../store';
import masterApi from '@common/utils/masterApi';
import uploadDoc from '@common/utils/uploadDoc';
import axios from 'axios';
import api from '@api';
import History from '@components/History';
import { getLocalClaimHistorys, selectLocalClaimHistorys } from '../store/empLocalClaimHistorysSlice';
import { Label, GetLabel, GetLabelWithLang } from '@common/utils/label';


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
	const localConveyance = useSelector(({ localConveyance }) => localConveyance.empLocalConveyance);
	const theme = useTheme();
	const classes = useStyles(props);
	const routeParams = useParams();
	const { localConveyanceId } = routeParams;
	const localClaimHistorys = useSelector(selectLocalClaimHistorys);
	console.log("LocalClaimHistorys", localClaimHistorys);
	const lang = useSelector(({ i18n }) => i18n.language);

	const [modeOfTravel, setModeOfTravel] = useState([]);
	const [traveModeRates, setTraveModeRates] = useState({});
	const [localFood, setLocalFood] = useState([]);
	const [city, setCity] = useState([]);
	const [loading, setLoading] = useState(false);
	const [disable, setDisable] = useState(false);

	useEffect(() => {
		setLoading(false);
	}, [localConveyance]);



	useDeepCompareEffect(() => {
		async function updateProductState() {
			const responseUserDetails = await axios.get(api.auth.getUserDetail + uuid);
			let empCategory = "";
			if ('data' in responseUserDetails.data) {
				let userDetails = await responseUserDetails.data.data;
				if (userDetails !== null && userDetails != undefined && _.isArray(userDetails)) {
					if ('empCategory' in userDetails[0]) {
						empCategory = userDetails[0].empCategoryCode;
					}
				}
			}

			let modeOfTravelData = await masterApi.getAllLolTravelModeType();
			let localFoodData = await masterApi.getAllLolFoodModeType();
			let travelMRatesData = await masterApi.getAllLocalModeRatesByCategory(empCategory);
			let cityData = await masterApi.getAllActiveCities();
			let cityArray = [];
			_.isArray(cityData)
				&& cityData.map((d) => (cityArray.push({ value: d.cityName, title: d.cityName })));
			setCity(cityArray);
			const data = [];
			const food = [];
			let ltmd = {};
			_.isArray(modeOfTravelData)
				&& modeOfTravelData.map((d) => (data.push({ title: d })));
			setModeOfTravel(data);
			_.isArray(localFoodData)
				&& localFoodData.map((d) => (food.push({ title: d })));
			setLocalFood(food);
			_.isArray(travelMRatesData)
				&& travelMRatesData.map((d) => (
					ltmd = {
						...ltmd,
						[d.ltmeModeName]: d.ltmeAmount && Number(d.ltmeAmount)
					}
				));
			setTraveModeRates(ltmd);

			if (localConveyanceId === 'new') {
				dispatch(newLocalConveyance({ uuid: uuid }));
			} else {
				dispatch(getLocalConveyance(routeParams));
				dispatch(getLocalClaimHistorys(routeParams));
				setLoading(true);
			}
		}

		updateProductState();
		setLoading(false);
	}, [dispatch, routeParams]);


	let template = {
		layout: { column: 2, spacing: 2, size: 'small', label: 'fixed' },
		sections: [
			{
				fields: [
					{
						type: 'array',
						name: 'convyDtlList',
						id: 'convyDtlList',
						layout: { column: 8, spacing: 2, size: 'small', label: 'blank', type: 'table' },
						// columns: ['Travel Purpose', 'From Location', 'To Location', 'Travel From Date', 'Travel To Date', 'Mode Of Travel', 'Attachment', 'File', 'Amount'],
						columns: GetLabel(['BL00102', 'BL00103', 'BL00104', 'BL00105', 'BL00106', 'BL00107', 'BL00110', 'BL00222', 'BL00122']),
						subFields: [
							{
								type: 'text',
								name: 'trvlPurpose',
								id: 'trvlPurpose',
								title: 'Travel Purpose',
								maxlength: 51,
								validationProps: {
									required: 'This is a mandatory field',
									maxLength: {
										value: 50,
										message: 'Maximum 50 characters are allowed.'
									}
								}

							},
							{
								type: 'autocomplete',
								name: 'fromLoc',
								id: 'fromLoc',
								title: 'From Location',
								options: city,
								maxlength: 51,
								validationProps: {
									required: 'This is a mandatory field',
									maxLength: {
										value: 50,
										message: 'Maximum 50 characters are allowed.'
									}
								}
							},
							{
								type: 'autocomplete',
								name: 'toLoc',
								id: 'toLoc',
								title: 'To Location',
								options: city,
								maxlength: 51,
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
								name: 'trvlFromDate',
								id: 'trvlFromDate',
								title: 'Travel From Date',
								max: 'today',
								validationProps: {
									required: 'This is a mandatory field',
									validate: [{
										condition: "this*trvlFromDate <= this*trvlToDate",
										message: "From Date should be less than or equal to To date."
									}],
									manual: [
										{
											condition: `this*trvlFromDate <= today`,
											message: "From Date should be less than or equal to today's date."
										}
									]
								}
							},
							{
								type: 'date',
								name: 'trvlToDate',
								id: 'trvlToDate',
								title: 'Travel To Date',
								max: 'today',
								validationProps: {
									required: 'This is a mandatory field',
									validate: [{
										condition: "this*trvlToDate >= this*trvlFromDate",
										message: "To Date should be greater than or equal to From date."
									}],
									manual: [
										{
											condition: `this*trvlToDate <= today`,
											message: "To Date should be less than or equal to today's date."
										}
									]
								}
							},
							{
								type: 'section',
								layout: { column: 1, spacing: 2, size: 'small', label: 'normal' },
								fields: [
									{
										type: 'select',
										name: 'modeOfTravel',
										id: 'modeOfTravel',
										title: 'Mode Of Travel',
										options: modeOfTravel,
										validationProps: {
											required: 'This is a mandatory field'
										}
									},
									{
										type: 'number',
										name: 'distance',
										id: 'distance',
										title: 'Distance',
										dynamic: {
											field: 'this*modeOfTravel',
											value: ["Own Car", "Own Motor Cycle", "Company Car"]
										},
										validationProps: {
											manual: [
												{
													condition: `this*distance > 0`,
													message: "Distance should be greater than 0."
												},
												{
													condition: `this*distance < 5000`,
													message: "Distance should be less than 5000."
												}
											]
										}
									},
									{
										type: 'text',
										name: 'parking',
										id: 'parking',
										title: 'Parking',
										disabled: true
									},
									{
										type: 'select',
										name: 'foodMeal',
										id: 'foodMeal',
										title: 'Food',
										options: localFood,
										validationProps: {
											enable: 'this*modeOfTravel !== "Online Car Taxi"',
											required: 'This is a mandatory field'
										}

									},
									{
										type: 'text',
										name: 'ttlamt',
										id: 'ttlamt',
										title: 'Total Amount',
										disabled: true

									}
								]
							},
							{
								id: 'attachmentSection',
								type: 'section',
								layout: { column: 1, spacing: 2, size: 'small', label: 'normal' },
								fields: [
									{
										type: 'file',
										// accept: '.pdf,.jpg,.jpeg,.png',
										name: 'modAttachmentFile',
										id: 'modAttachmentFile',
										accept: 'image/jpeg,image/png,image/jpg,application/pdf',
										validationProps: {
											size: {
												value: 1,
												message: 'File size should not be more than 1mb.'
											},
										},
										title: 'Attachment',
										fileName: false
									},
									{
										type: 'blank',
										name: 'blank',
										id: 'blank',
										dynamic: {
											field: 'this*modeOfTravel',
											value: ["Own Car", "Own Motor Cycle", "Company Car"]
										}
									},
									{
										type: 'file',
										// accept: '.pdf,.jpg,.jpeg,.png',
										name: 'parkingAttachmentFile',
										id: 'parkingAttachmentFile',
										accept: 'image/jpeg,image/png,image/jpg,application/pdf',
										validationProps: {
											size: {
												value: 1,
												message: 'File size should not be more than 1mb.'
											},
										},
										title: 'Attachment',
										fileName: false
									},
									{
										type: 'file',
										// accept: '.pdf,.jpg,.jpeg,.png',
										name: 'tollAttachmentFile',
										id: 'tollAttachmentFile',
										accept: 'image/jpeg,image/png,image/jpg,application/pdf',
										validationProps: {
											size: {
												value: 1,
												message: 'File size should not be more than 1mb.'
											},
										},
										title: 'Attachment',
										fileName: false
									},
								]
							},
							{
								type: 'section',
								layout: { column: 1, spacing: 2, size: 'small', label: 'normal' },
								fields: [
									{
										type: 'attachment',
										name: 'modAttachment',
										id: 'modAttachment',
										fileName: false,
										dynamic: {
											field: 'createdBy',
											value: uuid
										}
									},
									{
										type: 'attachment',
										name: 'parkingAttachment',
										id: 'parkingAttachment',
										fileName: false,
										// title: 'Attachment',
										dynamic: {
											field: 'createdBy',
											value: uuid
										}

									},
									{
										type: 'attachment',
										name: 'tollAttachment',
										id: 'tollAttachment',
										fileName: false,
										// title: 'Attachment',
										dynamic: {
											field: 'createdBy',
											value: uuid
										}
									},
								]
							},
							{
								type: 'section',
								layout: { column: 1, spacing: 2, size: 'small', label: 'normal' },
								name: 'List',
								fields: [
									{
										type: 'hidden',
										name: 'modrate',
										id: 'modrate',
										title: 'Hidden',
										dynamic: {
											field: 'this*modeOfTravel',
											value: ["Own Car", "Own Motor Cycle", "Company Car"]
										},
										bind: {
											data: traveModeRates,
											field: 'this*modeOfTravel'
										}
									},
									{
										type: 'blank',
										name: 'blank1',
										id: 'blank1',
										dynamic: {
											field: 'this*modeOfTravel',
											value: ["undefind"]
										}
									},
									{
										type: 'number',
										name: 'billAmt',
										id: 'billAmt',
										title: 'Amount',
										validationProps: {
											required: 'This is a mandatory field'
										},
										dynamic: {
											field: 'this*modeOfTravel',
											value: ["Own Car", "Own Motor Cycle", "Company Car"]
										},
										calculation: {
											type: 'multiplication',
											from: ['this*modrate', 'this*distance']
										}
									},
									{
										type: 'number',
										name: 'billAmt',
										id: 'billAmt',
										title: 'Amount',
										validationProps: {
											required: 'This is a mandatory field'
										},
										dynamic: {
											field: 'this*modeOfTravel',
											isNotValue: ["Own Car", "Own Motor Cycle", "Company Car"]
										}
									},
									{
										type: 'blank',
										name: 'blank',
										id: 'blank',
										dynamic: {
											field: 'this*modeOfTravel',
											value: ["Own Car", "Own Motor Cycle", "Company Car"]
										}
									},
									{
										type: 'number',
										name: 'parkingAmount',
										id: 'parkingAmount',
										title: 'Parking Amount',
										validationProps: {
											enable: 'this*modeOfTravel !== "Online Car Taxi"',
											required: 'This is a mandatory field',
											manual: [
												{
													condition: `this*parkingAmount > 0`,
													message: "Parking Amount should be greater than 0."
												},
												{
													condition: `this*parkingAmount < 10000000000`,
													message: "Parking Amount should be less than 10000000000."
												}
											]
										}
									},
									{
										type: 'number',
										name: 'foodMealAmount',
										id: 'foodMealAmount',
										title: 'FoodMealAmount',
										validationProps: {
											enable: 'this*modeOfTravel !== "Online Car Taxi"',
											required: 'This is a mandatory field',
											manual: [
												{
													condition: `this*foodMealAmount > 0`,
													message: "FoodMealAmount should be greater than 0."
												},
												{
													condition: `this*foodMealAmount < 10000000000`,
													message: "FoodMealAmount should be less than 10000000000."
												}
											]
										}
									},
									{
										type: 'number',
										name: 'tollAmount',
										id: 'tollAmount',
										title: 'Amount',
										calculation: {
											type: 'add',
											from: ['this*billAmt', 'this*foodMealAmount', 'this*parkingAmount']
										},
										validationProps: {
											required: 'This is a mandatory field',
											manual: [
												{
													condition: `this*tollAmount > 0`,
													message: "Amount should be greater than 0."
												},
												{
													condition: `this*tollAmount < 10000000000`,
													message: "Amount should be less than 10000000000."
												}
											]
										}
									},
								]
							},


						],
					},

				]
			},
			{
				id: 'convyDtlListSummary',
				fields: [
					{
						type: 'number',
						name: 'totalAmt',
						id: 'totalAmt',
						title: GetLabel('BL00115'),
						calculation: {
							type: 'add',
							from: ['convyDtlList*tollAmount']
						}
					},
					{
						type: 'text',
						name: 'empRemark',
						id: 'empRemark',
						title: GetLabel('BL00140'),
						maxlength: 151,
						validationProps: {
							maxLength: {
								value: 150,
								message: 'Maximum 150 characters are allowed.'
							}
						}
					}
				]
			},
		]
	};

	if (localConveyance && 'lcId' in localConveyance && localConveyance.lcId === null) {
		template.sections[0].fields[0].columns = template.sections[0].fields[0].columns.filter(item => item !== 'File');
		delete template.sections[0].fields[0].subFields[7];
	}
	if (localConveyance && localConveyance.outcome && localConveyance.outcome.toUpperCase() === "SUBMIT" && localConveyance.statusName.toUpperCase() !== "Returned".toUpperCase()) {
		template = {
			layout: { column: 2, spacing: 2, size: 'small', label: 'fixed' },
			sections: [
				{
					layout: { column: 1, spacing: 2, size: 'small', label: 'fixed' },
					fields: [
						{
							type: 'table',
							name: 'convyDtlList',
							id: 'convyDtlList',
							columns: {
								ids: ['trvlPurpose', 'fromLoc', 'toLoc', 'trvlFromDate', 'trvlToDate', 'modeOfTravel', 'modAttachment', 'billAmt', 'parkingAmount', 'parkingAttachment', 'foodMeal', 'foodMealAmount', 'tollAttachment', 'tollAmount'],
								// titles: ['Travel Purpose', 'Form Location', 'To Location', 'Travel From Date', 'Travel To Date', 'Mode Of Travel', 'Attachment (Mode of Travel)', 'Bill Amount', 'Parking Amount', 'Attachment (Parking)', 'Food/Meal', 'FoodAmont ', 'Attachment (Food)', 'Total Amount'],
								titles: GetLabelWithLang(['BL00102', 'BL00103', 'BL00104', 'BL00105', 'BL00106', 'BL00107', 'BL00180', 'BL00221', 'BL00111', 'BL00181', 'BL00112', 'BL00182', 'BL00183', 'BL00139'], lang),
								// titles: GetLabel(['BL00102', 'BL00103', 'BL00104', 'BL00105', 'BL00106', 'BL00107', 'BL00110', 'BL00122']),
								// titles: arr

							}
						}
					]
				},
				{
					id: 'convyDtlListSummary',
					fields: [
						{
							type: 'number',
							name: 'totalAmt',
							id: 'totalAmt',
							title: GetLabelWithLang('BL00115', lang),
							disabled: true,
							calculation: {
								type: 'add',
								from: ['convyDtlList*tollAmount']
							}
						},
						{
							type: 'text',
							name: 'empRemark',
							id: 'empRemark',
							title: GetLabelWithLang('BL00140', lang),
							disabled: true
						}
					]
				},
			]
		}


	}

	function onCancel() {
		props.history.push("/app/employee-service/local-conveyance");
	}
	function updateAttachment(objList) {
		//console.log("objList",objList);
		return Promise.all(
			objList.map(async product => {

				let fileURL = product.modAttachment;
				if (product.modAttachmentFile && product.modAttachmentFile.length > 0) {
					let fileObj = product.modAttachmentFile[0];
					let fileData = await uploadDoc.saveDoc(fileObj, "leave");
					//console.log("fileData",fileData);
					if (_.isArray(fileData) && fileData.length > 0) {
						fileURL = fileData[0].fileUrl;
					}
				}
				product.modAttachment = fileURL;

				fileURL = product.parkingAttachment;
				if (product.parkingAttachmentFile && product.parkingAttachmentFile.length > 0) {
					let fileObj = product.parkingAttachmentFile[0];
					let fileData = await uploadDoc.saveDoc(fileObj, "leave");
					//console.log("fileData",fileData);
					if (_.isArray(fileData) && fileData.length > 0) {
						fileURL = fileData[0].fileUrl;
					}
				}
				product.parkingAttachment = fileURL;

				fileURL = product.tollAttachment;
				if (product.tollAttachmentFile && product.tollAttachmentFile.length > 0) {
					let fileObj = product.tollAttachmentFile[0];
					let fileData = await uploadDoc.saveDoc(fileObj, "leave");
					//console.log("fileData",fileData);
					if (_.isArray(fileData) && fileData.length > 0) {
						fileURL = fileData[0].fileUrl;
					}
				}
				product.tollAttachment = fileURL;


				return product;
			})
		);
	}

	async function onSubmit(values) {
		//console.log("values",values);
		if (disable) {
			return;
		}
		setDisable(true);
		let convyDtlList = await updateAttachment(values.data.convyDtlList);
		console.log("convyDtlList", values);

		if (values.button.toUpperCase() === "SAVE") {
			let lrData = {};

			lrData.outcome = "SAVE";

			lrData.convyDtlList = convyDtlList;
			lrData.empRemark = values.data.empRemark;
			lrData.totalAmt = values.data.totalAmt;

			if (localConveyance !== null) {
				lrData.lcId = localConveyance.lcId;
			}
			console.log("data", lrData);
			dispatch(saveLocalConveyance(lrData));
			setLoading(true);
		}
		if (values.button.toUpperCase() === "SUBMIT") {
			let lrData = {};

			lrData.outcome = "SUBMIT";

			lrData.convyDtlList = convyDtlList;
			lrData.empRemark = values.data.empRemark;
			lrData.totalAmt = values.data.totalAmt;

			if (localConveyance !== null) {
				lrData.lcId = localConveyance.lcId;
			}
			console.log("data", lrData);
			dispatch(saveLocalConveyance(lrData));
			setLoading(true);
		}

	}



	return (
		(loading || (localConveyance && localConveyance.lcId && routeParams.localConveyanceId.toString() !== localConveyance.lcId.toString())) ?
			<FuseLoading />
			:
			<FusePageSimple
				classes={{
					toolbar: 'px-16 sm:px-24',
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
										to="/app/employee-service/local-conveyance"
										color="inherit"
									>
										<Icon className="text-20">
											{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
										</Icon>
										<span className="mx-4"><Label labelId="BL00024" /></span>
									</Typography>
								</FuseAnimate>

								<div className="flex items-center max-w-full">
									<FuseAnimate animation="transition.expandIn" delay={300}>
										<img
											className="w-32 sm:w-48 rounded"
											src="app/assets/images/ecommerce/product-image-placeholder.png"
											alt="Image"
										/>
									</FuseAnimate>
									<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography className="text-16 sm:text-20 truncate">
												{localConveyance && localConveyance.lcId !== null ? <Label labelId="BL00178" /> : <Label labelId="BL00179" />}

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

					< div className="p-16 sm:p-24" >
						{localConveyanceId == "new" && (
							<SmartForm
								template={template}
								// watchFields={['firstname', 'include_portfolio', 'email', 'country']}
								// validate={validate}
								onSubmit={onSubmit}
								onCancel={onCancel}
								// onChange={data => handleDataChange(data)}
								buttons={localConveyance && localConveyance.outcome && localConveyance.outcome.toUpperCase() === "SUBMIT" ? ['cancel'] : ['save', 'submit', 'cancel']}
							/>
						)}
						{localConveyanceId !== "new" && localConveyance && localConveyance.lcId && (
							<SmartForm
								defaultValues={localConveyance}
								template={template}
								// watchFields={['firstname', 'include_portfolio', 'email', 'country']}
								// validate={validate}
								onSubmit={onSubmit}
								onCancel={onCancel}
								// onChange={data => handleDataChange(data)}
								buttons={localConveyance && localConveyance.outcome && localConveyance.outcome.toUpperCase() === "SUBMIT" && localConveyance.statusName.toUpperCase() !== "Returned".toUpperCase() ? ['cancel'] : ['save', 'submit', 'cancel']}
							/>
						)}
					</div >
				}
			//innerScroll
			/>
	);
}

export default withReducer('localConveyance', reducer)(ClaimRequest);