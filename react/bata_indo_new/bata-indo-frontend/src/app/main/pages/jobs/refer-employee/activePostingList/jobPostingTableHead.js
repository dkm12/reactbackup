import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import React, { useState } from 'react';
import { Label, GetLabel } from '@common/utils/label';
const rows = [
	{
		id: 'jbdTitle',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00069" />,
		sort: true
	},
	{
		id: 'jbdDesc',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00070" />,
		sort: true
	},
	{
		id: 'jbdYOExp',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00071" />,
		sort: true
	},

	{
		id: 'jbdDesigName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00072" />,
		sort: true
	},
	{
		id: 'jbdDeptName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00073" />,
		sort: true
	},
	{
		id: 'jbdLocName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00074" />,
		sort: true
	},
	{
		id: 'jbdPubFrmDate',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00076" />,
		sort: true
	},
	{
		id: 'jbdPubToDate',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00077" />,
		sort: true
	},
	{
		id: 'jbdNumVacancy',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00075" />,
		sort: true
	},
	{
		id: 'jobType',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00195" />,
		sort: true
	}
];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function JobPostingTableHead(props) {
	const classes = useStyles(props);
	const [selectedProductsMenu, setSelectedProductsMenu] = useState(null);

	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};

	function openSelectedProductsMenu(event) {
		setSelectedProductsMenu(event.currentTarget);
	}

	function closeSelectedProductsMenu() {
		setSelectedProductsMenu(null);
	}

	return (
		<TableHead>
			<TableRow className="h-64">
				{rows.map(row => {
					return (
						<TableCell
							className="p-4 md:p-16"
							key={row.id}
							align={row.align}
							padding={row.disablePadding ? 'none' : 'default'}
							sortDirection={props.order.id === row.id ? props.order.direction : false}
						>
							{row.sort && (
								<Tooltip
									title="Sort"
									placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										active={props.order.id === row.id}
										direction={props.order.direction}
										onClick={createSortHandler(row.id)}
									>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							)}
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
}


export default JobPostingTableHead;
