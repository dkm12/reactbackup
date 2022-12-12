import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import LeaveRequestHeader from './LeaveRequestHeader';
import LeaveRequestTable from './LeaveRequestTable';


function LeaveRequest() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<LeaveRequestHeader />}
			content={<LeaveRequestTable />}
			//innerScroll
		/>
	);
}

export default withReducer('leaveRequest', reducer)(LeaveRequest);
