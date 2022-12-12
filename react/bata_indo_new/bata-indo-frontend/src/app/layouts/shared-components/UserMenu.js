import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from 'app/auth/store/userSlice';
import { Label } from '@common/utils/label';
import MyProfileDial from './myProfile';
import { closeDialog, openDialog } from 'app/store/core/dialogSlice';
import { getProfile, selectProfile } from 'app/auth/store/myProfileSlice';

function UserMenu(props) {
	const dispatch = useDispatch();
	const myProfileData = useSelector(selectProfile);
	const user = useSelector(({ auth }) => auth.user);

	const [userMenu, setUserMenu] = useState(null);

	useEffect(() => {
	   dispatch(getProfile(user.uuid));
	 }, [dispatch]);
	 
	//  const myProfileData = { 'name': "Raj Ranjan", 'desig': "Jr. Software Engineer", 'dept': 'Cloud and Application', 'emailId': "raj.ranjan@velocis.co.in", 'mob': "+91-9771082642", 'location': "Raj NagarII, Palam, West Delhi" }
	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

	return (
		<>
			<Button className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6" onClick={userMenuClick}>
				<div className="hidden md:flex flex-col mx-4 items-end">
					<Typography component="span" className="normal-case flex">
						{user.data.displayName}
					</Typography>
					{/* <Typography className="text-11 capitalize" color="textSecondary">
						{user.role.toString()}
						{(!user.role || (Array.isArray(user.role) && user.role.length === 0)) && 'Guest'}
					</Typography> */}
				</div>
				<ExpandMoreIcon color="primary" fontSize="small" />
				{/* {user.data.photoURL ? (
					<Avatar className="md:mx-4" alt="user photo" src={user.data.photoURL} />
				) : (
					<Avatar className="md:mx-4">{user.data.displayName[0]}</Avatar>
				)} */}
			</Button>

			<Popover
				open={Boolean(userMenu)}
				anchorEl={userMenu}
				onClose={userMenuClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				classes={{
					paper: 'py-8'
				}}
			>
				{!user.role || user.role.length === 0 ? (
					<>
						<MenuItem component={Link} to="/login" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>lock</Icon>
							</ListItemIcon>
							<ListItemText primary="Login" />
						</MenuItem>
						<MenuItem component={Link} to="/register" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>person_add</Icon>
							</ListItemIcon>
							<ListItemText primary="Register" />
						</MenuItem>
					</>
				) : (
					<>
						<MenuItem role="button" onClick={() => {
							dispatch(openDialog({
								children: (
									(myProfileData && myProfileData[0]) && <MyProfileDial data={myProfileData[0]} />
								),
								fullWidth: true,
								maxWidth: "md"
							})); userMenuClose();
						}}>
							<ListItemIcon className="min-w-40">
								<Icon>account_circle</Icon>
							</ListItemIcon>
							<ListItemText primary={<Label labelId="BL00432" />} />
						</MenuItem>
						{/* <MenuItem component={Link} to="/apps/mail" onClick={userMenuClose} role="button">
							<ListItemIcon className="min-w-40">
								<Icon>mail</Icon>
							</ListItemIcon>
							<ListItemText primary={<Label labelId="BL00433" />} />
						</MenuItem> */}
						<MenuItem
							onClick={() => {
								dispatch(logoutUser());
								userMenuClose();
							}}
						>
							<ListItemIcon className="min-w-40">
								<Icon>exit_to_app</Icon>
							</ListItemIcon>
							<ListItemText primary={<Label labelId="BL00003" />} />
						</MenuItem>
					</>
				)}
			</Popover>
		</>
	);
}

export default UserMenu;
