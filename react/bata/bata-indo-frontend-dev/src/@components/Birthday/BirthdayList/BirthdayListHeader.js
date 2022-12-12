import FuseAnimate from '@core/core/Animate';
import GroupIcon from '@material-ui/icons/Group';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/core/settingsSlice';
import { Label, GetLabel } from '@common/utils/label';

function EmpCornerListHeader(props) {

	// const dispatch = useDispatch();
	const role = useSelector(({ auth }) => auth.user.role);
	// const searchText = useSelector(({ leaveRequest }) => leaveRequest.empLeaveRequests.searchText);
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
						{<Label labelId="BL00434" />}
					</Typography>
				</FuseAnimate>
			</div>
		</div>
	);
}


export default EmpCornerListHeader;
