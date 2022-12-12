import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import StateListHeader from './StateListHeader';
import StateListTable from './StateListTable';


function List() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<StateListHeader />}
			content={<StateListTable />}
		// innerScroll
		/>
	);
}

export default List;