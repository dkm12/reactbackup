import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import ManagePollHeader from './ManagePollHeader';
import ManagePollTable from './ManagePollTable';


function ManagePoll() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<ManagePollHeader />}
			content={<ManagePollTable />}
			innerScroll
		/>
	);
}

export default withReducer('pollSurvey', reducer)(ManagePoll);
