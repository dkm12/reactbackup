import FusePageSimple from '@core/core/PageSimple';
import React from 'react';
import FolderHeader from './header';
import CreateContent from './createContent';
import { Link, useParams } from 'react-router-dom';

function CreatePage() {
	const routeParams = useParams();
	const { id } = routeParams;
	
	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<FolderHeader id = {id}/>}
			content={<CreateContent id = {id}/>}
			// innerScroll
		/>
	);
}

export default CreatePage;