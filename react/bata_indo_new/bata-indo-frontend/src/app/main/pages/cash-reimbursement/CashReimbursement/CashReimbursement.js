import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import CashReimbursementHeader from './CashReimbursementHeader';
import CashReimbursementTable from './CashReimbursementTable';


function CashReimbursement() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<CashReimbursementHeader />}
			content={<CashReimbursementTable />}
			//innerScroll
		/>
	);
}

export default withReducer('cashReimbursement', reducer)(CashReimbursement);
