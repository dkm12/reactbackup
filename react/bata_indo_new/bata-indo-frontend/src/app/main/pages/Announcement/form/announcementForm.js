import FuseAnimate from '@core/core/Animate';
import FusePageSimple from '@core/core/PageSimple';
import FuseLoading from '@core/core/Loading';
import reducer from '@components/Announcement/store';
import Icon from '@material-ui/core/Icon';
import _ from '@lodash';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { useDeepCompareEffect } from '@core/hooks';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import uploadDoc from '@common/utils/uploadDoc';
import withReducer from 'app/store/withReducer';
import React, { useState } from 'react';
import FormData from 'form-data';
// import AboutTab from './tabs/AboutTab';
// import PhotosVideosTab from './tabs/PhotosVideosTab';
// import TimelineTab from './tabs/TimelineTab';
import SmartForm from '@smart-form';
import axios from 'axios';
import api from '@api';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getNewAnnouncement, saveNewAnnouncement, newAnnouncementRequest } from '@components/Announcement/store/announcementFormSlice'
import { closeMobileChatsSidebar } from 'app/main/apps/chat/store/sidebarsSlice';
// import { announcementApi } from '@components/Announcement/store/announcementApi';
import { Label, GetLabel } from '@common/utils/label';
import { regex } from 'app/auth';

const useStyles = makeStyles(theme => ({
	layoutHeader: {
		height: 320,
		minHeight: 320,
		[theme.breakpoints.down('md')]: {
			height: 240,
			minHeight: 240
		}
	}
}));

