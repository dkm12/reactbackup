import FusePageSimple from '@core/core/PageSimple';
import { makeStyles } from '@material-ui/core/styles';
import TestPageHeader from './testPageHeader'
import TestPageContent from './testPageContent'
import React, { useState } from 'react';

import { Label, GetLabel } from '@common/utils/label';

const useStyles = makeStyles(theme => ({
	layoutHeader: {
		height: 320,
		minHeight: 320,
		[theme.breakpoints.down('md')]: {
			height: 240,
			minHeight: 240
		}
	},
	firstIcon: {
		paddingLeft: 70
	}
}));

function TestPageComp() {
	const classes = useStyles();
	const [state, setstate] = useState({})
	



	return (

		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={< TestPageHeader/>}
			content={<TestPageContent />}
		 
		/>


	);
}



export default TestPageComp;
