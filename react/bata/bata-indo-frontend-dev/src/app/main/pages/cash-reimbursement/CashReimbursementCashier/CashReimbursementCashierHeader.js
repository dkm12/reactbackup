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
import { setCashReimbursementCashiersSearchText } from '../store/empCashReimbursementCashiersSlice';
import { Label, GetLabel } from '@common/utils/label';

function ProductsHeader(props) {
	const dispatch = useDispatch();
	const searchText = useSelector(({ cashReimbursement }) => cashReimbursement.empCashReimbursementCashiers.searchText);
	const mainTheme = useSelector(selectMainTheme);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">shopping_basket</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						<Label labelId="BL00026" />
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
								value={searchText}
								inputProps={{
									'aria-label': 'Search'
								}}
								onChange={ev => dispatch(setCashReimbursementCashiersSearchText(ev))}
							/>
						</Paper>
					</FuseAnimate>
				</ThemeProvider>
			</div> */}
			{/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
				<Button
					component={Link}
					to="/app/cashier-requests/cash-reimbursement/new"
					className="whitespace-no-wrap normal-case"
					variant="contained"
					color="primary"
				>
					<span className="hidden sm:flex">New Cash Reimbursement</span>
					<span className="flex sm:hidden">New</span>
				</Button>
			</FuseAnimate> */}
		</div>
	);
}


export default ProductsHeader;
