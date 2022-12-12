import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../store';
import EmpCornerListHeader from './EmpCornerListHeader'
import EmpCornerListContent from './EmpCornerListContent';


function List() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<EmpCornerListHeader />}
			content={<EmpCornerListContent />}

		// innerScroll
		/>
	);
}

export default List;
