import FusePageSimple from '@core/core/PageSimple';
import React from 'react';
import TabPanel from '@components/TabPanel';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import MyAppHeader from './header';
import MyAppTable from './myApplicationTable';
import RefAppTable from './referredappTable';

const sampleTabs = [
	{
		name: 'Internal Job Application',
		icon: (<SupervisedUserCircleIcon />), 
		children: (
			<MyAppTable />
		)
	},
	{
		name: 'Referral Job Application',
		icon: (<SupervisedUserCircleIcon />), 
		children: (
			<RefAppTable />
		)
	}
];

function JobPosting() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<MyAppHeader />}
			content={
				<TabPanel
					tabs={sampleTabs}
				/>
			}
		/>
	);
}

export default JobPosting;
