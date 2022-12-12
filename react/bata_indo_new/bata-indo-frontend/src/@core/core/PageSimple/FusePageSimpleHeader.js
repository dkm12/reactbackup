import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme, ThemeProvider } from '@material-ui/core/styles';
import { selectContrastMainTheme } from 'app/store/core/settingsSlice';

function FusePageSimpleHeader(props) {
	const theme = useTheme();
	const contrastTheme = useSelector(selectContrastMainTheme(theme.palette.primary.main));

	return (
		<div className={props.classes.header}>
			<div style={{backgroundColor: '#ffffff', borderTopRightRadius:'8px', borderTopLeftRadius:'8px', width: '100%', display: 'flex', padding: '0 23px', marginTop: '17px'}}>
			{props.header}
			</div>
		</div>
	);
}

export default FusePageSimpleHeader;
