import FusePageSimple from '@core/core/PageSimple';
import React from 'react';
import FolderHeader from './FolderViewHeader';
import DocumentFolderPageContent from './DocumentFolderPageContent';
import withReducer from 'app/store/withReducer';
import reducer from '../../store';

function DocumentFolderPage() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			// header={<GalleryHeader  head= 'Gallery/Videos' headIcon= 'video_library'/>}
            header={<FolderHeader />}
            content={<DocumentFolderPageContent />}
            //innerScroll
		/>
	);
}

export default withReducer('documentLibrary', reducer)(DocumentFolderPage);