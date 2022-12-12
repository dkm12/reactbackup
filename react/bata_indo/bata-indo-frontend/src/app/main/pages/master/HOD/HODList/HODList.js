import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import HODListHeader from './HODListHeader';
import HODListTable from './HODListTable';


function HODList() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<HODListHeader />}
			content={<HODListTable />}
		// innerScroll
		/>
	);
}

export default HODList;