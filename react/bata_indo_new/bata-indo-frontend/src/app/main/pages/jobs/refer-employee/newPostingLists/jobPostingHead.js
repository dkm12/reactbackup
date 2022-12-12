import FuseAnimate from '@core/core/Animate';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectMainTheme } from 'app/store/core/settingsSlice';
import { Label, GetLabel } from '@common/utils/label';
import { getRefJobsList } from '../../store/refEmpNewPostingsSlice'

function JobPostingHead(props) {
	const dispatch = useDispatch();
	const role = useSelector(({ auth }) => auth.user.role);
    // const [filter, setfilter] = useState({});
	const mainTheme = useSelector(selectMainTheme);

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex items-center">
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Icon className="text-32">shoppingBasket</Icon>
				</FuseAnimate>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
						<Label labelId="BL00256" />
					</Typography>
				</FuseAnimate>
			</div>
			{role.includes("TALENT-HR") &&
				<FuseAnimate animation="transition.slideRightIn" delay={300}>
					<Button
						component={Link}
						to="/app/jobs/refer-emp/ref-job-entry/new"
						className="whitespace-no-wrap normal-case"
						variant="contained"
						color="primary"
					>
						<span className="hidden sm:flex"><Label labelId="BL00287" /></span>
					</Button>
				</FuseAnimate>
			}
		</div>
	);
}

export default JobPostingHead;
