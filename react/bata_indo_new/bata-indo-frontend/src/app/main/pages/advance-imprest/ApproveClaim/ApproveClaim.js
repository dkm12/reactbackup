import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import ApproveClaimHeader from './ApproveClaimHeader';
import ApproveClaimTable from './ApproveClaimTable';


function ApproveClaim() {
	return (
		<FusePageSimple
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64 sm:h-136 sm:min-h-100'
			}}
			header={<ApproveClaimHeader />}
			content={<ApproveClaimTable />}
			//innerScroll
		/>
	);
}

export default withReducer('advanceImprest', reducer)(ApproveClaim);
