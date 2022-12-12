import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../store';
import QuickLinkListHeader from './QuickLinkListHeader'
import QuickLinkListTable from './QuickLinkListTable';


function AnnouncementList() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<QuickLinkListHeader />}
			content={<QuickLinkListTable />}

			innerScroll
		/>
	);
}

export default AnnouncementList;
