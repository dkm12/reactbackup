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
		id: 'fullname',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00184" />,
		sort: true
	},
	{
		id: 'empCode',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00185" />,
		sort: true
	},
	{
		id: 'dsgCode',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00072" />,
		sort: true
	},
	{
		id: 'dptCode',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00073" />,
		sort: true
	},
	{
		id: 'officialEmailId',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00082" />,
		sort: true
	},
	{
		id: 'locCode',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00074" />,
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

function UserListingTableHead(props) {
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


export default UserListingTableHead;
