import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import LocalModeOfTravelListHeader from './LocalModeOfTravelListHeader';
import LocalModeOfTravelListTable from './LocalModeOfTravelListTable';


function List() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<LocalModeOfTravelListHeader />}
			content={<LocalModeOfTravelListTable />}
			innerScroll
		/>
	);
}

export default List;