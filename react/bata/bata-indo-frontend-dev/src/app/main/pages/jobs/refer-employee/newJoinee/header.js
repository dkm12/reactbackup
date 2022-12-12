import FuseAnimate from '@core/core/Animate';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectMainTheme } from 'app/store/core/settingsSlice';
// import { setLocalConveyancesSearchText } from '../store/empLocalConveyancesSlice';

const useStyles = makeStyles(theme => ({
	layoutHeader: {
		height: 320,
		minHeight: 320,
		[theme.breakpoints.down('md')]: {
			height: 240,
			minHeight: 240
		}
	}
}));

function FolderHeader(props) {
	const dispatch = useDispatch();
	const theme = useTheme();
	const searchText = useSelector(({ localConveyance }) => localConveyance.empLocalConveyances.searchText);
	const mainTheme = useSelector(selectMainTheme);
	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full">
				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Typography
						className="normal-case flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/app/jobs/refer-emp/refapplicants"
						color="inherit">
						<Icon className="text-20">
							arrow_back
						</Icon>
						<span className="mx-4">Referral Applicants</span>
					</Typography>
				</FuseAnimate>
				<div className="flex items-center max-w-full">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<Icon className="text-32">shoppingBasket</Icon>
					</FuseAnimate>
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography className="text-16 sm:text-20 truncate">
								Referral Joinee Form
							</Typography>
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography variant="caption">
								New Joinee
							</Typography>
						</FuseAnimate>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FolderHeader;