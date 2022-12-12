import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import HolidayListHeader from './HolidayListHeader';
import HolidayListTable from './HolidayListTable';


function List() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<HolidayListHeader />}
			content={<HolidayListTable />}
		// innerScroll
		/>
	);
}

export default List;