import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import ZoneHeader from './ZoneHeader';
import ZoneListTable from './ZoneListTable';


function List() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<ZoneHeader />}
			content={<ZoneListTable />}
		// innerScroll
		/>
	);
}

export default List;