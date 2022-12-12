import FusePageSimple from '@core/core/PageSimple';
import React from 'react';
import GalleryViewHeader from './GalleryViewHeader';
import GalleryContent from './galleryContent'
import { Link, useParams } from 'react-router-dom';

function GalleryViewPage() {
	const routeParams = useParams();
	const { folderId } = routeParams;
	const { folderName } = routeParams;

	return (
		<FusePageSimple
			classes={{
				toolbar: 'px-16 sm:px-24'
			}}
			header={<GalleryViewHeader folderId = {folderId} folderName = {folderName}/>}
			content={<GalleryContent folderId = {folderId} folderName = {folderName}/>}
			// innerScroll
		/>
	);
}

export default GalleryViewPage;