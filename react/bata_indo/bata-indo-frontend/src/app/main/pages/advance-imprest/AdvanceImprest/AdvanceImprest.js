import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import AdvanceImprestHeader from './AdvanceImprestHeader';
import AdvanceImprestTable from './AdvanceImprestTable';


function AdvanceImprest() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<AdvanceImprestHeader />}
			content={<AdvanceImprestTable />}
			//innerScroll
		/>
	);
}

export default withReducer('advanceImprest', reducer)(AdvanceImprest);
