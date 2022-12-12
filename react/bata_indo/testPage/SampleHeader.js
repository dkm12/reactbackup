import FuseAnimate from '@core/core/Animate';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectMainTheme } from 'app/store/core/settingsSlice';

function ProductsHeader(props) {
	const dispatch = useDispatch();

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">shopping_basket</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						Sample Header
					</Typography>
				</FuseAnimate>
			</div>
			<FuseAnimate animation="transition.slideRightIn" delay={300}>
				<Button
					component={Link}
					to="/app/hr-services/leave-requests/new"
					className="whitespace-no-wrap normal-case"
					variant="contained"
					color="primary"
				>
					<span className="hidden sm:flex">New Leave Request</span>
					<span className="flex sm:hidden">New</span>
				</Button>
			</FuseAnimate>
		</div>
	);
}


export default ProductsHeader;
