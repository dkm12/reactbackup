import FuseAnimate from '@core/core/Animate';
import FusePageSimple from '@core/core/PageSimple';
import FuseLoading from '@core/core/Loading';
import reducer from '@components/EmpCorner/store';
import Icon from '@material-ui/core/Icon';
import GroupIcon from '@material-ui/icons/Group';
import _ from '@lodash';
import { useDeepCompareEffect } from '@core/hooks';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import uploadDoc from '@common/utils/uploadDoc';
import withReducer from 'app/store/withReducer';
import React, { useState, useEffect } from 'react';
import SmartForm from '@smart-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Label, GetLabel } from '@common/utils/label';
import { getNewEmpCorner, saveNewEmpCorner, newEmpCornerRequest } from '@components/EmpCorner/store/empCornerFormSlice'

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

function EmpCornerForm(props) {

	const dispatch = useDispatch();
	const theme = useTheme();
	const empCorner = useSelector(({ empCorner }) => empCorner.empCornerForm);
	const routeParams = useParams();
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const { topicId } = routeParams;
	const [loading, setLoading] = useState(false);
	const [disable, setDisable] = useState(false);

	useEffect(() => {
		setLoading(false);
	}, [empCorner]);

	useDeepCompareEffect(() => {
		async function updateProductState() {
			console.log("routeParams", routeParams);
			if (topicId === 'new') {
				dispatch(newEmpCornerRequest());
			} else {
				dispatch(getNewEmpCorner(topicId));
				setLoading(true);
			}
		}
		updateProductState();
		setLoading(false);
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
						name: 'topicTitle',
						id: 'topicTitle',
						title: GetLabel('BL00054'),
						disabled: false,
						maxlength: 151,
						validationProps: {
							required: 'This is a mandatory field',
							maxLength: {
								value: 150,
								message: 'Maximum 150 characters are allowed.'
							}
						}
					},

					{
						type: 'textarea',
						name: 'topicDesc',
						id: 'topicDesc',
						title: GetLabel('BL00055'),
						maxlength: 251,
						validationProps: {
							required: 'This is a mandatory field',
							maxLength: {
								value: 250,
								message: 'Maximum 250 characters are allowed.'
							}
						}
					},
					{
						type: 'file',
						name: 'attachmentFile',
						id: 'attachmentFile',
						title: 'Attachment',
					},

				]
			}

		]
	};
	async function updateAttachment(file) {
		let fileURL;
		console.log("file", file[0]);
		let fileData = await uploadDoc.saveDoc(file[0], "empCorner");
		if (_.isArray(fileData) && fileData.length > 0) {
			fileURL = fileData[0].fileUrl;
		}
		return fileURL;
	}
	async function onSubmit(values) {
		if (disable) {
			return;
		}
		setDisable(true);
		let { attachmentFile, ...rest } = values.data;
		let fileId;
		if (attachmentFile && attachmentFile.length) {
			fileId = await updateAttachment(attachmentFile);
		}
		if (empCorner && empCorner.topicId && topicId !== 'new') {
			dispatch(saveNewEmpCorner({ type: "update", data: { ...values.data, topicId: empCorner.topicId, topicAttachFileName: fileId } }));
			setLoading(true);
		} else {
			console.log('>>>>>>>>>>', { ...rest, topicAttachFileName: fileId })
			dispatch(saveNewEmpCorner({ type: "save", data: { ...rest, topicAttachFileName: fileId } }))
			setLoading(true);
		}
	}
	function onCancel() {
		props.history.push("/app/empCorner/list");
	}
	return (
		((empCorner && empCorner.topicId && routeParams.topicId.toString() !== empCorner.topicId.toString())) ?
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
										to="/app/empCorner/list"
										color="inherit"
									>
										<Icon className="text-20">
											{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
										</Icon>
										<span className="mx-4"><Label labelId="BL00030" /></span>
									</Typography>
								</FuseAnimate>

								<div className="flex items-center max-w-full">
									<FuseAnimate animation="transition.expandIn" delay={300}>
										<GroupIcon className="text-32" />
									</FuseAnimate>
									<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography className="text-16 sm:text-20 truncate">
												{topicId == 'new' ? <Label labelId="BL00154" /> : <Label labelId="BL00214" />}
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
						{topicId !== 'new' && empCorner && empCorner.topicId && (
							<SmartForm
								defaultValues={empCorner}
								template={template}
								onSubmit={onSubmit}
								onCancel={onCancel}
								// onChange={values => console.log('outvalues', values)}
								buttons={empCorner && empCorner.outcome && empCorner.outcome.toUpperCase() === "SUBMIT" ? ['cancel'] : ['submit', 'cancel']}
							/>)}

						{topicId == 'new' && (
							<SmartForm
								// defaultValues={empCorner}
								template={template}
								onSubmit={onSubmit}
								onCancel={onCancel}
								onChange={values => console.log('outvalues', values)}
								buttons={empCorner && empCorner.outcome && empCorner.outcome.toUpperCase() === "SUBMIT" ? ['cancel'] : ['submit', 'cancel']}
							/>)}
					</div>
				}
			/>
	);
}

export default withReducer('empCorner', reducer)(EmpCornerForm);
