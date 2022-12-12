import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import CityTypeMappigHeader from './CityTypeMappigHeader';
import CityTypeMappigTable from './CityTypeMappigTable';


function CityListTableConfig() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<CityTypeMappigHeader />}
			content={<CityTypeMappigTable />}
		// innerScroll
		/>
	);
}

export default CityListTableConfig;