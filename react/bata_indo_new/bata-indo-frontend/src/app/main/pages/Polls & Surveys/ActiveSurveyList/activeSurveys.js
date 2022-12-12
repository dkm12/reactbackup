import FusePageCarded from '@core/core/PageCarded';
import FusePageSimple from '@core/core/PageSimple';
import withReducer from 'app/store/withReducer';
import React from 'react';
import Header from './header';
import ActivePollsSurveyTable from './activeSurveysTable';

function ActiveSurvey() {
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<Header/>}
			content={<ActivePollsSurveyTable />}
			// innerScroll
		/>
	);
}

export default ActiveSurvey;
