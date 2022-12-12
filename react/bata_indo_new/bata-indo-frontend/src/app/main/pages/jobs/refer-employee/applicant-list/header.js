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
import { Label, GetLabel } from '@common/utils/label';
import SearchFilter from '@components/searchFilter/searchFilter'

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
				<div className="flex items-center max-w-full">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<Icon className="text-32">peopleAlt</Icon>
					</FuseAnimate>
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
							<Label labelId="BL00262" />
						</Typography>
					</FuseAnimate>
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography className="text-16 sm:text-20 truncate">
								{/* {leaveRequest && leaveRequest.id !== null ? "Edit Leave Request" : "New Leave Request"} */}
							</Typography>
						</FuseAnimate>
						<FuseAnimate animation="transition.sli2deLeftIn" delay={300}>
							<Typography variant="caption">
								{/* {leaveRequest && leaveRequest.id !== null ? "Edit Leave Request" : "New Leave Request"} */}
							</Typography>
						</FuseAnimate>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FolderHeader;