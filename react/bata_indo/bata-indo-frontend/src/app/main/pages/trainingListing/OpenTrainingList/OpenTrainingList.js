import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import OpenTrainingListHeader from './OpenTrainingListHeader';
import OpenTrainingListTable from './OpenTrainingListTable';
import TabPanel from '@components/TabPanel';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import AlarmIcon from '@material-ui/icons/Alarm';

import AppliedTrainingListHeader from './AppliedTrainingListHeader';
import AppliedTrainingListTable from './AppliedTrainingListTable';
import { Label, GetLabel } from '@common/utils/label';

const sampleTabs = [
	{
		name: <Label labelId="BL00390" />,
		icon: (<AddCircleOutlineIcon />),
		children: (
			<OpenTrainingListTable />
		)
	},
	{
		name: <Label labelId="BL00391" />,
		icon: (<CheckCircleOutlineIcon />),
		children: (
			<AppliedTrainingListTable />
		)
	}
];

function OpenTrainingList() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<OpenTrainingListHeader />}
			content={
				<TabPanel
					tabs={sampleTabs}
				/>
			}
		/>
	);
}

export default withReducer('training', reducer)(OpenTrainingList);
