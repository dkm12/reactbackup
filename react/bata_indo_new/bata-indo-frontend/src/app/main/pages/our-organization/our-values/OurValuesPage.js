import React from 'react';
import FusePageSimple from '@core/core/PageSimple';
import OurValues from '@components/OurOrganization/OurValues';
import OurValuesHeader from './OurValuesHeader';

function OurValuesPage() {
    return (
        <FusePageSimple
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64 sm:h-136 sm:min-h-100'
			}}
			header={<OurValuesHeader />}
			content={<OurValues />}
			//innerScroll
		/>
    )
}

export default OurValuesPage;