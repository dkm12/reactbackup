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

function LocalModeOfTravel(props) {
	const dispatch = useDispatch();
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const theme = useTheme();

	const classes = useStyles(props);
	const [data, setData] = useState({});
	const routeParams = useParams();
	const { hldId } = routeParams;
	const [disable, setDisable] = useState(false);

	useDeepCompareEffect(() => {
		async function updateProductState() {
			console.log("hldId", hldId);
			if (hldId === 'new') {

			} else {
				let apiObj = await masterApi.getAllholidayById(hldId);
				let obj = {
					id: apiObj.hldId,
					hldName: apiObj.hldName,
					hldDate: apiObj.hldDate,
					hldYear: apiObj.hldYear,
					hldDay: apiObj.hldDay,
					status: apiObj.status.toLowerCase()
				};
				console.log("obj", obj);
				setData(obj);
			}
		}
		updateProductState();
		//setLoading(false);
	}, [dispatch, routeParams]);



	let template = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
		//title: 'Job Application Form',
		description: 'Form for applying Job',
		sections: [
			{
				id: 'localModeOfTravel',
				fields: [{
					type: 'text',
					id: 'hldName',
					name: 'hldName',
					title: GetLabel('BL00429'),
					pattern: {
						value: /[A-Za-z]{3}/,
						message: "Invalid text"
					},
					maxlength: 51,
					maxLength: {
						value: 50,
						message: 'Maximum 50 characters are allowed.'
					},
					validationProps: {
						required: 'This is a mandatory field'
					},
				},
				{
					type: 'date',
					id: 'hldDate',
					name: 'hldDate',
					title: GetLabel('BL00143'),
					validationProps: {
						required: 'This is a mandatory field'
					},
				},
				{
					type: 'number',
					id: 'hldYear',
					name: 'hldYear',
					title: GetLabel('BL00430'),
					validationProps: {
						required: 'This is a mandatory field'
					},
				},
				{
					type: 'select',
					id: 'hldDay',
					name: 'hldDay',
					title: GetLabel('BL00430'),
					options: [
						{ title: 'Monday', value: 'Monday' },
						{ title: 'Tuesday', value: 'Tuesday' },
						{ title: 'Wednesday', value: 'Wednesday' },
						{ title: 'Thursday', value: 'Thursday' },
						{ title: 'Friday', value: 'Friday' },
						{ title: 'Saturday', value: 'Saturday' },
						{ title: 'Sunday', value: 'Sunday' },
					],
					validationProps: {
						required: 'This is a mandatory field'
					},
				},
				{
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

			lrData.hldName = values.data.hldName;
			lrData.hldDate = values.data.hldDate;
			lrData.hldYear = values.data.hldYear;
			lrData.hldDay = values.data.hldDay;
			lrData.status = values.data.status.toUpperCase();

			console.log("lrData>>", lrData);

			if (hldId === "new") {
				masterApi.saveToMaster({ name: 'holiday', formData: lrData })
			}
			else {
				masterApi.updateToMaster({ name: 'holiday', id: hldId, formData: lrData })
			}

		}

	}

	function onCancel() {
		//console.log(values);
		props.history.push("/app/master/holiday/listing");
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
									to="/app/master/holiday/listing"
									color="inherit"
								>
									<Icon className="text-20">
										{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
									</Icon>
									<span className="mx-4"><Label labelId="BL00048" /></span>
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
										<Typography variant="caption"><Label labelId="BL00427" /></Typography>
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
					{hldId == "new" && (
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
					{hldId !== "new" && data && data.id && (
						<SmartForm
							defaultValues={data}
							template={template}
							//watchFields={['']}
							// validate={validate}
							onSubmit={onSubmit}
							onCancel={onCancel}
							//onChange={data => handleDataChange(data)}
							buttons={['save', 'cancel']}
						/>
					)}
				</div>
			}
		// innerScroll
		/>
	);
}

export default LocalModeOfTravel;
