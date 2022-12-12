import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import ApproveMemorandumHeader from './ApproveMemorandumHeader';
import ApproveMemorandumTable from './ApproveMemorandumTable';


function ApproveMemorandum() {
	return (
		<FusePageSimple
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64 sm:h-136 sm:min-h-100'
			}}
			header={<ApproveMemorandumHeader />}
			content={<ApproveMemorandumTable />}
		//	innerScroll
		/>
	);
}

export default withReducer('memorandum', reducer)(ApproveMemorandum);
