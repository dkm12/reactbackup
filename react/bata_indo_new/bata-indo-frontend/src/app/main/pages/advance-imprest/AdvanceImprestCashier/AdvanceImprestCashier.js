import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import AdvanceImprestCashierHeader from './AdvanceImprestCashierHeader';
import AdvanceImprestCashierTable from './AdvanceImprestCashierTable';


function AdvanceImprestCashier() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<AdvanceImprestCashierHeader />}
			content={<AdvanceImprestCashierTable />}
			//innerScroll
		/>
	);
}

export default withReducer('advanceImprest', reducer)(AdvanceImprestCashier);
