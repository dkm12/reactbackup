import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import ApproveLeaveHeader from './header';
import ApproveLeaveTable from './hrLeaveTable';

function ApproveLeave() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<ApproveLeaveHeader />}
			content={<ApproveLeaveTable />}
		// innerScroll
		/>
	);
}

export default withReducer('approveLeave', reducer)(ApproveLeave);
