import FuseAnimate from '@core/core/Animate';
import FusePageSimple from '@core/core/PageSimple';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import FormData from 'form-data';
import AboutTab from './tabs/AboutTab';
import PhotosVideosTab from './tabs/PhotosVideosTab';
import TimelineTab from './tabs/TimelineTab';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AlarmIcon from '@material-ui/icons/Alarm';
import SmartForm from '@smart-form';
import axios from 'axios';
import api from '@api';
import History from '@components/History';
import TabPanel from '@components/TabPanel';
import Header from './SampleHeader';

const useStyles = makeStyles(theme => ({
	layoutHeader: {
		height: 320,
		minHeight: 320,
		[theme.breakpoints.down('md')]: {
			height: 240,
			minHeight: 240
		}
	},	
	firstIcon: {
		paddingLeft: 70
	  }
}));

function ProfilePage() {
	const classes = useStyles();
	

	

	const sampleTabs = [
		{name: 'New Claim', icon: (<AddCircleOutlineIcon />), children: (<div>New Claim</div>)},
		{name: 'Approved Claims', icon: (<CheckCircleOutlineIcon />), children: (<div>Approved Claims</div>)},
		{name: 'Pending for Approval', icon: (<AlarmIcon />), children: (<div> Claims Pending for Approvals</div>)}
	]
	return (
		<TabPanel
			tabs={sampleTabs}
			header={
				<Header />
			}
		/>
	);
}



export default ProfilePage;
