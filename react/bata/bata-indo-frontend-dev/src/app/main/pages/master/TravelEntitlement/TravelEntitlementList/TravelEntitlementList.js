import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import TravelEntitlementListHeader from './TravelEntitlementListHeader';
import TravelEntitlementListTable from './TravelEntitlementListTable';


function List() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<TravelEntitlementListHeader />}
			content={<TravelEntitlementListTable />}
		// innerScroll
		/>
	);
}

export default List;