import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import TravelClaimHeader from './TravelClaimHeader';
import TravelClaimTable from './TravelClaimTable';


function TravelClaim() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<TravelClaimHeader />}
			content={<TravelClaimTable />}
			//innerScroll
		/>
	);
}

export default withReducer('travelClaim', reducer)(TravelClaim);
