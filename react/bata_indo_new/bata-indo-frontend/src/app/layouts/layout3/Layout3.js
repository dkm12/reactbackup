import Dialog from '@core/core/Dialog';
import Message from '@core/core/Message';
import Scrollbars from '@core/core/Scrollbars';
import Suspense from '@core/core/Suspense';
import { makeStyles } from '@material-ui/core/styles';
import AppContext from 'app/AppContext';
import SettingsPanel from 'app/layouts/shared-components/SettingsPanel';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { useLocation } from 'react-router-dom';
import FooterLayout3 from './components/FooterLayout3';
import LeftSideLayout3 from './components/LeftSideLayout3';
import NavbarWrapperLayout3 from './components/NavbarWrapperLayout3';
import RightSideLayout3 from './components/RightSideLayout3';
import ToolbarLayout3 from './components/ToolbarLayout3';
import SplashScreen from '@core/core/SplashScreen';

const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		backgroundColor: '#e9e9e9',
		backgroundImage: 'url(app/assets/images/backgrounds/top_strip.jpg)',
		backgroundRepeat: 'no-repeat',
		'&.boxed': {
			maxWidth: 1300,
			margin: '0 auto',
			boxShadow: theme.shadows[3]
		},
		'&.container': {
			'& .container': {
				maxWidth: 1300,
				width: '100%',
				margin: '0 auto'
			},
			'& .navigation': {}
		}
	},
	content: {
		display: 'flex',
		overflow: 'auto',
		flex: '1 1 auto',
		flexDirection: 'column',
		width: '100%',
		'-webkit-overflow-scrolling': 'touch',
		zIndex: 4
	},
	toolbarWrapper: {
		display: 'flex',
		position: 'relative',
		zIndex: 5
	},
	toolbar: {
		display: 'flex',
		flex: '1 0 auto'
	},
	footerWrapper: {
		position: 'relative',
		zIndex: 5
	},
	footer: {
		display: 'flex',
		flex: '1 0 auto'
	}
}));

function Layout3(props) {
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);

	const splash = useSelector(({ fuse }) => fuse.splash.state);

	const classes = useStyles(props);

	const location = useLocation();
	
	const home = location.pathname.indexOf('home') > -1; 
	return (
		<AppContext.Consumer>
			{({ routes }) => (
				<div id="fuse-layout" className={clsx(classes.root, config.mode)}>
					{config.leftSidePanel.display && <LeftSideLayout3 />}

					<div className="flex flex-1 flex-col overflow-hidden relative">
						{config.toolbar.display && config.toolbar.position === 'above' && <ToolbarLayout3 />}

						{config.navbar.display && <NavbarWrapperLayout3 />}

						{config.toolbar.display && config.toolbar.position === 'below' && <ToolbarLayout3 />}

						{/* <Scrollbars className={clsx(classes.content)} scrollToTopOnRouteChange> */}
						<div className={clsx(classes.content)} style={{background: !home ? '#f6f7f9' : '' }}>
							<Dialog />
							{splash && <SplashScreen />}
							<div className="flex flex-auto flex-col relative h-full">
								<Suspense>{renderRoutes(routes)}</Suspense>

								{props.children}

								{config.footer.display && config.footer.style === 'static' && <FooterLayout3 />}
							</div>
						</div>
						{/* </Scrollbars> */}

						{config.footer.display && config.footer.style === 'fixed' && <FooterLayout3 />}

					</div>

					{config.rightSidePanel.display && <RightSideLayout3 />}

					<Message />
				</div>
			)}
		</AppContext.Consumer>
	);
}

export default React.memo(Layout3);
