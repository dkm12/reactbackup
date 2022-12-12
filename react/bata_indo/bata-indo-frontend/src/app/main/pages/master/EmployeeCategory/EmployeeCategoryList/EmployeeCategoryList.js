import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import EmployeeCategoryListHeader from './EmployeeCategoryListHeader';
import EmployeeCategoryListTable from './EmployeeCategoryListTable';


function EmployeeCategoryList() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<EmployeeCategoryListHeader />}
			content={<EmployeeCategoryListTable />}
		// innerScroll
		/>
	);
}

export default EmployeeCategoryList;