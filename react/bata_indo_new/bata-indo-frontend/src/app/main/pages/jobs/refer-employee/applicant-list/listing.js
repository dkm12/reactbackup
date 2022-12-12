import FusePageSimple from '@core/core/PageSimple';
import React from 'react';
import FolderHeader from './header';
import ApplicantTable from './applicantListingTable';

function CreatePage() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			// header={<GalleryHeader  head= 'Gallery/Videos' headIcon= 'video_library'/>}
            header={<FolderHeader />}
            content={<ApplicantTable />}
            // innerScroll
		/>
	);
}

export default CreatePage;