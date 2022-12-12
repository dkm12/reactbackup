import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import LocalConveyanceHeader from './LocalConveyanceHeader';
import LocalConveyanceTable from './LocalConveyanceTable';


function LocalConveyance() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'sm:px-24'
			}}
			header={<LocalConveyanceHeader />}
			content={<LocalConveyanceTable />}
		//innerScroll
		/>
	);
}

export default withReducer('localConveyance', reducer)(LocalConveyance);
