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
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { saveMemorandum, newMemorandum, getMemorandum } from '../store/empAddMemorandumSlice';
import reducer from '../store';
import SmartForm from '@smart-form';
import masterApi from '@common/utils/masterApi';
import uploadDoc from '@common/utils/uploadDoc';
import History from '@components/History';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import dateFunc from '@common/utils/dateFunc';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Card from '@material-ui/core/Card';
import CardHeading from '@core/core/CardHeading';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { useReactToPrint } from "react-to-print";
import { Label, GetLabel } from '@common/utils/label';
import Button from '@material-ui/core/Button';

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
	},
	memoTabWrap: {
		'& table': {
			// whiteSpace: 'nowrap',
			'& thead': {
				background: '#f6f7f9',
			},
			'& tbody th': {
				verticalAlign: 'top',
			},
			'& th:last-child': {
				width: '25%',
				padding: '16px'
			},
			'& a': {
				marginBottom: '4px'
			}
		}
	},
	table: {
		'& th': {
			background: '#f6f7f9',
		}
	},
}));

function MemorandumRequest(props) {
	const dispatch = useDispatch();
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const memorandum = useSelector(({ memorandum }) => memorandum.empAddMemorandum);
	const theme = useTheme();

	const classes = useStyles(props);
	const [tabValue, setTabValue] = useState(0);
	const routeParams = useParams();
	const { memorandumId } = routeParams;

	const [masterData, setMasterData] = useState({});
	const [loading, setLoading] = useState(false);
	const [disable, setDisable] = useState(false);
	const [approverUsers, setApproverUsers] = useState([]);

	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current
	});

	useEffect(() => {
		setLoading(false);
	}, [memorandum]);

	useDeepCompareEffect(() => {
		async function updateProductState() {
			console.log("routeParams", routeParams);

			if (memorandumId === 'new') {
				//dispatch(newMemorandum({ uuid: uuid }));
			} else {
				setLoading(true);
				dispatch(getMemorandum(routeParams));

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
				layout: { column: 2, spacing: 1, size: 'medium', label: 'fixed' },
				//title: 'Personal Information',
				id: 'leaveTypeSection',
				fields: [
					{
						type: 'radio',
						name: 'mmType',
						id: 'mmType',
						title: GetLabel('BL00238'),
						disabled: memorandum && memorandum.id && memorandum.id !== null,
						options: [
							{ title: GetLabel('BL00240'), value: 'Normal' },
							{ title: GetLabel('BL00241'), value: 'Express' }
						],
						validationProps: {
							required: 'This is a mandatory field'
						},
					},
					{
						type: 'radio',
						name: 'mmClass',
						id: 'mmClass',
						title: GetLabel('BL00242'),
						disabled: memorandum && memorandum.id && memorandum.id !== null,
						options: [
							{ title: GetLabel('BL00243'), value: 'Standard' },
							{ title: GetLabel('BL00244'), value: 'Confidential' }
						],
						validationProps: {
							required: 'This is a mandatory field'
						},
					}
				]
			},
			{
				layout: { column: 1, spacing: 1, size: 'medium', label: 'fixed' },
				//title: 'Personal Information',
				id: 'memoTitle',
				fields: [
					{
						type: 'text',
						name: 'mmTitle',
						id: 'mmTitle',
						title: GetLabel('BL00054'),
						disabled: memorandum && memorandum.id && memorandum.id !== null,
						validationProps: {
							required: 'This is a mandatory field'
						}
					}
				]
			},
			{
				layout: { column: 1, spacing: 1, size: 'medium', label: 'fixed' },
				//title: 'Personal Information',
				id: 'memoDescription',
				fields: [
					{
						type: 'ckeditor',
						name: 'mmDesc',
						id: 'mmDesc',
						title: GetLabel('BL00055'),
						disabled: memorandum && memorandum.id && memorandum.id !== null,
						validationProps: {
							required: 'This is a mandatory field'
						}
					}
				]
			},
			{
				layout: { column: 1, spacing: 1, size: 'medium', label: 'fixed' },
				//title: 'Personal Information',
				id: 'memoApprovers',
				fields: [
					{
						type: 'multiSelect',
						name: 'approverListData',
						id: 'approverListData',
						title: GetLabel('BL00245'),
						options: approverUsers,
						disabled: memorandum && memorandum.id && memorandum.id !== null,
						validationProps: {
							required: 'This is a mandatory field'
						}
					}
				]
			},
			{
				//title: 'Travel Details',
				id: 'attachmentList',
				layout: { column: 1, spacing: 2, size: 'small', label: 'fixed' },
				fields: [
					{
						type: 'array',
						name: 'attList',
						id: 'attList',
						//title: 'Array',
						layout: { column: 8, spacing: 2, size: 'small', label: 'blank', type: 'table' },
						// columns: ['Attachment', 'File'],
						columns: GetLabel(['BL00134', 'BL00222']),
						subFields: [
							{
								type: 'file',
								name: 'attachmentFile',
								id: 'attachmentFile',
								title: 'Attachment',
							},
							{
								type: 'attachment',
								name: 'attachmentUrl',
								id: 'attachmentUrl',
								dynamic: {
									field: 'createdBy',
									value: uuid
								}
							}
						]
					}
				]
			},
		]
	};

	console.log("memorandum", memorandum);
	if (memorandum && 'id' in memorandum && memorandum.id === null) {
		console.log("template.sections[4]", template.sections[4]);
		template.sections[4].fields[0].columns = template.sections[4].fields[0].columns.filter(item => item !== 'File');
	}

	// if (memorandum && 'id' in memorandum && memorandum.id === null) {
	// 	template.sections[0].fields[0].columns = template.sections[0].fields[0].columns.filter(item => item !== 'File');
	// }

	if (memorandum && memorandum.id && memorandum.id !== null) {
		template = {
			layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
			//title: 'Job Application Form',
			description: 'Form for applying Job',
			sections: [
				{
					//title: 'Travel Details',
					id: 'approverHistorySection',
					layout: { column: 1, spacing: 2, size: 'medium', label: 'fixed' },
					fields: [
						{
							type: 'table',
							name: 'approverHistory',
							id: 'approverHistory',
							columns: {
								ids: ['approverName', 'status', 'date', 'remarks', 'attList'],
								titles: ['Approver Name', 'Status', 'Date', 'Remarks', 'Attachment']
							}
						}
					]
				},
			]
		};
	}

	return (
		(loading || (memorandum && memorandum.id && routeParams.memorandumId.toString() !== memorandum.id.toString())) ?
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
										to="/app/employee-service/memorandum"
										color="inherit"
									>
										<Icon className="text-20">
											{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
										</Icon>
										<span className="mx-4"><Label labelId="BL00029" /></span>
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
												<Label labelId="BL00247" />
											</Typography>
										</FuseAnimate>
										{/* <FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography variant="caption">Memorandum Request</Typography>
										</FuseAnimate> */}
									</div>
								</div>
							</div>
							<div className="flex flex-1 justify-end px-12">
								{/* <FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Typography variant="caption">
									{memorandum && memorandum.id !== null && claimHistorys && _.isArray(claimHistorys) ? <History data={claimHistorys} /> : ""}
								</Typography>
							</FuseAnimate> */}
							</div>
						</div>
					)
				}
				content={

					<div className="p-16 sm:p-24">
						<div ref={componentRef} >
							<Grid container spacing={3}>
								<Grid item xs={6}>
									Internal Memo
								</Grid>
								{/* <Grid item xs={6}>
								<Paper>xs=12</Paper>
							</Grid> */}
							</Grid>
							<br /><br />
							<Grid container spacing={3}>
								<Grid item xs={1}>
									To
								</Grid>
								<Grid item xs={1}>
									:
								</Grid>
								<Grid item xs={4}>
									{memorandum && 'approverHistory' in memorandum ? memorandum.approverHistory.map(x => x.approverName).join(", ") : ""}
								</Grid>
							</Grid>
							<Grid container spacing={3}>
								<Grid item xs={1}>
									From
								</Grid>
								<Grid item xs={1}>
									:
								</Grid>
								<Grid item xs={4}>
									{memorandum && 'fullname' in memorandum ? memorandum.fullname : ""}
								</Grid>
							</Grid>
							<Grid container spacing={3}>
								<Grid item xs={1}>
									Date
								</Grid>
								<Grid item xs={1}>
									:
								</Grid>
								<Grid item xs={4}>
									{memorandum && 'createdOn' in memorandum ? dateFunc.changeDate(memorandum.createdOn) : ""}
								</Grid>
							</Grid>
							<Grid container spacing={3}>
								<Grid item xs={1}>
									Subject
								</Grid>
								<Grid item xs={1}>
									:
								</Grid>
								<Grid item xs={4}>
									{memorandum && 'mmTitle' in memorandum ? memorandum.mmTitle : ""}
								</Grid>
							</Grid>
							<br /><br /><hr /><br />
							<Grid container spacing={3}>
								<Grid item xs={12}>

									{memorandum && 'mmDesc' in memorandum ?
										<div dangerouslySetInnerHTML={{ __html: memorandum.mmDesc }} />
										: ""}
								</Grid>
							</Grid>

							{memorandumId !== "new" && memorandum && memorandum.id && (
								<Grid className={classes.memoTabWrap}>
									<SmartForm
										defaultValues={memorandum}
										template={template}
									//watchFields={['']}
									// validate={validate}
									//onSubmit={onSubmit}
									//onCancel={onCancel}
									//onChange={data => handleDataChange(data)}
									//buttons={memorandum && memorandum.id && memorandum.id !== null  ? ['cancel'] : [ 'submit', 'cancel']}
									/>
								</Grid>
							)}

							{memorandum && memorandum.id && memorandum.consentHistory.length > 0 && (
								<>
									<Card className="w-full my-16" square>
										<CardHeading>Consent Raised</CardHeading>
										<CardContent className="flex flex-col px-16 py-8">
											{memorandum.consentHistory.map((history, index) => (
												<>
													<Grid container>
														<Grid item xs={12} md={6}>
															<Grid container className="pr-8">
																<Grid item xs={12} md={6}>
																	<Typography variant="subtitle1">
																		Consent Raised By
																	</Typography>
																	<Typography variant="subtitle2">
																		{history.consentRaisedBy}
																	</Typography>
																</Grid>
																<Grid item xs={12} md={6}>
																	<Typography variant="subtitle1">
																		Consent Raised On
																	</Typography>
																	<Typography variant="subtitle2">
																		{history.consentRaisedDate}
																	</Typography>
																</Grid>
																<Grid item xs={12}>
																	<Typography variant="subtitle1" className="mt-32">
																		Remarks
																	</Typography>
																	<Typography variant="subtitle2">
																		{history.consentRaisedQuery}
																	</Typography>
																</Grid>
															</Grid>
														</Grid>
														<Grid item xs={12} md={6}>
															<Grid container className="pl-8">
																<Grid item xs={12} md={6}>
																	<Typography variant="subtitle1">
																		Consent Raised To
																	</Typography>
																	<Typography variant="subtitle2">
																		{history.consentRaisedTo}
																	</Typography>
																</Grid>
																<Grid item xs={12} md={6}>
																	<Typography variant="subtitle1">
																		Consent Reply On
																	</Typography>
																	<Typography variant="subtitle2">
																		{history.consentReplyDate}
																	</Typography>
																</Grid>
																<Grid item xs={12}>
																	<Typography variant="subtitle1" className="mt-32">
																		Remarks
																	</Typography>
																	<Typography variant="subtitle2">
																		{history.consentReply}
																	</Typography>
																</Grid>
															</Grid>
														</Grid>
													</Grid>
													<Divider className="my-32" />
													{/* <Typography variant="h6" component="h2" className="mb-8">
											Consent Raised By
											</Typography>
											<Typography variant="body2" component="p" className="mb-8">
											{history.consentRaisedBy}
											</Typography>
											<Typography variant="body2" component="p" className="mb-8">
											{history.consentRaisedDate}
											</Typography>
											<Typography variant="body2" component="p" className="mb-16">
											{history.consentRaisedQuery}
											</Typography>
											<Typography variant="h6" component="h2" className="mb-8">
											Consent Replied By
											</Typography>
											<Typography variant="body2" component="p" className="mb-8">
											{history.consentRaisedTo}
											</Typography>
											<Typography variant="body2" component="p" className="mb-8">
											{history.consentReplyDate}
											</Typography>
											<Typography variant="body2" component="p" className="mb-16">
											{history.consentReply}
											</Typography>
											<Divider className="my-8" /> */}

												</>
											))}
										</CardContent>
									</Card>
								</>
							)}
						</div>
						<div className="flex justify-center">
							<Button variant="contained" color="primary" align="center" type="button" onClick={handlePrint}>
								{" "}
								Print{" "}
							</Button>
						</div>
					</div>

				}
			//innerScroll
			/>
	);
}

export default withReducer('memorandum', reducer)(MemorandumRequest);
