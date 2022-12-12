import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import TravelModeEligibilityHeader from './TravelModeEligibilityHeader';
import TravelModeEligibilityListTable from './TravelModeEligibilityListTable';


function List() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<TravelModeEligibilityHeader />}
			content={<TravelModeEligibilityListTable />}
		// innerScroll
		/>
	);
}

export default List;