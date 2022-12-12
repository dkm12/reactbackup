import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import ConsentMemorandumHeader from './ConsentMemorandumHeader';
import ConsentMemorandumTable from './ConsentMemorandumTable';


function ConsentMemorandum() {
	return (
		<FusePageSimple
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64 sm:h-136 sm:min-h-100'
			}}
			header={<ConsentMemorandumHeader />}
			content={<ConsentMemorandumTable />}
		//	innerScroll
		/>
	);
}

export default withReducer('memorandum', reducer)(ConsentMemorandum);
