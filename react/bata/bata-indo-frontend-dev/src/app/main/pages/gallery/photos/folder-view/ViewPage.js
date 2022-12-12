import FusePageSimple from '@core/core/PageSimple';
import React from 'react';
import FolderHeader from './FolderViewHeader';
import ViewPageContent from './ViewPageContent';

function ViewPage() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			// header={<GalleryHeader  head= 'Gallery/Videos' headIcon= 'video_library'/>}
            header={<FolderHeader />}
            content={<ViewPageContent />}
            // innerScroll
		/>
	);
}

export default ViewPage;