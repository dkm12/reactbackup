import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import { Label, GetLabel } from '@common/utils/label';

const rows = [
	{
		id: 'tmeId',
		align: 'left', // right, center
		disablePadding: false,
		label: <Label labelId="BL00232" />,
		sort: true
	},
	{
		id: 'tmeCode',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00374" />,
		sort: true
	},
	{
		id: 'tmeModeName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00352" />,
		sort: true
	},
	{
		id: 'tmeEmpCatCode',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00265" />,
		sort: true
	},
	{
		id: 'tmeAmount',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00347" />,
		sort: true
	},
	{
		id: 'tmeModeType',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00345" />,
		sort: true
	},
	{
		id: 'createdOn',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00371" />,
		sort: true
	},
	{
		id: 'status',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00194" />,
		sort: true
	},
	{
		id: '-',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00195" />,
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