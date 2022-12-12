import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import ModeOfTravelListHeader from './ModeOfTravelListHeader';
import ModeOfTravelListTable from './ModeOfTravelListTable';


function List() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<ModeOfTravelListHeader />}
			content={<ModeOfTravelListTable />}
		// innerScroll
		/>
	);
}

export default List;