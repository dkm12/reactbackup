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
import { setPollMastersSearchText } from '../store/empPollMastersSlice';
import { Label, GetLabel } from '@common/utils/label';

function ProductsHeader(props) {
	const dispatch = useDispatch();
	const searchText = useSelector(({ pollSurvey }) => pollSurvey.empPollMasters.searchText);
	const mainTheme = useSelector(selectMainTheme);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">shopping_basket</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						<Label labelId="BL00394" />
					</Typography>
				</FuseAnimate>
			</div>
			<FuseAnimate animation="transition.slideRightIn" delay={300}>
				<Button
					component={Link}
					to="/app/poll-survey/PollCreate/new/none"
					className="whitespace-no-wrap normal-case"
					variant="contained"
					color="primary"
				>
					<span className="hidden sm:flex"><Label labelId="BL00395" /></span>
					<span className="flex sm:hidden"><Label labelId="BL00068" /></span>
				</Button>
			</FuseAnimate>
		</div>
	);
}


export default ProductsHeader;
