import FusePageCarded from '@core/core/PageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../store';
import UploadPageContent from './UploadPageContent';


function UploadPage() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64 sm:h-136 sm:min-h-100'
			}}
			content={<UploadPageContent />}
			innerScroll
		/>
	);
}

export default UploadPage;