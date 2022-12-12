import React from 'react';
import FusePageSimple from '@core/core/PageSimple';
import OrgChartHeader from './OrgChartHeader';

function OrgChartPage() {
    return (
        <FusePageSimple
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64 sm:h-136 sm:min-h-100'
			}}
			header={<OrgChartHeader />}
			content={
				<div className="flex flex-col w-full items-center">
					<img src="/app/assets/images/banner/organisation-chart.png" alt="Our Board of Directors" />
				</div>
			}
			//innerScroll
		/>
    )
}

export default OrgChartPage;