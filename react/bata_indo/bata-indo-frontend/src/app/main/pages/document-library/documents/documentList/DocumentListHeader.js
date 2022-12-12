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
import { getDocuments, saveDocuments, selectDocuments } from '../../store/documentListsSlice';
import { showMessage } from 'app/store/core/messageSlice';
import { Link, useParams } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
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
	const theme = useTheme();
	const dispatch = useDispatch();
	const classes = useStyles();
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	async function fileSave(fd) {
		console.log("fd", fd);
		let submittedFile = 0;
		let failedFile = 0;
		for await (let item of fd) {
			let postData = {
				"file": item,
				"folderId": props.folderId,
				"documentType": item.type,
			}
			let fileData = await dispatch(saveDocuments(postData));
			// alert(fileData.data.status)
			// console.log(fileData.status)
			console.log(fileData.payload)
			if (fileData.payload == true) { submittedFile++; }
			else { failedFile++; }
			console.log("fileData", fileData);
			let folderId = props.folderId;
			await dispatch(getDocuments(folderId));
			setOpen(false);
		}
		if (submittedFile > 0) { await dispatch(showMessage({ message: submittedFile + ' files uploaded succesfully', variant: 'success' })); }
		if (failedFile > 0) { await dispatch(showMessage({ message: failedFile + ' files failed to upload', variant: 'error' })); }
	}

	const [open, setOpen] = React.useState(false);
	const mainTheme = useSelector(selectMainTheme);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">

				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Typography
						className="normal-case flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/app/document-library/document-folders"
						color="inherit"
					>
						<Icon className="text-20">
							{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
						</Icon>
						<span className="mx-4"><Label labelId="BL00018" /></span>
					</Typography>
				</FuseAnimate>

				{/* <FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">folder</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						Document Library
					</Typography>
				</FuseAnimate> */}
			</div>

			<div className="flex flex-1 items-center justify-center px-12">
				{/* <ThemeProvider theme={mainTheme}>
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
				</ThemeProvider> */}
			</div>
			<div>
				<Button variant="contained" className={classes.textTransform} color="primary" onClick={() => setOpen(true)}>
					Add Files
				</Button>
				<div>
					<DropzoneDialog
						useChipsForPreview
						previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
						previewChipProps={{ classes: { root: classes.previewChip } }}
						acceptedFiles={['image/jpeg,image/png,image/jpg,application/pdf,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx']}
						cancelButtonText={"cancel"}
						submitButtonText={"submit"}
						maxFileSize={5000000}
						open={open}
						onClose={() => setOpen(false)}
						onSave={fileSave}
						showPreviews={true}
						showFileNamesInPreview={true}
					/>
				</div>
			</div>
		</div>
	);
}

export default GalleryHeader;