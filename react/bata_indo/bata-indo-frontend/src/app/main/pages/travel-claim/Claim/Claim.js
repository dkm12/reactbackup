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
import { saveTravelClaim, newTravelClaim, getTravelClaim } from '../store/empTravelClaimSlice';
import reducer from '../store';
import SmartForm from '@smart-form';
import masterApi from '@common/utils/masterApi';
import ClaimHistoryTable from '../ClaimHistory/ClaimHistoryTable';
import uploadDoc from '@common/utils/uploadDoc';
import axios from 'axios';
import api from '@api';
import History from '@components/History';
import { getClaimHistorys, selectClaimHistorys } from '../store/empClaimHistorysSlice';
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
	const travelClaim = useSelector(({ travelClaim }) => travelClaim.empTravelClaim);
	const theme = useTheme();
	const lang = useSelector(({ i18n }) => i18n.language);
	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const routeParams = useParams();
	const { travelClaimId } = routeParams;

	const [masterData, setMasterData] = useState({});
	const [loading, setLoading] = useState(false);

	const [traveModeRates, setTraveModeRates] = useState({});

	const [disable, setDisable] = useState(false);

	const claimHistorys = useSelector(selectClaimHistorys);
	const today = new Date();
	useEffect(() => {
		setLoading(false);
	}, [travelClaim]);

	useDeepCompareEffect(() => {
		async function updateProductState() {
			console.log("routeParams", routeParams);
			setLoading(true);

			const responseUserDetails = await axios.get(api.auth.getUserDetail + uuid);
			let empCategory = "";
			if ('data' in responseUserDetails.data) {
				let userDetails = await responseUserDetails.data.data;
				if (userDetails !== null && userDetails != undefined && _.isArray(userDetails)) {
					if ('empCategoryCode' in userDetails[0]) {
						empCategory = userDetails[0].empCategoryCode;
					}
				}
			}

			let tmd = {};
			let travelMRatesData = await masterApi.getAllTravelModeRatesByCategory(empCategory);
			_.isArray(travelMRatesData)
				&& travelMRatesData.map((d) => (
					tmd = {
						...tmd,
						[d.tmeModeName]: d.tmeAmount && Number(d.tmeAmount)
					}
				));
			setTraveModeRates(tmd);

			let cityData = await masterApi.getAllActiveCities();
			let cityArray = [];
			_.isArray(cityData)
				&& cityData.map((d) => (cityArray.push({ value: d.cityName, title: d.cityName })));

			cityArray.push({ value: "Other", title: "Other" });
			let motArray = [];
			let modeOfTravelCodeData = await masterApi.getAllTravelModeType();
			_.isArray(modeOfTravelCodeData)
				&& modeOfTravelCodeData.map((d) => (motArray.push({ title: d, value: d })));

			let billTypeData = await masterApi.getAllActiveBillTypes();
			let billTypeArray = [];
			_.isArray(billTypeData)
				&& billTypeData.map((d) => (billTypeArray.push({ value: d.btCode, title: d.btName })));

			//console.log("cityDropDown", data);
			//setCities(cityArray);
			setMasterData(
				{
					cities: cityArray,
					mots: motArray,
					billTypes: billTypeArray
				}
			);

			if (travelClaimId === 'new') {
				dispatch(newTravelClaim({ uuid: uuid }));
			} else {
				dispatch(getTravelClaim(routeParams));
				dispatch(getClaimHistorys(routeParams));
			}
		}
		updateProductState();
	}, [dispatch, routeParams]);


	let template = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
		//title: 'Job Application Form',
		description: 'Form for applying Job',
		sections: [
			{
				layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
				//title: 'Personal Information',
				id: 'travelSection',
				fields: [
					{
						type: 'date',
						name: 'fromDate',
						id: 'fromDate',
						title: GetLabel('BL00105'),
						max: 'today',
						validationProps: {
							required: 'This is a mandatory field',
							validate: [{
								condition: "fromDate <= toDate",
								message: "From Date should be less than or equal to To date."
							}],
							manual: [
								{
									condition: `fromDate <= today`,
									message: "From Date should be less than or equal to today's date."
								}
							]
						}
					},
					{
						type: 'date',
						name: 'toDate',
						id: 'toDate',
						title: GetLabel('BL00106'),
						max: 'today',
						validationProps: {
							required: 'This is a mandatory field',
							validate: [{
								condition: "toDate >= fromDate",
								message: "From Date should be less than or equal to To date."
							}],
							manual: [
								{
									condition: `toDate <= today`,
									message: "To Date should be less than or equal to today's date."
								}
							]
						}
					},
					{
						type: 'text',
						name: 'travelPurpose',
						id: 'travelPurpose',
						title: GetLabel('BL00102'),
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
						type: 'number',
						name: 'claimedTotalAmt',
						id: 'claimedTotalAmt',
						title: GetLabel('BL00186'),
						calculation: {
							type: 'add',
							from: ['trvlDtlList*trvlAmt', 'trvlHotelList*trvlAmt', 'trvlHotelList*taxAmt', 'trvlFoodList*foodAmt', 'trvlOthBillList*othBillAmt']
						}
					}
				]
			},
			{
				title: GetLabel('BL00125'),
				id: 'trvlDtlListSection',
				layout: { column: 1, spacing: 2, size: 'small', label: 'fixed' },
				fields: [
					{
						type: 'array',
						name: 'trvlDtlList',
						id: 'trvlDtlList',
						//title: 'Array',
						layout: { column: 8, spacing: 2, size: 'small', label: 'blank', type: 'table' },
						columns: ['Travel Date', 'Travel From', 'Travel To', 'Mode of Travel', 'Fare Amount', 'Attachment', 'File'],
						columns: GetLabel(['BL00130', 'BL00131', 'BL00132', 'BL00133', 'BL00197', 'BL00123', 'BL00222']),
						subFields: [
							{
								type: 'date',
								name: 'trvlDate',
								id: 'trvlDate',
								max: 'today',
								title: 'Travel Date',
								validationProps: {
									required: 'This is a mandatory field',
									validate: [
										{
											condition: "this*trvlDate >= fromDate",
											message: "Travel Date should be greater than or equal to From date."
										},
										{
											condition: "this*trvlDate <= toDate",
											message: "Travel Date should be less than or equal to To date."
										}
									],
									manual: [
										{
											condition: `this*trvlDate <= today`,
											message: "Travel Date should be more than or equal to today's date."
										}
									]
								}
							},
							{
								type: 'section',
								layout: { column: 1, spacing: 2, size: 'small', label: 'normal' },
								fields: [
									{
										type: 'autocomplete',
										name: 'trvlFrom',
										id: 'trvlFrom',
										options: masterData.cities,
										validationProps: {
											required: 'This is a mandatory field.'
										}
									},
									{
										type: 'text',
										name: 'otherCityTravelFrom',
										id: 'otherCityTravelFrom',
										title: 'Other City',
										maxlength: 51,
										dynamic: {
											field: 'this*trvlFrom',
											value: ["Other"]
										},
										validationProps: {
											required: 'This is a mandatory field.',
											maxLength: {
												value: 50,
												message: 'Maximum 50 characters are allowed.'
											}
										}
									}
								]
							},
							{
								type: 'section',
								layout: { column: 1, spacing: 2, size: 'small', label: 'normal' },
								fields: [
									{
										type: 'autocomplete',
										name: 'trvltTo',
										id: 'trvltTo',
										options: masterData.cities,
										validationProps: {
											required: 'This is a mandatory field.'
										}
									},
									{
										type: 'text',
										name: 'otherCityTravelTo',
										id: 'otherCityTravelTo',
										title: 'Other City',
										maxlength: 51,
										dynamic: {
											field: 'this*trvltTo',
											value: ["Other"]
										},
										validationProps: {
											required: 'This is a mandatory field.',
											maxLength: {
												value: 50,
												message: 'Maximum 50 characters are allowed.'
											}
										}
									}
								]
							},
							{
								type: 'section',
								layout: { column: 1, spacing: 2, size: 'small', label: 'normal' },
								fields: [
									{
										type: 'select',
										name: 'modeOfTravelCode',
										id: 'modeOfTravelCode',
										title: 'Mode Of Travel',
										options: masterData.mots,
										validationProps: {
											required: 'This is a mandatory field.'
										}
									},
									{
										type: 'number',
										name: 'trvlKm',
										id: 'trvlKm',
										title: 'Distance',
										dynamic: {
											field: 'this*modeOfTravelCode',
											value: ["Own Car", "Own Motor Cycle", "Company Car"]
										},
										validationProps: {
											required: 'This is a mandatory field.',
											manual: [
												{
													condition: `this*trvlKm > 0`,
													message: "Distance should be greater than 0."
												},
												{
													condition: `this*trvlKm < 5000`,
													message: "Distance should be less than 5000."
												}
											]
										}
									},
									{
										type: 'hidden',
										name: 'modrate',
										id: 'modrate',
										title: 'Hidden',
										dynamic: {
											field: 'this*modeOfTravelCode',
											value: ["Own Car", "Own Motor Cycle", "Company Car"]
										},
										bind: {
											data: traveModeRates,
											field: 'this*modeOfTravelCode'
										}
									},
								]
							},
							// {
							// 	type: 'autocomplete',
							// 	name: 'modeOfTravelCode',
							// 	id: 'modeOfTravelCode',
							// 	title: 'Mode of Travel',
							// 	options: masterData.mots
							// },
							// {
							// 	type: 'number',
							// 	name: 'trvlKm',
							// 	id: 'trvlKm',
							// 	title: 'Distance'
							// 	// ,
							// 	// dynamic: {
							// 	// 	field: 'modeOfTravelCode',
							// 	// 	value: 'Own Car'
							// 	// }

							// },
							// {
							// 	type: 'number',
							// 	name: 'trvlAmt',
							// 	id: 'trvlAmt',
							// 	title: 'Fare Amount',
							// },
							{
								type: 'blank',
								name: 'blank',
								id: 'blank',
								dynamic: {
									field: 'this*modeOfTravelCode',
									value: ["undefind"]
								}
							},
							{
								type: 'number',
								name: 'trvlAmt',
								id: 'trvlAmt',
								title: 'Amount',
								dynamic: {
									field: 'this*modeOfTravelCode',
									value: ["Own Car", "Own Motor Cycle", "Company Car"]
								},
								calculation: {
									type: 'multiplication',
									from: ['this*modrate', 'this*trvlKm']
								},
								validationProps: {
									required: 'This is a mandatory field.',
									manual: [
										{
											condition: `this*trvlAmt > 0`,
											message: "Amount should be greater than 0."
										},
										{
											condition: `this*trvlAmt < 10000000000`,
											message: "Amount should be less than 10000000000."
										}
									]
								}
							},
							{
								type: 'number',
								name: 'trvlAmt',
								id: 'trvlAmt',
								title: 'Amount',
								dynamic: {
									field: 'this*modeOfTravelCode',
									isNotValue: ["Own Car", "Own Motor Cycle", "Company Car"]
								},
								validationProps: {
									required: 'This is a mandatory field.',
									manual: [
										{
											condition: `this*trvlAmt > 0`,
											message: "Amount should be greater than 0."
										},
										{
											condition: `this*trvlAmt < 10000000000`,
											message: "Amount should be less than 10000000000."
										}
									]
								}
							},
							{
								type: 'file',
								name: 'attachmentFile',
								id: 'attachmentFile',
								title: 'Upload',
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
								name: 'attachmentId',
								id: 'attachmentId',
								dynamic: {
									field: 'createdBy',
									value: uuid
								}
							}
						]
					}
				]
			},
			{
				//title: '',
				id: 'travelDtlSummary',
				fields: [
					{
						type: 'number',
						name: 'travelDtlTotal',
						id: 'travelDtlTotal',
						title: GetLabel('BL00124'),
						calculation: {
							type: 'add',
							from: ['trvlDtlList*trvlAmt']
						}
					},
					{
						type: 'text',
						maxlength: 151,
						name: 'travelDtlRemark',
						id: 'travelDtlRemark',
						title: GetLabel('BL00140'),
						validationProps: {
							maxLength: {
								value: 150,
								message: 'Maximum 150 characters are allowed.'
							}
						}
					}
				]
			},
			{
				title: 'Hotel Details',
				id: 'trvlHotelListSection',
				layout: { column: 1, spacing: 2, size: 'small', label: 'fixed' },
				fields: [
					{
						type: 'array',
						name: 'trvlHotelList',
						id: 'trvlHotelList',
						//title: 'Array',
						layout: { column: 10, spacing: 2, size: 'small', label: 'blank', type: 'table' },
						columns: ['Hotel Name', 'City', 'From', 'To', 'Bill No.', 'Amount (Excluding Tax)', 'Tax Amount', 'Total (Including Tax)', 'Attachment', 'File'],
						columns: GetLabel(['BL00136', 'BL00137', 'BL00127', 'BL00128', 'BL00120', 'BL00198', 'BL00138', 'BL00139', 'BL00123', 'BL00222']),
						subFields: [
							{
								type: 'text',
								name: 'hotelName',
								id: 'hotelName',
								title: 'Hotel Name',
								maxlength: 51,
								validationProps: {
									validateRow: ['hotelName', 'cityCode', 'trvltFrom', 'trvltTo', 'billNo', 'trvlAmt', 'taxAmt'],
									required: 'This is a mandatory field.',
									maxLength: {
										value: 50,
										message: 'Maximum 50 characters are allowed.'
									}
								}
							},
							{
								type: 'section',
								layout: { column: 1, spacing: 2, size: 'small', label: 'normal' },
								fields: [
									{
										type: 'autocomplete',
										name: 'cityCode',
										id: 'cityCode',
										options: masterData.cities,
										validationProps: {
											validateRow: ['restaurantName', 'cityCode', 'fhdDate', 'invoiceNo', 'foodAmt'],
											required: 'This is a mandatory field.'
										}
									},
									{
										type: 'text',
										name: 'otherCity',
										id: 'otherCity',
										title: 'Other City',
										maxlength: 51,
										dynamic: {
											field: 'this*cityCode',
											value: ["Other"]
										},
										validationProps: {
											required: 'This is a mandatory field.',
											maxLength: {
												value: 50,
												message: 'Maximum 50 characters are allowed.'
											}
										}
									}
								]
							},
							{
								type: 'date',
								name: 'trvltFrom',
								id: 'trvltFrom',
								max: 'today',
								title: 'From',
								validationProps: {
									validateRow: ['hotelName', 'cityCode', 'trvltFrom', 'trvltTo', 'billNo', 'trvlAmt', 'taxAmt'],
									required: 'This is a mandatory field.',
									validate: [
										{
											condition: "this*trvltFrom >= fromDate",
											message: "From Date should be greater than or equal to From date."
										},
										{
											condition: "this*trvltFrom <= toDate",
											message: "From Date should be less than or equal to To date."
										},
										{
											condition: "this*trvltFrom <= this*trvltTo",
											message: "From Date should be less than or equal to To date."
										}],
									manual: [
										{
											condition: `this*trvltFrom <= today`,
											message: "From Date should be less than or equal to today."
										}
									]
								}
							},
							{
								type: 'date',
								name: 'trvltTo',
								id: 'trvltTo',
								max: 'today',
								title: 'To',
								validationProps: {
									validateRow: ['hotelName', 'cityCode', 'trvltFrom', 'trvltTo', 'billNo', 'trvlAmt', 'taxAmt'],
									required: 'This is a mandatory field.',
									validate: [{
										condition: "this*trvltTo >= fromDate",
										message: "To Date should be greater than or equal to From date."
									},
									{
										condition: "this*trvltTo <= toDate",
										message: "To Date should be less than or equal to To date."
									}, {
										condition: "this*trvltFrom <= this*trvltTo",
										message: "To Date should be greater than or equal to From date."
									}],
									manual: [
										{
											condition: `this*trvltTo <= today`,
											message: "To Date should be less than or equal to today."
										}
									]
								}
							},
							{
								type: 'text',
								name: 'billNo',
								id: 'billNo',
								title: 'Bill Number',
								maxlength: 51,
								validationProps: {
									validateRow: ['hotelName', 'cityCode', 'trvltFrom', 'trvltTo', 'billNo', 'trvlAmt', 'taxAmt'],
									required: 'This is a mandatory field.',
									maxLength: {
										value: 50,
										message: 'Maximum 50 characters are allowed.'
									}
								}
							},
							{
								type: 'number',
								name: 'trvlAmt',
								id: 'trvlAmt',
								title: 'Amount',
								validationProps: {
									validateRow: ['hotelName', 'cityCode', 'trvltFrom', 'trvltTo', 'billNo', 'trvlAmt', 'taxAmt'],
									required: 'This is a mandatory field.',
									manual: [
										{
											condition: `this*trvlAmt > 0`,
											message: "Amount should be greater than 0."
										},
										{
											condition: `this*trvlAmt < 10000000000`,
											message: "Amount should be less than 10000000000."
										}
									]
								}
							},
							{
								type: 'number',
								name: 'taxAmt',
								id: 'taxAmt',
								title: 'Tax Amount',
								validationProps: {
									validateRow: ['hotelName', 'cityCode', 'trvltFrom', 'trvltTo', 'billNo', 'trvlAmt', 'taxAmt'],
									required: 'This is a mandatory field.',
									manual: [
										{
											condition: `this*taxAmt > 0`,
											message: "Tax Amount should be greater than 0."
										},
										{
											condition: `this*taxAmt < 10000000000`,
											message: "Tax Amount should be less than 10000000000."
										}
									]
								}
							},
							{
								type: 'number',
								name: 'taxAmtTotal',
								id: 'taxAmtTotal',
								title: 'Total Amount',
								calculation: {
									type: 'add',
									from: ['this*trvlAmt', 'this*taxAmt']
								}

							},
							{
								type: 'file',
								name: 'attachmentFile',
								id: 'attachmentFile',
								title: 'Upload',
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
								name: 'attachmentId',
								id: 'attachmentId',
								dynamic: {
									field: 'createdBy',
									value: uuid
								}
							}
						]
					}
				]
			},
			{
				//title: 'travelDtlSummary',
				id: 'hotelDtlSummary',
				fields: [
					{
						type: 'number',
						name: 'hotelDtlTotal',
						id: 'hotelDtlTotal',
						title: GetLabel('BL00124'),
						calculation: {
							type: 'add',
							from: ['trvlHotelList*trvlAmt', 'trvlHotelList*taxAmt']
						}
					},
					{
						type: 'text',
						name: 'hotelDtlRemark',
						id: 'hotelDtlRemark',
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
			{
				title: GetLabel('BL00141'),
				id: 'trvlFoodListSection',
				layout: { column: 1, spacing: 2, size: 'small', label: 'fixed' },
				fields: [
					{
						type: 'array',
						name: 'trvlFoodList',
						id: 'trvlFoodList',
						//title: 'Array',
						layout: { column: 7, spacing: 2, size: 'small', label: 'blank', type: 'table' },
						// columns: ['Restaurant Name', 'City', 'Date', 'Invoice No.', 'Amount', 'Attachment', 'File'],
						columns: GetLabel(['BL00142', 'BL00137', 'BL00143', 'BL00199', 'BL00122', 'BL00123', 'BL00222']),
						subFields: [
							{
								type: 'text',
								name: 'restaurantName',
								id: 'restaurantName',
								title: 'Restaurant Name',
								maxlength: 51,
								validationProps: {
									validateRow: ['restaurantName', 'cityCode', 'fhdDate', 'invoiceNo', 'foodAmt'],
									required: 'This is a mandatory field.',
									maxLength: {
										value: 50,
										message: 'Maximum 50 characters are allowed.'
									}
								}
							},
							{
								type: 'section',
								layout: { column: 1, spacing: 2, size: 'small', label: 'normal' },
								fields: [
									{
										type: 'autocomplete',
										name: 'cityCode',
										id: 'cityCode',
										options: masterData.cities,
										validationProps: {
											validateRow: ['restaurantName', 'cityCode', 'fhdDate', 'invoiceNo', 'foodAmt'],
											required: 'This is a mandatory field.'
										}
									},
									{
										type: 'text',
										name: 'otherCity',
										id: 'otherCity',
										title: 'Other City',
										maxlength: 51,
										dynamic: {
											field: 'this*cityCode',
											value: ["Other"]
										},
										validationProps: {
											required: 'This is a mandatory field.',
											maxLength: {
												value: 50,
												message: 'Maximum 50 characters are allowed.'
											}
										}
									}
								]
							},
							{
								type: 'date',
								name: 'fhdDate',
								id: 'fhdDate',
								max: 'today',
								title: 'Date',
								validationProps: {
									validateRow: ['restaurantName', 'cityCode', 'fhdDate', 'invoiceNo', 'foodAmt'],
									required: 'This is a mandatory field.',
									manual: [
										{
											condition: "this*fhdDate >= fromDate",
											message: "Date should be greater than or equal to From date."
										},
										{
											condition: "this*fhdDate <= toDate",
											message: "Date should be less than or equal to To date."
										},
										{
											condition: `this*fhdDate <= today`,
											message: "To Date should be less than or equal to today."
										}
									]
								}
							},
							{
								type: 'text',
								name: 'invoiceNo',
								id: 'invoiceNo',
								title: 'Invoice No.',
								maxlength: 51,
								validationProps: {
									validateRow: ['restaurantName', 'cityCode', 'fhdDate', 'invoiceNo', 'foodAmt'],
									required: 'This is a mandatory field.',
									maxLength: {
										value: 50,
										message: 'Maximum 50 characters are allowed.'
									}
								}
							},
							{
								type: 'number',
								name: 'foodAmt',
								id: 'foodAmt',
								title: 'Amount',
								validationProps: {
									validateRow: ['restaurantName', 'cityCode', 'fhdDate', 'invoiceNo', 'foodAmt'],
									required: 'This is a mandatory field.',
									manual: [
										{
											condition: `this*foodAmt > 0`,
											message: "Amount should be greater than 0."
										},
										{
											condition: `this*foodAmt < 10000000000`,
											message: "Amount should be less than 10000000000."
										}
									]
								}
							}
							,
							{
								type: 'file',
								name: 'attachmentFile',
								id: 'attachmentFile',
								title: 'Upload',
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
								name: 'attachmentId',
								id: 'attachmentId',
								dynamic: {
									field: 'createdBy',
									value: uuid
								}
							}
						]
					}
				]
			},
			{
				//title: 'travelDtlSummary',
				id: 'foodDtlSummary',
				fields: [
					{
						type: 'number',
						name: 'foodDtlTotal',
						id: 'foodDtlTotal',
						title: GetLabel('BL00124'),
						calculation: {
							type: 'add',
							from: ['trvlFoodList*foodAmt']
						}
					},
					{
						type: 'text',
						name: 'foodDtlRemark',
						id: 'foodDtlRemark',
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
			{
				title: GetLabel('BL00144'),
				id: 'trvlOthBillListSection',
				layout: { column: 1, spacing: 2, size: 'small', label: 'fixed' },
				fields: [
					{
						type: 'array',
						name: 'trvlOthBillList',
						id: 'trvlOthBillList',
						//title: 'Array',
						layout: { column: 5, spacing: 2, size: 'small', label: 'blank', type: 'table' },
						// columns: ['Bill Type', 'Bill Description', 'Bill Amount', 'Attachment', 'File'],
						columns: GetLabel(['BL00145', 'BL00149', 'BL00150', 'BL00123', 'BL00222']),
						subFields: [
							{
								type: 'select',
								name: 'othBillTypeCode',
								id: 'othBillTypeCode',
								title: 'Bill Type',
								options: masterData.billTypes,
								validationProps: {
									validateRow: ['othBillTypeCode', 'billDesc', 'othBillAmt'],
									required: 'This is a mandatory field.'
								}
							},
							{
								type: 'text',
								name: 'billDesc',
								id: 'billDesc',
								title: 'Bill Description',
								maxlength: 51,
								validationProps: {
									validateRow: ['othBillTypeCode', 'billDesc', 'othBillAmt'],
									required: 'This is a mandatory field.',
									maxLength: {
										value: 50,
										message: 'Maximum 50 characters are allowed.'
									}
								}
							},
							{
								type: 'number',
								name: 'othBillAmt',
								id: 'othBillAmt',
								title: 'Bill Amount',
								validationProps: {
									validateRow: ['othBillTypeCode', 'billDesc', 'othBillAmt'],
									required: 'This is a mandatory field.',
									manual: [
										{
											condition: `this*othBillAmt > 0`,
											message: "Bill Amount should be greater than 0."
										},
										{
											condition: `this*othBillAmt < 10000000000`,
											message: "Bill Amount should be less than 10000000000."
										}
									]
								}

							}
							,
							{
								type: 'file',
								name: 'attachmentFile',
								id: 'attachmentFile',
								title: 'Upload',
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
								name: 'attachmentId',
								id: 'attachmentId',
								dynamic: {
									field: 'createdBy',
									value: uuid
								}
							}
						]
					}
				]
			},
			{
				//title: 'travelDtlSummary',
				id: 'otherDtlSummary',
				fields: [
					{
						type: 'number',
						name: 'otherDtlTotal',
						id: 'otherDtlTotal',
						title: GetLabel('BL00124'),
						calculation: {
							type: 'add',
							from: ['trvlOthBillList*othBillAmt']
						}
					},
					{
						type: 'text',
						name: 'otherDtlRemark',
						id: 'otherDtlRemark',
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

	if (travelClaim && 'id' in travelClaim && travelClaim.id === null) {
		template.sections[1].fields[0].columns = template.sections[1].fields[0].columns.filter(item => item !== 'File');
		template.sections[3].fields[0].columns = template.sections[3].fields[0].columns.filter(item => item !== 'File');
		template.sections[5].fields[0].columns = template.sections[5].fields[0].columns.filter(item => item !== 'File');
		template.sections[7].fields[0].columns = template.sections[7].fields[0].columns.filter(item => item !== 'File');
	}

	if (travelClaim && travelClaim.outcome && travelClaim.outcome.toUpperCase() === "SUBMIT" && travelClaim.statusName.toUpperCase() !== "Returned".toUpperCase()) {
		template = {
			layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
			//title: 'Job Application Form',
			description: 'Form for applying Job',
			sections: [
				{
					layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
					title: GetLabelWithLang('BL00411', lang),
					id: 'travelSection',
					fields: [
						{
							type: 'text',
							name: 'fullname',
							id: 'fullname',
							title: GetLabelWithLang('BL00164', lang),
							disabled: true
						},
						// {
						// 	type: 'text',
						// 	name: 'grade',
						// 	id: 'grade',
						// 	title: 'Grade',
						// 	disabled: true
						// },
						// {
						// 	type: 'date',
						// 	name: 'fromDate',
						// 	id: 'fromDate',
						// 	title: 'Date of Join',
						// 	disabled: true
						// },
						{
							type: 'text',
							name: 'createdBy',
							id: 'createdBy',
							title: GetLabelWithLang('BL00165', lang),
							disabled: true
						},
						{
							type: 'text',
							name: 'department',
							id: 'department',
							title: GetLabelWithLang('BL00167', lang),
							disabled: true
						},
						{
							type: 'text',
							name: 'designation',
							id: 'designation',
							title: GetLabelWithLang('BL00166', lang),
							disabled: true
						},
						{
							type: 'date',
							name: 'fromDate',
							id: 'fromDate',
							max: 'today',
							title: GetLabelWithLang('BL00105', lang),
							disabled: true
						},
						{
							type: 'date',
							name: 'toDate',
							id: 'toDate',
							title: GetLabelWithLang('BL00106', lang),
							disabled: true
						},
						{
							type: 'number',
							name: 'claimedTotalAmt',
							id: 'claimedTotalAmt',
							title: GetLabelWithLang('BL00186', lang),
							disabled: true
						},
						{
							type: 'text',
							name: 'trxNo',
							id: 'trxNo',
							title: GetLabelWithLang('BL00187', lang),
							disabled: true
						},
						{
							type: 'text',
							name: 'statusCode',
							id: 'statusCode',
							title: GetLabelWithLang('BL00188', lang),
							disabled: true
						}
					]
				},
				{
					title: GetLabelWithLang('BL00125', lang),
					id: 'trvlDtlList1Section',
					layout: { column: 1, spacing: 2, size: 'medium', label: 'fixed' },
					fields: [
						{
							type: 'table',
							name: 'trvlDtlList',
							id: 'trvlDtlList',
							columns: {
								ids: ['trvlDate', 'trvlFromDisplayName', 'trvltToDisplayName', 'modeOfTravelName', 'trvlKm', 'trvlAmt', 'attachmentId'],
								// titles: ['Travel Date', 'Travel From', 'Travel To', 'Mode of Travel', 'Distance', 'Fare Amount', 'Attachment']
								titles: GetLabelWithLang(['BL00130', 'BL00131', 'BL00132', 'BL00133', 'BL00197', 'BL00123', 'BL00222'], lang),

							}
						}
					]
				},
				{
					//title: '',
					id: 'travelDtlSummary',
					fields: [
						{
							type: 'number',
							name: 'travelDtlTotal',
							id: 'travelDtlTotal',
							title: GetLabelWithLang('BL00124', lang),
							disabled: true,
							calculation: {
								type: 'add',
								from: ['trvlDtlList*trvlAmt']
							}
						},
						{
							type: 'text',
							name: 'travelDtlRemark',
							id: 'travelDtlRemark',
							title: GetLabelWithLang('BL00140', lang),
							disabled: true
						}
					]
				},
				{
					title: GetLabelWithLang('BL00135', lang),
					id: 'trvlHotelListSection',
					layout: { column: 1, spacing: 2, size: 'medium', label: 'fixed' },
					fields: [
						{
							type: 'table',
							name: 'trvlHotelList',
							id: 'trvlHotelList',
							columns: {
								ids: ['hotelName', 'cityDisplayName', 'trvltFrom', 'trvltTo', 'billNo', 'trvlAmt', 'taxAmt', 'taxAmtTotal', 'attachmentId'],
								// titles: ['Hotel Name', 'City', 'From', 'To', 'Bill No.', 'Amount (Excluding Tax)', 'Tax Amount', 'Total (Including Tax)', 'Attachment']
								titles: GetLabelWithLang(['BL00136', 'BL00137', 'BL00127', 'BL00128', 'BL00120', 'BL00198', 'BL00138', 'BL00139', 'BL00123'], lang)
							}
						}
					]
				},
				{
					//title: 'travelDtlSummary',
					id: 'hotelDtlSummary',
					fields: [
						{
							type: 'number',
							name: 'hotelDtlTotal',
							id: 'hotelDtlTotal',
							title: GetLabelWithLang('BL00124', lang),
							disabled: true,
							calculation: {
								type: 'add',
								from: ['trvlHotelList*trvlAmt', 'trvlHotelList*taxAmt']
							}
						},
						{
							type: 'text',
							name: 'hotelDtlRemark',
							id: 'hotelDtlRemark',
							title: GetLabelWithLang('BL00140', lang),
							disabled: true
						}
					]
				},
				{
					title: GetLabelWithLang('BL00141', lang),
					id: 'trvlFoodListSection',
					layout: { column: 1, spacing: 2, size: 'medium', label: 'fixed' },
					fields: [
						{
							type: 'table',
							name: 'trvlFoodList',
							id: 'trvlFoodList',
							columns: {
								ids: ['restaurantName', 'cityDisplayName', 'fhdDate', 'invoiceNo', 'foodAmt', 'attachmentId'],
								// titles: ['Restaurant Name', 'City', 'Date', 'Invoice No.', 'Amount', 'Attachment']
								titles: GetLabelWithLang(['BL00142', 'BL00137', 'BL00143', 'BL00199', 'BL00122', 'BL00123'], lang)
							}
						}
					]
				},
				{
					//title: 'travelDtlSummary',
					id: 'foodDtlSummary',
					fields: [
						{
							type: 'number',
							name: 'foodDtlTotal',
							id: 'foodDtlTotal',
							title: GetLabelWithLang('BL00124', lang),
							disabled: true,
							calculation: {
								type: 'add',
								from: ['trvlFoodList*foodAmt']
							}
						},
						{
							type: 'text',
							name: 'foodDtlRemark',
							id: 'foodDtlRemark',
							title: GetLabelWithLang('BL00140', lang),
							disabled: true
						}
					]
				},
				{
					title: GetLabelWithLang('BL00144', lang),
					id: 'trvlOthBillListSection',
					layout: { column: 1, spacing: 2, size: 'medium', label: 'fixed' },
					fields: [
						{
							type: 'table',
							name: 'trvlOthBillList',
							id: 'trvlOthBillList',
							columns: {
								ids: ['othBillTypeName', 'billDesc', 'othBillAmt', 'attachmentId'],
								titles: GetLabelWithLang(['BL00318', 'BL00149', 'BL00150', 'BL00123'], lang)
							}
						}
					]
				},
				{
					//title: 'travelDtlSummary',
					id: 'otherDtlSummary',
					fields: [
						{
							type: 'number',
							name: 'otherDtlTotal',
							id: 'otherDtlTotal',
							title: GetLabelWithLang('BL00124', lang),
							disabled: true,
							calculation: {
								type: 'add',
								from: ['trvlOthBillList*othBillAmt']
							}
						},
						{
							type: 'text',
							name: 'otherDtlRemark',
							id: 'otherDtlRemark',
							title: GetLabelWithLang('BL00140', lang),
							disabled: true
						}
					]
				}
			]
		};
	}

	function updateAttachment(objList) {
		//console.log("objList",objList);
		return Promise.all(
			objList.map(async product => {

				if ('modeOfTravelCode' in product && _.isArray(masterData.mots)) {
					let modData = masterData.mots.filter(obj => obj.value === product.modeOfTravelCode);
					//console.log("modData",modData);
					if (_.isArray(modData) && modData.length > 0) {
						product.modeOfTravelName = modData[0].title;
					}
				}

				if ('cityCode' in product && _.isArray(masterData.cities)) {
					let cityData = masterData.cities.filter(obj => obj.value === product.cityCode);
					//console.log("modData",modData);
					if (_.isArray(cityData) && cityData.length > 0) {
						product.cityName = cityData[0].title;
					}
				}

				if ('othBillTypeCode' in product && _.isArray(masterData.billTypes)) {
					let billTypeData = masterData.billTypes.filter(obj => obj.value === product.othBillTypeCode);
					//console.log("modData",modData);
					if (_.isArray(billTypeData) && billTypeData.length > 0) {
						product.othBillTypeName = billTypeData[0].title;
					}
				}

				let fileURL = product.attachmentId;
				if (product.attachmentFile && product.attachmentFile.length > 0) {
					let fileObj = product.attachmentFile[0];
					let fileData = await uploadDoc.saveDoc(fileObj, "travelClaim");
					//console.log("fileData",fileData);
					if (_.isArray(fileData) && fileData.length > 0) {
						fileURL = fileData[0].fileUrl;
					}
				}
				product.attachmentId = fileURL;
				return product;
			})
		);
	}
	async function onSubmit(values) {
		console.log("disable", disable);
		if (disable) {
			return;
		}
		setDisable(true);
		console.log(values);
		let trvlDtlList = await updateAttachment(values.data.trvlDtlList);
		let trvlHotelList = await updateAttachment(values.data.trvlHotelList);
		let trvlFoodList = await updateAttachment(values.data.trvlFoodList);
		let trvlOthBillList = await updateAttachment(values.data.trvlOthBillList);

		//console.log("trvlDtlList",trvlDtlList);
		if (values.button.toUpperCase() === "SAVE") {
			let lrData = {};
			//lrData = data;

			lrData.fromDate = values.data.fromDate;
			lrData.toDate = values.data.toDate;
			lrData.claimedTotalAmt = values.data.claimedTotalAmt;
			lrData.travelPurpose = values.data.travelPurpose;


			lrData.outcome = "SAVE";
			lrData.trvlDtlList = trvlDtlList;
			lrData.travelDtlRemark = values.data.travelDtlRemark;

			lrData.trvlHotelList = trvlHotelList;
			lrData.hotelDtlRemark = values.data.hotelDtlRemark;

			lrData.trvlFoodList = trvlFoodList;
			lrData.foodDtlRemark = values.data.foodDtlRemark;

			lrData.trvlOthBillList = trvlOthBillList;
			lrData.otherDtlRemark = values.data.otherDtlRemark;

			if (travelClaim !== null) {
				lrData.id = travelClaim.id;
			}

			console.log("data", lrData);
			dispatch(saveTravelClaim(lrData));
			setLoading(true);
		}
		if (values.button.toUpperCase() === "SUBMIT") {
			let lrData = {};
			//lrData = data;
			lrData.outcome = "SUBMIT";
			lrData.fromDate = values.data.fromDate;
			lrData.toDate = values.data.toDate;
			lrData.claimedTotalAmt = values.data.claimedTotalAmt;
			lrData.travelPurpose = values.data.travelPurpose;

			lrData.trvlDtlList = trvlDtlList;
			lrData.travelDtlRemark = values.data.travelDtlRemark;

			lrData.trvlHotelList = trvlHotelList;
			lrData.hotelDtlRemark = values.data.hotelDtlRemark;

			lrData.trvlFoodList = trvlFoodList;
			lrData.foodDtlRemark = values.data.foodDtlRemark;

			lrData.trvlOthBillList = trvlOthBillList;
			lrData.otherDtlRemark = values.data.otherDtlRemark;

			if (travelClaim !== null) {
				lrData.id = travelClaim.id;
			}
			console.log("data", lrData);
			dispatch(saveTravelClaim(lrData));
			setLoading(true);
		}
	}

	function onCancel() {
		//console.log(values);
		props.history.push("/app/employee-service/travel-claim");
	}

	// if ((!travelClaim || (travelClaim && routeParams.travelClaimId !== travelClaim.id)) && routeParams.travelClaimId !== 'new') {
	// 	return <FuseLoading />;
	// }

	return (
		(loading || (travelClaim && travelClaim.id && routeParams.travelClaimId.toString() !== travelClaim.id.toString())) ?
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
										to="/app/employee-service/travel-claim"
										color="inherit"
									>
										<Icon className="text-20">
											{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
										</Icon>
										<span className="mx-4"><Label labelId="BL00025" /></span>
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
												{travelClaim && travelClaim.id !== null ? <Label labelId="BL00178" /> : <Label labelId="BL00179" />}
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
										{travelClaim && travelClaim.id !== null && claimHistorys && _.isArray(claimHistorys) ? <History data={claimHistorys} /> : ""}
									</Typography>
								</FuseAnimate>
							</div>

						</div>
					)
				}
				content={

					<div className="p-16 sm:p-24">
						{travelClaimId == "new" && (
							<SmartForm
								//defaultValues={travelClaim}
								template={template}
								//watchFields={['']}
								// validate={validate}
								onSubmit={onSubmit}
								onCancel={onCancel}
								//onChange={data => handleDataChange(data)}
								buttons={travelClaim && travelClaim.outcome && travelClaim.outcome.toUpperCase() === "SUBMIT" ? ['cancel'] : ['save', 'submit', 'cancel']}
							/>
						)}
						{travelClaimId !== "new" && travelClaim && travelClaim.id && (
							<SmartForm
								defaultValues={travelClaim}
								template={template}
								//watchFields={['']}
								// validate={validate}
								onSubmit={onSubmit}
								onCancel={onCancel}
								//onChange={data => handleDataChange(data)}
								buttons={travelClaim && travelClaim.outcome && travelClaim.outcome.toUpperCase() === "SUBMIT" && travelClaim.statusName.toUpperCase() !== "Returned".toUpperCase() ? ['cancel'] : ['save', 'submit', 'cancel']}
							/>
						)}
					</div>
				}
			//innerScroll
			/>
	);
}

export default withReducer('travelClaim', reducer)(ClaimRequest);
