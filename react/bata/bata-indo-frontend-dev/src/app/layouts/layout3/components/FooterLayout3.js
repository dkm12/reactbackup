import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import PoweredByLinks from 'app/layouts/shared-components/PoweredByLinks';
import PurchaseButton from 'app/layouts/shared-components/PurchaseButton';
import DocumentationButton from 'app/layouts/shared-components/DocumentationButton';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectFooterTheme } from 'app/store/core/settingsSlice';

function FooterLayout3(props) {
	const footerTheme = useSelector(selectFooterTheme);

	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar
				id="fuse-footer"
				className="relative z-10"
				color="default"
				style={{ backgroundColor: footerTheme.palette.background.paper, minHeight: "40px", color: '#999', fontSize: '1.2rem' }}
				elevation={2}
			>
				<Toolbar className="container px-8 sm:px-12 lg:px-20 py-0 flex items-center overflow-x-auto" style={{minHeight: "40px"}}>
					<div className="flex flex-grow flex-shrink-0">
						<div className="copyright">© Copyright 2021 - Bata. All Rights Reserved.</div>
					</div>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default React.memo(FooterLayout3);
