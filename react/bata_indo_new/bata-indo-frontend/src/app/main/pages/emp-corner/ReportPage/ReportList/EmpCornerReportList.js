import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '@components/EmpCorner/store';
import EmpCornerReportListHeader from './EmpCornerReportListHeader'
import EmpCornerReportContent from './EmpCornerReportListTable';


function List() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<EmpCornerReportListHeader />}
			content={<EmpCornerReportContent />}

		// innerScroll
		/>
	);
}

export default withReducer('empCorner', reducer)(List);
