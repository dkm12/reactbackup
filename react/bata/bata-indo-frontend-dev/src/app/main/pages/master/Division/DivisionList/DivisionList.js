import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import DivisionListHeader from './DivisionListHeader';
import DivisionListTable from './DivisionListTable';


function DivisionList() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<DivisionListHeader />}
			content={<DivisionListTable />}
		// innerScroll
		/>
	);
}

export default DivisionList;