import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import LocalConveyanceCashierHeader from './LocalConveyanceCashierHeader';
import LocalConveyanceCashierTable from './LocalConveyanceCashierTable';


function LocalConveyanceCashier() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<LocalConveyanceCashierHeader />}
			content={<LocalConveyanceCashierTable />}
		//innerScroll
		/>
	);
}

export default withReducer('localConveyance', reducer)(LocalConveyanceCashier);
