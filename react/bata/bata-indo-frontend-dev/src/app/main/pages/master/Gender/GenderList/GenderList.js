import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import GenderListHeader from './GenderListHeader';
import GenderListTable from './GenderListTable';


function GenderList() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<GenderListHeader />}
			content={<GenderListTable />}
		// innerScroll
		/>
	);
}

export default GenderList;