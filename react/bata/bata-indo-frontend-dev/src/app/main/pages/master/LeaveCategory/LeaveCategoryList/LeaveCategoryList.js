import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import LeaveCategoryListHeader from './LeaveCategoryListHeader';
import LeaveCategoryListTable from './LeaveCategoryListTable';


function List() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<LeaveCategoryListHeader />}
			content={<LeaveCategoryListTable />}
		// innerScroll
		/>
	);
}

export default List;