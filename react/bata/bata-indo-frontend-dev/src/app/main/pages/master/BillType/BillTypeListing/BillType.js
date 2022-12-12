import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
// import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import BillTypeHeader from './BillTypeHeader';
import BillTypeTable from './BillTypeTable';


function BillTypeListConfig() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<BillTypeHeader />}
			content={<BillTypeTable />}
		// innerScroll
		/>
	);
}

export default BillTypeListConfig;