import FusePageSimple from '@core/core/PageSimple';
import React from 'react';
import DocumentListHeader from './DocumentListHeader';
import DocumentListContent from './DocumentListContent'
import { Link, useParams } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import reducer from '../../store';

function DocumentListPage() {
	const routeParams = useParams();
	const { folderId } = routeParams;
	const { folderName } = routeParams;

	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<DocumentListHeader folderId = {folderId} folderName = {folderName}/>}
			content={<DocumentListContent folderId = {folderId} folderName = {folderName}/>}
			//innerScroll
		/>
	);
}
export default withReducer('documentLibrary', reducer)(DocumentListPage);