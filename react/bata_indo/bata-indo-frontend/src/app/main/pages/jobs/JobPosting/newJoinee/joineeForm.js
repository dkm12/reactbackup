import FusePageSimple from '@core/core/PageSimple';
import React from 'react';
import FolderHeader from './header';
import JoineeFormContent from './joineeFormContent';
import { Link, useParams } from 'react-router-dom';

function JoineeForm() {
	const routeParams = useParams();
	const { id } = routeParams;
	
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<FolderHeader/>}
			content={<JoineeFormContent id = {id}/>}
			// innerScroll
		/>
	);
}

export default JoineeForm;