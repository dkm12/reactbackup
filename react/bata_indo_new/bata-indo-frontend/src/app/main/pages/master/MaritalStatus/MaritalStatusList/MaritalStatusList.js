import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import MaritalStatusListHeader from './MaritalStatusListHeader';
import MaritalStatusListTable from './MaritalStatusListTable';


function List() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<MaritalStatusListHeader />}
			content={<MaritalStatusListTable />}
		// innerScroll
		/>
	);
}

export default List;