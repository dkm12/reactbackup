import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import DepartmentListHeader from './DepartmentListHeader';
import DepartmentListTable from './DepartmentListTable';


function DepartmentList() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<DepartmentListHeader />}
			content={<DepartmentListTable />}
		// innerScroll
		/>
	);
}

export default DepartmentList;