function AnnouncementForm(props) {

	const dispatch = useDispatch();

	// const ids = useSelector(({ announcement }) => announcement.announcementsList.ids);
	const theme = useTheme();
	const announcement = useSelector(({ announcement }) => announcement.announcementForm);
	// const [announcement, setAnnouncement] = useState({});
	const routeParams = useParams();
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const { anId } = routeParams;

	useDeepCompareEffect(() => {
		async function updateProductState() {
			console.log("routeParams", routeParams);
			if (anId === 'new') {
				dispatch(newAnnouncementRequest());
			} else {
				dispatch(getNewAnnouncement(anId));
			}
			// if (anId != 'new') {
			// 	let tempData = await announcementApi.getAnnouncementById(anId);
			// 	await setAnnouncement(tempData);
			// }
		}
		updateProductState();
	}, [dispatch, routeParams]);

	let template = {
		layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed', type: 'grid' },
		sections: [
			{
				layout: { column: 2, spacing: 2, size: 'medium', label: 'fixed' },
				id: "form",
				fields: [
					{
						type: 'text',
						name: 'annTitle',
						id: 'annTitle',
						title: GetLabel('BL00054'),
						disabled: false,
						pattern: {
							value: regex.maxSize30,
							message: 'Please enter alpha-numeric and below 30 characters'
						},
						validationProps: {
							required: 'This is a mandatory field',
						}
					},

					{
						type: 'textarea',
						name: 'annDesc',
						id: 'annDesc',
						title: GetLabel('BL00055'),
						pattern: {
							value: regex.maxSize150,
							message: 'Please enter alpha-numeric and below 150 characters'
						},
						validationProps: {
							required: 'This is a mandatory field',
						}
					},
					{
						type: 'date',
						name: 'annPublishTillDate',
						id: 'annPublishTillDate',
						title: GetLabel('BL00057'),
						min: 'today',
						validationProps: {
							required: 'This is a mandatory field',
							manual: [
								{
									condition: `annPublishTillDate >= today`,
									message: "Publish Till should be greater than or equal to today's date."
								}
							]
						}
					},
					{
						type: "section",
						title: "Attachment",
						layout: { column: 3, spacing: 2, size: 'medium', label: 'fixed' },
						fields: [
							{
								type: 'file',
								accept: '.jpg,.jpeg,.png',
								name: 'attachmentFile',
								id: 'attachmentFile',
								validationProps: {
									size: {
										value: 1,
										message: 'File size should not be more than 1mb.'
									},
								},
								title: GetLabel('BL00123'),

							},
							{
								type: 'attachment',
								name: 'annAttachId',
								id: 'annAttachId',
								dynamic: {
									field: 'createdBy',
									value: uuid
								}
							},]

					}

				],

			},


		]
	};
	// console.log("template.sections[1].fields[0]", template.sections[0].fields[3])
	// if (announcement && 'anId' in announcement && announcement.annId === null) {
	// 	template.sections[0].fields[0].columns = template.sections[0].fields[0].columns.filter(item => item !== 'File');
	// 	delete template.sections[0].fields[3];
	// }

	async function updateAttachment(file) {
		let fileURL;
		console.log("file", file[0]);
		let fileData = await uploadDoc.saveDoc(file[0], "announcement");
		if (_.isArray(fileData) && fileData.length > 0) {
			fileURL = fileData[0].fileUrl;
		}
		return fileURL;
	}


	async function onSubmit(values) {
		let { attachmentFile, ...rest } = values.data;
		// let fileId;

		// if (attachmentFile && attachmentFile.length) {
		// 	fileId = await updateAttachment(attachmentFile);
		// }

		let fileURL = values.data.annAttachId;
		if (values.data && values.data.attachmentFile && values.data.attachmentFile.length > 0) {
			let fileObj = values.data.attachmentFile[0];
			let fileData = await uploadDoc.saveDoc(fileObj, "announcement");
			console.log("fileData", fileData);
			if (_.isArray(fileData) && fileData.length > 0) {
				fileURL = fileData[0].fileUrl;
			}
		}
		//lrData.leaveCategory = values.data.leaveCategory;
		//lrData.attachment = fileURL;

		if (announcement && announcement.annId && anId !== null) {
			if (values.button == "update") {
				dispatch(saveNewAnnouncement({ type: "update", data: { ...values.data, annId: anId, annAttachId: fileURL } }));
			}
			else if (values.button == "publish") {
				console.log("AnnId", anId);
				dispatch(saveNewAnnouncement({ type: "publish", data: { ...values.data, annId: anId, annAttachId: fileURL } }));
			}
		}
		else {
			await dispatch(saveNewAnnouncement({ type: "save", data: { ...rest, annAttachId: fileURL } }))
		}



	}

	function onCancel() {

		props.history.push("/app/announcement/adminList/adminList");
	}


	return (
		((announcement && announcement.id && routeParams.anId.toString() !== announcement.id.toString())) ?
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
										to="/app/announcement/adminList/adminList"
										color="inherit"
									>
										<Icon className="text-20">
											{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
										</Icon>
										<span className="mx-4"><Label labelId="BL00009" /></span>
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
												{/* {leaveRequest && leaveRequest.id !== null ? "Edit Leave Request" : "New Leave Request"} */}
												{anId == 'new' ? <Label labelId="BL00068" /> : <Label labelId="BL00065" />} <Label labelId="BL00009" />
											</Typography>
										</FuseAnimate>
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography variant="caption">

												{/* {leaveRequest && leaveRequest.id !== null ? "Edit Leave Request" : "New Leave Request"} */}

											</Typography>
										</FuseAnimate>
									</div>
								</div>
							</div>

						</div>
					)
				}
				content={
					<div className="p-16 sm:p-24">
						{anId !== 'new' && announcement && announcement.annId && announcement.annId == anId &&
							<SmartForm
								defaultValues={announcement}
								template={template}
								watchFields={['firstname', 'include_portfolio', 'email', 'country']}
								validate={validate}
								onSubmit={onSubmit}
								onCancel={onCancel}
								onChange={values => console.log('outvalues', values)}
								buttons={announcement && announcement.outcome && announcement.outcome.toUpperCase() === "SUBMIT" ? ['cancel'] : ['update', 'publish', 'cancel']}
							/>}

						{anId == 'new' && announcement && announcement && <SmartForm
							// defaultValues={announcement}
							template={template}
							watchFields={['firstname', 'include_portfolio', 'email', 'country']}
							validate={validate}
							onSubmit={onSubmit}
							onCancel={onCancel}
							onChange={values => console.log('outvalues', values)}
							buttons={announcement && announcement.outcome && announcement.outcome.toUpperCase() === "SUBMIT" ? ['cancel'] : ['save', 'cancel']}
						/>}

					</div>
				}
			/>

	);
}

function validate(watchValues, errorMethods) {
	let { errors, setError, clearErrors } = errorMethods;

	// Firstname validation
	if (watchValues && watchValues['firstname'] === 'Admin') {
		console.log(`watchValues`, watchValues)
		if (!errors['firstname']) {
			setError('firstname', {
				type: 'manual',
				message: 'You cannot use this first name'
			})
		}
	} else {
		if (errors && errors['firstname'] && errors['firstname']['type'] === 'manual') {
			clearErrors('firstname');
		}
	}
}


export default withReducer('announcement', reducer)(AnnouncementForm);
