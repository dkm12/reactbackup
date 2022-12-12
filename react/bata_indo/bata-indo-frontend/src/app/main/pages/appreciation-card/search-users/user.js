import FusePageSimple from '@core/core/PageSimple';
import React from 'react';
import FolderHeader from './header';
import UserListingTable from './userTable';

function createPage() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			// header={<GalleryHeader  head= 'Gallery/Videos' headIcon= 'video_library'/>}
            header={<FolderHeader />}
            content={<UserListingTable />}
            // innerScroll
		/>
	);
}

export default createPage;