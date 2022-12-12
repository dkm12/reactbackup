import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
// import reducer from '../../store';
import OrganizationalHeader from './OrganizationalHeader';
import OrganizationalListTable from './OrganizationalListTable';


function List() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<OrganizationalHeader />}
			content={<OrganizationalListTable />}
		// innerScroll
		/>
	);
}

export default List;