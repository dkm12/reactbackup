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
		label: <Label labelId="BL00299" />,
		sort: true
	},
	{
		id: 'jbdDesigName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00300" />,
		sort: true
	},
	{
		id: 'jbdDeptName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00301" />,
		sort: true
	},

	{
		id: 'jbdLocName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00302" />,
		sort: true
	},
	{
		id: 'fullname',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00079" />,
		sort: true
	},
	{
		id: 'ijpCreatedOn',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00303" />,
		sort: true
	},
	{
		id: 'currentStatusName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00089" />,
		sort: true
	},
	{
		id: 'ijpResumeFileName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00086" />,
		sort: true
	},

	// {
	// 	id: 'action',
	// 	align: 'left',
	// 	disablePadding: false,
	// 	label: 'Action',
	// 	sort: true
	// },

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
