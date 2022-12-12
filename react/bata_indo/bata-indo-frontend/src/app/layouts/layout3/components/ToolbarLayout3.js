import FuseSearch from '@core/core/Search';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ChatPanelToggleButton from 'app/layouts/shared-components/chatPanel/ChatPanelToggleButton';
import Logo from 'app/layouts/shared-components/Logo';
import NavbarMobileToggleButton from 'app/layouts/shared-components/NavbarMobileToggleButton';
import QuickPanelToggleButton from 'app/layouts/shared-components/quickPanel/QuickPanelToggleButton';
import UserMenu from 'app/layouts/shared-components/UserMenu';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectToolbarTheme } from 'app/store/core/settingsSlice';
import FullScreenToggle from '../../shared-components/FullScreenToggle';
import LanguageSwitcher from '../../shared-components/LanguageSwitcher';

const useStyles = makeStyles(theme => ({
	root: {}
}));

function ToolbarLayout3(props) {
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
	const toolbarTheme = useSelector(selectToolbarTheme);

	const classes = useStyles(props);

	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				id="fuse-toolbar"
				className={clsx(classes.root, 'flex relative z-10')}
				color="default"
				style={{ backgroundColor: '#00000000', zIndex: 4}}
				elevation={2}
			>
				<Toolbar className="container p-0 lg:px-24" style={{minHeight: "47px"}}>
					{config.navbar.display && (
						<Hidden lgUp>
							<NavbarMobileToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
						</Hidden>
					)}

					<Hidden mdDown>
						<div className={clsx('flex flex-shrink-0 items-center')}>
							<Logo />
						</div>
					</Hidden>

					<div className="flex flex-1">
						{/* <Hidden xsDown>
							<FuseSearch className="mx-16 lg:mx-24" variant="basic" />
						</Hidden> */}
					</div>

					<div className="flex items-center px-8 md:px-0">
						{/* <Hidden smUp>
							<FuseSearch />
						</Hidden> */}

						{/* <Hidden lgUp>
							<ChatPanelToggleButton />
						</Hidden> */}

						<LanguageSwitcher />

						{/* <FullScreenToggle /> */}

						{/* <QuickPanelToggleButton /> */}

						<UserMenu />
					</div>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default React.memo(ToolbarLayout3);
