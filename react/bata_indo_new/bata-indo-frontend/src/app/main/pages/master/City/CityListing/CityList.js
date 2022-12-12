import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import CityListHeader from './CityListHeader';
import CityListTable from './CityListTable';


function CityListTableConfig() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<CityListHeader />}
			content={<CityListTable />}
		// innerScroll
		/>
	);
}

export default CityListTableConfig;