import FuseShortcuts from '@core/core/Shortcuts';
import FuseSidePanel from '@core/core/SidePanel';
import React from 'react';

function LeftSideLayout3() {
	return (
		<>
			<FuseSidePanel>
				<FuseShortcuts className="py-16 px-8" variant="vertical" />
			</FuseSidePanel>
		</>
	);
}

export default React.memo(LeftSideLayout3);
