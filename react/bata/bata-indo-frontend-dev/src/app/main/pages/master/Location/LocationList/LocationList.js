import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import LocationListHeader from './LocationListHeader';
import LocationListTable from './LocationListTable';


function List() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<LocationListHeader />}
			content={<LocationListTable />}
		// innerScroll
		/>
	);
}

export default List;