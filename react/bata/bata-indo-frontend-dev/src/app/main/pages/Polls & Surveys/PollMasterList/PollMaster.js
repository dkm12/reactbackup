import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import PollMasterHeader from './PollMasterHeader';
import PollMasterTable from './PollMasterTable';


function PollMaster() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<PollMasterHeader />}
			content={<PollMasterTable />}
			// innerScroll
		/>
	);
}

export default withReducer('pollSurvey', reducer)(PollMaster);
