import React from 'react';
import FusePageSimple from '@core/core/PageSimple';
import ManageMasters from '@components/ManageMasters/ManageMasters';
import ManageMastersHeader from './ManageMastersHeader';

function ManageMastersPage() {
    return (
        <FusePageSimple
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64 sm:h-136 sm:min-h-100'
			}}
			header={<ManageMastersHeader />}
			content={<ManageMasters />}
			//innerScroll
		/>
    )
}

export default ManageMastersPage;