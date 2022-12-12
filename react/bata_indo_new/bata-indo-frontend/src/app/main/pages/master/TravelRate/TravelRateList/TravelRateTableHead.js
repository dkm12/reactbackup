import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';

const rows = [
	{
		id: 'trId',
		align: 'left', // right, center
		disablePadding: false,
		label: 'Id',
		sort: true
	},
	{
		id: 'trCode',
		align: 'left',
		disablePadding: false,
		label: 'Travel Rate Code',
		sort: true
	},
	{
		id: 'trType',
		align: 'left',
		disablePadding: false,
		label: 'Travel Rate Name',
		sort: true
	},
	{
		id: 'createdOn',
		align: 'left',
		disablePadding: false,
		label: 'Created Date ',
		sort: true
	},
	{
		id: 'status',
		align: 'left',
		disablePadding: false,
		label: 'Status ',
		sort: true
	},
	{
		id: '-',
		align: 'left',
		disablePadding: false,
		label: 'Action',
		sort: true
	}
];

function ProductsTableHead(props) {
	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};
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


export default ProductsTableHead;
