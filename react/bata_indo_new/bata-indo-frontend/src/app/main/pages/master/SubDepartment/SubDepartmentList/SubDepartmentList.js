import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import SubDepartmentListHeader from './SubDepartmentListHeader';
import SubDepartmentListTable from './SubDepartmentListTable';


function List() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<SubDepartmentListHeader />}
			content={<SubDepartmentListTable />}
		// innerScroll
		/>
	);
}

export default List;