import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
// import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../store';
import TrainingHead from './TrainingHead';
import TrainingTable from './TrainingTable';



function Training() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<TrainingHead />}
			content={<TrainingTable />}
			//innerScroll
		/>
	);
}

export default Training;
