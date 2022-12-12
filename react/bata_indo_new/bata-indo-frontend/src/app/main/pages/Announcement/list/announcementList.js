import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../store';
import AnnouncementListHeader from './announcementListHeader'
import AnnouncementListContent from './announcementListContent';


function AnnouncementList() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<AnnouncementListHeader />}
			content={<AnnouncementListContent />}
		// innerScroll
		/>
	);
}

export default AnnouncementList;
