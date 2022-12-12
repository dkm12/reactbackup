import React, { useState, useEffect } from 'react';
import FuseAnimate from '@core/core/Animate';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { DropzoneDialog } from 'material-ui-dropzone'
import { ThemeProvider, createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/core/settingsSlice';
import 'react-dropzone-uploader/dist/styles.css';
import _ from '@lodash';
import { getImages, saveImages, selectImages } from '../../store/imageViewsSlice';
import { showMessage } from 'app/store/core/messageSlice';
import { Link } from 'react-router-dom';
import { Label, GetLabel } from '@common/utils/label';

const useStyles = makeStyles(theme => createStyles({
	previewChip: {
		minWidth: 160,
		maxWidth: 210
	},
	textTransform: {
		textTransform: 'none',
	}
}));

function GalleryHeader(props) {
	const [isAdmin, setIsAdmin] = React.useState(false);
	const dispatch = useDispatch();
	const classes = useStyles();
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const logUser = useSelector(({ auth }) => auth.user.role);
	async function checkAdmin() {
		(await (logUser).includes('ADMIN')) ? setIsAdmin(true) : setIsAdmin(false)
	}
	checkAdmin();

	async function fileSave(fd) {
		let submittedFile = 0;
		let failedFile = 0;
		for await (let item of fd) {
			let postData = {
				"file": item,
				"folderId": props.folderId,
				"createdBy": uuid,
				"documentType": 'image',
			}
			let fileData = await dispatch(saveImages(postData));
			// alert(fileData.data.status)
			// console.log(fileData.status)
			console.log(fileData.payload)
			if (fileData.payload == true) { submittedFile++; }
			else { failedFile++; }
			console.log("fileData", fileData);
			let getUrl = props.folderId + '/image';
			await dispatch(getImages(getUrl));
			setOpen(false);
		}
		if (submittedFile > 0) { await dispatch(showMessage({ message: submittedFile + ' files uploaded succesfully', variant: 'success' })); }
		if (failedFile > 0) { await dispatch(showMessage({ message: failedFile + ' files failed to upload', variant: 'error' })); }
	}

	const [open, setOpen] = React.useState(false);
	const mainTheme = useSelector(selectMainTheme);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full">
				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Typography
						className="normal-case flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/gallery/imgfolderpage"
						color="inherit">
						<Icon className="text-20">
							arrow_back
						</Icon>
						<span className="mx-4"><Label labelId="BL00015" />/<Label labelId="BL00016" /></span>
					</Typography>
				</FuseAnimate>
				<div className="flex items-center max-w-full">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<Icon className="text-32">photo_library</Icon>
					</FuseAnimate>
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
							<Label labelId="BL00016" />
						</Typography>
					</FuseAnimate>
				</div>
			</div>
			{/* <div className="flex flex-1 items-center justify-center px-12">
				<ThemeProvider theme={mainTheme}>
					<FuseAnimate animation="transition.slideDownIn" delay={300}>
						<Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
							<Icon color="action">search</Icon>

							<Input
								placeholder="Search"
								className="flex flex-1 mx-8"
								disableUnderline
								fullWidth
								// value={searchText}
								inputProps={{
									'aria-label': 'Search'
								}}
							// onChange={ev => dispatch(setLocalConveyancesSearchText(ev))}
							/>
						</Paper>
					</FuseAnimate>
				</ThemeProvider>
			</div> */}
			{isAdmin ? (
				<div>
					<Button variant="contained" className={classes.textTransform} color="primary" onClick={() => setOpen(true)}>
						Add Files
					</Button>
					<div>
						<DropzoneDialog
							useChipsForPreview
							previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
							previewChipProps={{ classes: { root: classes.previewChip } }}
							acceptedFiles={['.png,.jpeg,.jpg']}
							cancelButtonText={"cancel"}
							submitButtonText={"submit"}
							filesLimit={10}
							maxFileSize={5000000}
							open={open}
							onClose={() => setOpen(false)}
							onSave={fileSave}
							showPreviews={true}
							showFileNamesInPreview={true}
						/>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default GalleryHeader;