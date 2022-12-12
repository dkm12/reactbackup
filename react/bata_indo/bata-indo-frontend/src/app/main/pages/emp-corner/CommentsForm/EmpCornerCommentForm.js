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
import { UpdateComment, getNewEmpCorner, getCommentById } from '@components/EmpCorner/store/empCornerFormSlice'
import { Label, GetLabel } from '@common/utils/label';

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
	const { commentId, topicId } = routeParams;
	const [loading, setLoading] = useState(false);
	const [disable, setDisable] = useState(false);

	useEffect(() => {
		setLoading(false);
	}, [empCorner]);

	useDeepCompareEffect(() => {
		async function updateProductState() {
			console.log("routeParams", routeParams);
			if (commentId !== 'new') {
				dispatch(getCommentById(commentId));
				setLoading(true);
			}
		}
		updateProductState();
		setLoading(false);
	}, [dispatch, routeParams]);

	let template = {
		layout: { column: 1, spacing: 2, size: 'medium', label: 'fixed' },
		description: 'Post Comments',
		sections: [
			{
				id: 'Comments',
				fields: [{
					type: 'text',
					id: 'commentDesc',
					name: 'commentDesc',
					title: GetLabel('BL00216'),
					maxlength: 151,
					maxLength: {
						value: 150,
						message: 'Maximum 150 characters are allowed.'
					},
					validationProps: {
						required: 'This is a mandatory field'
					},
				}],
			}
		],
	};
	async function onSubmit(values) {
		console.log(values);
		if (values.button.toUpperCase() === "POST") {
			let lrData = {};
			lrData.commentDesc = values.data.commentDesc;
			lrData.topicId = topicId;
			// console.log({ commentId: commentId, lrData });
			await dispatch(UpdateComment({ commentId: commentId, comment: lrData }));
			await dispatch(getNewEmpCorner(topicId));
		}
	}
	async function onCancel() {
		await dispatch(getNewEmpCorner(topicId));
		await props.history.push("/app/empCornerReport/list");
	}
	// function onCancel() {
	// 	props.history.push("/app/empCorner/list");
	// }
	return (
		((empCorner && empCorner.commentId && routeParams.commentId.toString() !== empCorner.commentId.toString())) ?
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
								{/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
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
										<span className="mx-4">Employee Corner</span>
									</Typography>
								</FuseAnimate> */}

								<div className="flex items-center max-w-full">
									<FuseAnimate animation="transition.expandIn" delay={300}>
										<GroupIcon className="text-32" />
									</FuseAnimate>
									<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
										<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography className="text-16 sm:text-20 truncate">
												{commentId == 'new' ? 'Add' : <Label labelId="BL00065" />}  <Label labelId="BL00216" />
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
						{commentId !== 'new' && empCorner && empCorner.commentId && (
							<SmartForm
								defaultValues={empCorner}
								template={template}
								onSubmit={onSubmit}
								onCancel={onCancel}
								// onChange={values => console.log('outvalues', values)}
								buttons={empCorner && empCorner.outcome && empCorner.outcome.toUpperCase() === "POST" ? ['cancel'] : ['post', 'cancel']}
							/>)}
					</div>
				}
			/>
	);
}

export default withReducer('empCorner', reducer)(EmpCornerForm);
