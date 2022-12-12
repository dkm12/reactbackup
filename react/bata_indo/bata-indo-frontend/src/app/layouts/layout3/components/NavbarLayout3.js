import Scrollbars from '@core/core/Scrollbars';
import Navigation from 'app/layouts/shared-components/Navigation';
import React from 'react';

function NavbarLayout3() {
	return (
		<div className="flex flex-auto items-center w-full h-full container px-16 lg:px-24">
			<Scrollbars className="flex h-full items-center">
				<Navigation className="w-full" layout="horizontal" dense/>
			</Scrollbars>
		</div>
	);
}

export default React.memo(NavbarLayout3);
