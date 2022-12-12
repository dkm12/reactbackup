import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import MemorandumListingHeader from './MemorandumListingHeader';
import MemorandumListingTable from './MemorandumListingTable';


function MemorandumListing() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<MemorandumListingHeader />}
			content={<MemorandumListingTable />}
			//innerScroll
		/>
	);
}

export default withReducer('memorandum', reducer)(MemorandumListing);
