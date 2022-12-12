import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import TravelClaimCashierHeader from './TravelClaimCashierHeader';
import TravelClaimCashierTable from './TravelClaimCashierTable';


function TravelClaimCashier() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<TravelClaimCashierHeader />}
			content={<TravelClaimCashierTable />}
		//	innerScroll
		/>
	);
}

export default withReducer('travelClaim', reducer)(TravelClaimCashier);
