import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import TrainingSubCategoryListHeader from './TrainingSubCategoryListHeader';
import TrainingSubCategoryListTable from './TrainingSubCategoryListTable';


function TrainingCategory() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<TrainingSubCategoryListHeader />}
			content={<TrainingSubCategoryListTable />}
		// innerScroll
		/>
	);
}

export default TrainingCategory;