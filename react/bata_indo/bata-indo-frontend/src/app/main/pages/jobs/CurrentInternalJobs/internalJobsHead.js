import FuseAnimate from '@core/core/Animate';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { authRoles } from 'app/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectMainTheme } from 'app/store/core/settingsSlice';
// import { setLocalConveyancesSearchText } from '../store/empLocalConveyancesSlice';
import { Label, GetLabel } from '@common/utils/label';

function InternalJobsHead(props) {
	// const dispatch = useDispatch();
	// const role = useSelector(({ auth }) => auth.user.role);
	// const searchText = useSelector(({ localConveyance }) => localConveyance.empLocalConveyances.searchText);
	const mainTheme = useSelector(selectMainTheme);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">shopping_basket</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						<Label labelId="BL00295" />
					</Typography>
				</FuseAnimate>
			</div>


		</div>
	);
}


export default InternalJobsHead;
