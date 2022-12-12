import NavLinkAdapter from '@core/core/NavLinkAdapter';
import FuseUtils from '@core/utils';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FuseNavBadge from '../FuseNavBadge';

const useStyles = makeStyles(theme => ({
	root: {
		minHeight: 48,
		'&.active': {
			backgroundColor: '#e2001a !important',
			color: `#ffffff !important`,
			pointerEvents: 'none',
			'& .list-item-text-primary': {
				color: 'inherit'
			},
			'& .list-item-icon': {
				color: 'inherit',
			}
		},
		'&.level-0': {
			height: 30,
			minHeight: 30,
			borderRadius: 4,
			'&:hover': {
				background: '#fff'
			}
		},
		'& .list-item-icon': {
			fontSize: '26px',
			color: '#fff'
		},
		'& .list-item-text': {
			padding: '0 0 0 16px'
		},
		color: theme.palette.text.primary,
		textDecoration: 'none!important'
	}
}));

function FuseNavHorizontalItem(props) {
	const userRole = useSelector(({ auth }) => auth.user.role);

	const classes = useStyles(props);
	const { item } = props;

	const hasPermission = useMemo(() => FuseUtils.hasPermission(item.auth, userRole), [item.auth, userRole]);

	if (!hasPermission) {
		return null;
	}

	return (
		<ListItem
			button
			component={NavLinkAdapter}
			to={item.url}
			activeClassName="active"
			className={clsx('list-item level-0', classes.root)}
			exact={item.exact}
		>
			{item.icon == 'none' ? null : (
				<Icon className="list-item-icon flex-shrink-0" >
					{item.icon}
				</Icon>
			)}

			<ListItemText
				className="list-item-text"
				primary={item.title}
				classes={{ primary: 'text-14 list-item-text-primary' }}
			/>

			{item.badge && <FuseNavBadge className="ltr:ml-8 rtl:mr-8" badge={item.badge} />}
		</ListItem>
	);
}

FuseNavHorizontalItem.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string,
		icon: PropTypes.string,
		url: PropTypes.string
	})
};

FuseNavHorizontalItem.defaultProps = {};

const NavHorizontalItem = withRouter(React.memo(FuseNavHorizontalItem));

export default NavHorizontalItem;