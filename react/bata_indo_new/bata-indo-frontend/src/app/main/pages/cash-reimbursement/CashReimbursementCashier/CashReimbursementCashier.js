import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import CashReimbursementCashierHeader from './CashReimbursementCashierHeader';
import CashReimbursementCashierTable from './CashReimbursementCashierTable';


function CashReimbursementCashier() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<CashReimbursementCashierHeader />}
			content={<CashReimbursementCashierTable />}
			//innerScroll
		/>
	);
}

export default withReducer('cashReimbursement', reducer)(CashReimbursementCashier);
