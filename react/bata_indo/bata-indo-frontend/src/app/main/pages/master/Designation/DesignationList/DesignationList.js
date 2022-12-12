import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import DesignationListHeader from './DesignationListHeader';
import DesignationListTable from './DesignationListTable';


function DesignationList() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<DesignationListHeader />}
			content={<DesignationListTable />}
		// innerScroll
		/>
	);
}

export default DesignationList;