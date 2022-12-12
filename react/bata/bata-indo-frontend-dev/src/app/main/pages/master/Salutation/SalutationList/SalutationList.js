import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import SalutationListHeader from './SalutationListHeader';
import SalutationListTable from './SalutationListTable';


function List() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<SalutationListHeader />}
			content={<SalutationListTable />}
		// innerScroll
		/>
	);
}

export default List;