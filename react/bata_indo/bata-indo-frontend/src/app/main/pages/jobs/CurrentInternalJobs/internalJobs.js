import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
// import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../store';
import InternalJobsHead from './internalJobsHead';
import InternalJobsTable from './internalJobsTable';

function InternalJobs() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<InternalJobsHead />}
			content={<InternalJobsTable />}
			// innerScroll
		/>
	);
}

export default InternalJobs;
