import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import React, { useState } from 'react';

const rows = [
	{
		id: 'claimId',
		align: 'left',
		disablePadding: false,
		label: 'Claim Id',
		sort: true
	},
	{
		id: 'eCode',
		align: 'left',
		disablePadding: false,
		label: 'Employee Code',
		sort: true
	},
	{
		id: 'eName',
		align: 'left',
		disablePadding: false,
		label: 'Employee Name',
		sort: true
	},
	{
		id: 'grade',
		align: 'left',
		disablePadding: false,
		label: 'Grade',
		sort: true
	},
	{
		id: 'dept',
		align: 'left',
		disablePadding: false,
		label: 'Department',
		sort: true
	},
	{
		id: 'travelPlace',
		align: 'left',
		disablePadding: false,
		label: 'Travel Place',
		sort: true
	},
	{
		id: 'claimedDate',
		align: 'left',
		disablePadding: false,
		label: 'Claim Submission On',
		sort: true
	},
	{
		id: 'travelFromDate',
		align: 'left',
		disablePadding: false,
		label: 'Travel From Date',
		sort: true
	},
	{
		id: 'travelToDate',
		align: 'left',
		disablePadding: false,
		label: 'Travel To Date',
		sort: true
	},
	{
		id: 'approvedOn',
		align: 'left',
		disablePadding: false,
		label: 'Approved on',
		sort: true
	},
	{
		id: 'byBus',
		align: 'left',
		disablePadding: false,
		label: 'By Bus',
		sort: true
	},
	{
		id: 'byTrain',
		align: 'left',
		disablePadding: false,
		label: 'By Train',
		sort: true
	},
	{
		id: 'byAir',
		align: 'left',
		disablePadding: false,
		label: 'By Air',
		sort: true
	},
	{
		id: 'ownCar',
		align: 'left',
		disablePadding: false,
		label: 'Own Car',
		sort: true
	},
	{
		id: 'taxi',
		align: 'left',
		disablePadding: false,
		label: 'Taxi',
		sort: true
	},
	{
		id: 'twoWheeler',
		align: 'left',
		disablePadding: false,
		label: 'Two Wheeler',
		sort: true
	},
	{
		id: 'others',
		align: 'left',
		disablePadding: false,
		label: 'Others',
		sort: true
	},
	{
		id: 'totalTravelAmt',
		align: 'left',
		disablePadding: false,
		label: 'Total Travel Amount',
		sort: true
	},
	{
		id: 'hotelEligibility',
		align: 'left',
		disablePadding: false,
		label: 'Hotel Eligibility Amount',
		sort: true
	},
	{
		id: 'totalHotelAmt',
		align: 'left',
		disablePadding: false,
		label: 'Total Hotel Amount',
		sort: true
	},
	{
		id: 'foodEligibility',
		align: 'left',
		disablePadding: false,
		label: 'Food Eligibility Amount',
		sort: true
	},
	{
		id: 'totalFoodAmt',
		align: 'left',
		disablePadding: false,
		label: 'Total Food Amount',
		sort: true
	},
	{
		id: 'totalOtherBill',
		align: 'left',
		disablePadding: false,
		label: 'Total Other Bill Amount',
		sort: true
	},
	{
		id: 'claimedAmt',
		align: 'left',
		disablePadding: false,
		label: 'Claimed Amount Grand Total',
		sort: true
	},
	{
		id: 'billProcessRemark',
		align: 'left',
		disablePadding: false,
		label: 'Bill Processing Remark',
		sort: true
	},
	{
		id: 'amount',
		align: 'left',
		disablePadding: false,
		label: 'Paid Amount',
		sort: true
	},
	{
		id: 'status',
		align: 'left',
		disablePadding: false,
		label: 'Status',
		sort: true
	}
];

const useStyles = makeStyles(theme => ({
	actionsButtonWrapper: {
		background: theme.palette.background.paper
	}
}));

function ProductsTableHead(props) {
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


export default ProductsTableHead;
