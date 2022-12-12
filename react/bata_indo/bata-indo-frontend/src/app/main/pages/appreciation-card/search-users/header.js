import FuseAnimate from '@core/core/Animate';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Label, GetLabel } from '@common/utils/label';

function FolderHeader(props) {
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full">
				<div className="flex items-center max-w-full">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<Icon className="text-32">peopleAlt</Icon>
					</FuseAnimate>
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
							<Label labelId="BL00228" />
						</Typography>
					</FuseAnimate>
				</div>
			</div>
		</div>
	);
}

export default FolderHeader;