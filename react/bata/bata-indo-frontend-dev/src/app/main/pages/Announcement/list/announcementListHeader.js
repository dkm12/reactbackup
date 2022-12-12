import FuseAnimate from '@core/core/Animate';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectMainTheme } from 'app/store/core/settingsSlice';
import { Label, GetLabel } from '@common/utils/label';

function AnnouncementListHeader(props) {

	// const dispatch = useDispatch();
	const role = useSelector(({ auth }) => auth.user.role);
	// const searchText = useSelector(({ leaveRequest }) => leaveRequest.empLeaveRequests.searchText);
	const mainTheme = useSelector(selectMainTheme);

	return (

		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					{/* <Icon className="text-32">shopping_basket</Icon> */}
					<AnnouncementOutlinedIcon className="text-32" />
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						<Label labelId="BL00009" />
					</Typography>
				</FuseAnimate>
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
								// onChange={ev => dispatch(setLeaveRequestsSearchText(ev))}
							/>
						</Paper>
					</FuseAnimate>
				</ThemeProvider>
			</div> */}

			{/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
			<Button
				component={Link}
				to="/app/announcement/form/new"
				className="whitespace-no-wrap normal-case"
				variant="contained"
				color="primary"
			>
				<span className="hidden sm:flex">New Announcement</span>
				<span className="flex sm:hidden">New</span>
			</Button>
		</FuseAnimate>
			 */}


		</div>


	);
}


export default AnnouncementListHeader;
