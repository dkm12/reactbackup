import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
// import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../store';
import JobPostingHead from './jobPostingHead';
import JobPostingTable from './jobPostingTable';

function JobPosting() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<JobPostingHead />}
			content={<JobPostingTable />}
			// innerScroll
		/>
	);
}

export default JobPosting;
