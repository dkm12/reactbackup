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
		id: 'trngName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00379" />,
		sort: true
	},
	{
		id: 'trngDuration',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00383" />,
		sort: true
	},
	{
		id: 'trngDesc',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00384" />,
		sort: true
	},

	{
		id: 'learningPlatform',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00381" />,
		sort: true
	},
	{
		id: 'trngCategory',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00365" />,
		sort: true
	},
	{
		id: 'trngSubCategory',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00368" />,
		sort: true
	},
	{
		id: 'action',
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

function TrainingTableHead(props) {
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


export default TrainingTableHead;
