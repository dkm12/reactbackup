import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../store';
import BannerListHeader from './BannerListHeader'
import BannerListContent from './BannerListTable';


function AnnouncementList() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<BannerListHeader />}
			content={<BannerListContent />}

			innerScroll
		/>
	);
}

export default AnnouncementList;
