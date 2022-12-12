
import FusePageSimple from '@core/core/PageSimple';
import React from 'react';
import BirthdayListHeader from './BirthdayListHeader'
import BirthdayNotifications from './BirthdayNotifications';


function NotificationTab() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<BirthdayListHeader />}
			content={<BirthdayNotifications />}
		/>
	);
}

export default NotificationTab;
