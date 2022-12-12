import React from 'react';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Label, GetLabel } from '@common/utils/label';
import FuseAnimate from '@core/core/Animate';

function TestPageHeader(){

return <>
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">shopping_basket</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						<Label labelId="BL00439" />
					</Typography>
				</FuseAnimate>
			</div>

      <FuseAnimate animation="transition.slideRightIn" delay={300}>
				<Button
					component={Link}
					to="/app/employee-service/testPage/"
					className="whitespace-no-wrap normal-case"
					variant="contained"
					color="primary"
				>
					<span className="hidden sm:flex"><Label labelId="BL00210" /></span>
					<span className="flex sm:hidden"><Label labelId="BL00068" /></span>
				</Button>
			</FuseAnimate>

</div>

</>

}


export default TestPageHeader;