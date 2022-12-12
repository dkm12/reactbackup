import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
// import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../store';
import ApplicantsListHead from './applicantsListHead'
import ApplicantsListTable from'./applicantsListTable'



function JobPosting() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<ApplicantsListHead />}
			content={<ApplicantsListTable />}
			// innerScroll
		/>
	);
}

export default JobPosting;
