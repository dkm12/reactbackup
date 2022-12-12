
import FusePageSimple from '@core/core/PageSimple';
import React from 'react';
import WorkAnniversaryListHeader from './WorkAnniversaryListHeader'
import WorkAnniversaryNotifications from './WorkAnniversaryNotifications';


function NotificationTab() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<WorkAnniversaryListHeader />}
			content={<WorkAnniversaryNotifications />}
		/>
	);
}

export default NotificationTab;
