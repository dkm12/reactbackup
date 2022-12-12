import React from 'react';
import FuseAnimate from '@core/core/Animate';
import GroupIcon from '@material-ui/icons/Group';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/core/settingsSlice';

function OurValuesHeader(props) {

	const role = useSelector(({ auth }) => auth.user.role);
	const mainTheme = useSelector(selectMainTheme);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					{/* <Icon className="text-32">shopping_basket</Icon> */}
					<GroupIcon className="text-32" />
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
                        Our Organization Value
					</Typography>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default OurValuesHeader;
