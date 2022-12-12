import React from 'react';
import FuseAnimate from '@core/core/Animate';
import GroupIcon from '@material-ui/icons/Group';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/core/settingsSlice';
import { Label } from '@common/utils/label';

function ManageMastersHeader(props) {

	const role = useSelector(({ auth }) => auth.user.role);
	const mainTheme = useSelector(selectMainTheme);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<img className="w-32 sm:w-48 rounded" src="app/assets/images/ecommerce/product-image-placeholder.png" />
					{/* <GroupIcon className="text-32" /> */}
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						<Label labelId="BL00048" />
					</Typography>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default ManageMastersHeader;
