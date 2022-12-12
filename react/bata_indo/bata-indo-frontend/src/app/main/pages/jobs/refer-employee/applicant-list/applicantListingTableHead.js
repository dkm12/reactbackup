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
		id: 'jrtFullName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00079" />,
		sort: true
	},
	{
		id: 'jrtYOExp',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00071" />,
		sort: true
	},
	{
		id: 'jrtCurrLocName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00083" />,
		sort: true
	},
	{
		id: 'jrtCurrDesgName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00084" />,
		sort: true
	},
	{
		id: 'jrtCurrDeptName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00085" />,
		sort: true
	},
	{
		id: 'jrtReffByEmpCode',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00087" />,
		sort: true
	},
	{
		id: 'createdOn',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00088" />,
		sort: true
	},
	{
		id: 'jrtStatus',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00089" />,
		sort: true
	},
	{
		id: 'jrtResumeAttachId',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00086" />,
		sort: true
	},
];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function ApplicantListingTableHead(props) {
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


export default ApplicantListingTableHead;
