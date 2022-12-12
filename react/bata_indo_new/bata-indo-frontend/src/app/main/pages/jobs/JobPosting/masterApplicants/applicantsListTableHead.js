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
		id: 'contactNo',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00283" />,
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
		id: 'jbdYoExp',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00071" />,
		sort: true
	},
	// {
	// 	id: 'ijpTotalExp',
	// 	align: 'left',
	// 	disablePadding: false,
	// 	label: 'Total Experience',
	// 	sort: true
	// },
	// {
	// 	id: 'ijpCurrentRoleSince',
	// 	align: 'left',
	// 	disablePadding: false,
	// 	label: 'Current Role Since',
	// 	sort: true
	// },
	{
		id: 'ijpResumeFileName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00086" />,
		sort: true
	},
	{
		id: 'empCurrentLocCode',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00083" />,
		sort: true
	},
	{
		id: 'empCurrentDesigCode',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00084" />,
		sort: true
	},
	{
		id: 'empCurrentDeptCode',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00085" />,
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
		id: 'empRmName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00305" />,
		sort: true
	},
	{
		id: 'empRmApproveDate',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00306" />,
		sort: true
	},
	{
		id: 'ijpApproverName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00307" />,
		sort: true
	},
	{
		id: 'ijpApproverDate',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00308" />,
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
		id: 'ijpTalentHrRemark',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00090" />,
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
