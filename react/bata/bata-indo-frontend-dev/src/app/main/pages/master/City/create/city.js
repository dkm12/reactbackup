
import FuseAnimate from '@core/core/Animate';
import FuseLoading from '@core/core/Loading';
import FusePageCarded from '@core/core/PageCarded';
import { useForm, useDeepCompareEffect } from '@core/hooks';
import FusePageSimple from '@core/core/PageSimple';
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
// import { saveTravelClaim, newTravelClaim, getTravelClaim } from '../store/empTravelClaimSlice';
// import reducer from '../store';
import SmartForm from '@smart-form';
import masterApi from '@common/utils/masterApi';
import { Label, GetLabel } from '@common/utils/label';
import { regex } from 'app/auth';

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

function City(props) {
	const dispatch = useDispatch();
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const theme = useTheme();

	const classes = useStyles(props);

	const [cityData, setCityData] = useState({});
	const routeParams = useParams();
	const { cityId } = routeParams;
	const [loading, setLoading] = useState(false);
	const [disable, setDisable] = useState(false);

	useDeepCompareEffect(() => {
		async function updateProductState() {
			console.log("cityId", cityId);
			if (cityId === 'new') {

			} else {
				let cityObj = await masterApi.getCityById(cityId);
				let obj = {
					id: cityObj.cityId,
					cityName: cityObj.cityName,
					status: cityObj.status.toLowerCase()
				};
				console.log("obj", obj);
				setCityData(obj);
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
				id: 'city',
				fields: [{
					type: 'text',
					id: 'cityName',
					name: 'cityName',
					title: GetLabel('BL00319'),
					pattern: {
						value: regex.maxSize30,
						message: 'Please enter alpha-numeric and below 30 characters'
					},
					validationProps: {
						required: 'This is a mandatory field',
					}
				}, {
					type: 'radio',
					id: 'status',
					name: 'status',
					title: GetLabel('BL00194'),
					options: [
						{ title: GetLabel('BL00314'), value: 'active' },
						{ title: GetLabel('BL00315'), value: 'inactive' }
					],
					validationProps: {
						required: 'This is a mandatory field'
					},
				}],
			}
		],
	};

	function onSubmit(values) {
		console.log(values);
		if (disable) {
			return;
		}
		setDisable(true);
		if (values.button.toUpperCase() === "SAVE") {
			let lrData = {};

			lrData.cityName = values.data.cityName;
			lrData.status = values.data.status.toUpperCase();

			console.log(lrData);

			if (cityId === "new") {
				masterApi.saveToMaster({ name: 'city', formData: lrData })
			}
			else {
				masterApi.updateToMaster({ name: 'city', id: cityId, formData: lrData })
				setLoading(true);
			}


		}

	}

	function onCancel() {
		props.history.push("/app/master/city/listing");
	}

	return (
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
									to="/app/master/city/listing"
									color="inherit"
								>
									<Icon className="text-20">
										{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
									</Icon>
									<span className="mx-4"><Label labelId="BL00313" /></span>
								</Typography>
							</FuseAnimate>

							<div className="flex items-center max-w-full">
								<FuseAnimate animation="transition.expandIn" delay={300}>
									<img
										className="w-32 sm:w-48 rounded"
										src="app/assets/images/ecommerce/product-image-placeholder.png"

									/>
								</FuseAnimate>
								<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
									{/* <FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography className="text-16 sm:text-20 truncate">
										{inputList.id === -1 ? "New Claim Request" : "Edit Claim Request"}
											</Typography>
									</FuseAnimate> */}
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
										<Typography variant="caption"><Label labelId="BL00137" /></Typography>
									</FuseAnimate>
								</div>
							</div>
						</div>
					</div>
				)
			}
			content={
				// <ClaimTable
				//     value={form}
				// />
				<div className="p-16 sm:p-24">

					{cityId == "new" && (
						<SmartForm
							//defaultValues={travelClaim}
							template={template}
							//watchFields={['']}
							// validate={validate}
							onSubmit={onSubmit}
							onCancel={onCancel}
							//onChange={data => handleDataChange(data)}
							buttons={['save', 'cancel']}
						/>
					)}
					{cityId !== "new" && cityData && cityData.id && (
						<SmartForm
							defaultValues={cityData}
							template={template}
							//watchFields={['']}
							// validate={validate}
							onSubmit={onSubmit}
							onCancel={onCancel}
							//onChange={data => handleDataChange(data)}
							buttons={['save', 'cancel']}
						/>
					)}

					{/* <SmartForm
						defaultValues={cityData}
						template={template}
						//watchFields={['']}
						// validate={validate}
						onSubmit={onSubmit}
						onCancel={onCancel}
						//onChange={data => handleDataChange(data)}
						buttons={['save', 'cancel']}
					/> */}
				</div>
			}
		// innerScroll
		/>
	);
}

export default City;
