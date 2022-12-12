import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import TrainingCategoryListHeader from './TrainingCategoryListHeader';
import TrainingCategoryListTable from './TrainingCategoryListTable';


function TrainingCategory() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<TrainingCategoryListHeader />}
			content={<TrainingCategoryListTable />}
		// innerScroll
		/>
	);
}

export default TrainingCategory;