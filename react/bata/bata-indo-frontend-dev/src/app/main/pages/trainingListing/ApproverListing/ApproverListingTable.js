import FuseScrollbars from '@core/core/Scrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getApproverListing, selectApproverListing } from '../store/empApproverListingSlice';
//import ApproverListingTableHead from './ApproverListingTableHead';
import { Link } from 'react-router-dom';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import dateFunc from '@common/utils/dateFunc';
import Head from '@components/Table/head';
import { Label, GetLabel } from '@common/utils/label';
import SearchFilter from './filter';
import CSVDownloadComp from '@components/CSVDownload/csv'

const columns = [
	{
		id: 'transactionNumber',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00377" />,
		sort: true
	},
	{
		id: 'appliedById',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00101" />,
		sort: true
	},
	{
		id: 'appliedByName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00184" />,
		sort: true
	},
	{
		id: 'appliedOn',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00378" />,
		sort: true
	},
	{
		id: 'trngName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00379" />,
		sort: true
	},
	{
		id: 'statusName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00089" />,
		sort: true
	},
	{
		id: '-',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00195" />,
		sort: false
	}
];

function ApproverListingTable(props) {
	const dispatch = useDispatch();
	const approveClaims = useSelector(selectApproverListing);
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const searchText = useSelector(({ training }) => training.empApproverListing.searchText);
	const totalRecords = useSelector(({ training }) => training.empApproverListing.totalRecords);

	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(approveClaims);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({});
	const [currColumn, setCurrColumn] = useState("");
	const [filterData, setfilterData] = useState({});

	let csvdata = [];
	let csvheaders = [];
	if (columns) {
		columns.map(n => {
			if (n.sort) csvheaders.push({ label: GetLabel([n.label.props.labelId]), key: n.id })
		})
	}
	if (data) {
		data.map(n => {
			csvdata.push({
				transactionNumber: n.transactionNumber,
				appliedById: n.appliedById,
				appliedByName: n.appliedByName,
				appliedOn: dateFunc.changeDate(n.appliedOn),
				trngName: n.trngName,
				statusName: n.statusName,
			})
		})
	}

	useEffect(() => {
		dispatch(getApproverListing({
			uuid: uuid,
			page: page,
			rowsPerPage: rowsPerPage,
			filterData: filterData
		}));
	}, [dispatch, page]);

	useEffect(() => {
		setPage(0);
		dispatch(getApproverListing(
			{
				uuid: uuid,
				page: 0,
				rowsPerPage: rowsPerPage,
				filterData: filterData
			}));
	}, [rowsPerPage, filterData]);

	function onFilterChange(val) {
		setfilterData(val);
	}

	useEffect(() => {
		if (searchText.length !== 0) {
			// setData(_.filter(approveClaims, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
			// setPage(0);
		} else {
			setData(approveClaims);
		}
	}, [approveClaims, searchText]);

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';
		console.log(`property`, property)
		if (order[property] && order[property].direction === 'desc') {
			direction = 'asc';
		}
		setCurrColumn(property);
		setTimeout(() => {
			setOrder({
				...setOrder,
				[property]: {
					direction,
					id
				}
			});
		}, 0);
	}
	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleClick(item) {
		props.history.push(`/app/claim-requests/approve-training-request/${item.id}`);
	}

	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<SearchFilter change={onFilterChange} />
				<CSVDownloadComp data={csvdata} header={csvheaders} filename='Training_Requests' />
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<Head
						columns={columns}
						numSelected={selected.length}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data.length}
					/>

					<TableBody>
						{_.orderBy(
							data,
							[
								o => {
									switch (order[currColumn] && order[currColumn].id) {
										case 'categories': {
											return o.categories[0];
										}
										default: {
											return o[order[currColumn] && order[currColumn].id];
										}
									}
								}
							],
							[order[currColumn] && order[currColumn].direction]
						)
							.map(n => {
								const isSelected = selected.indexOf(n.id) !== -1;
								return (
									<TableRow
										className="h-64 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n.id}
										selected={isSelected}
										onClick={event => handleClick(n)}
									>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.transactionNumber}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.appliedById}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.appliedByName}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{dateFunc.changeDate(n.appliedOn)}
										</TableCell>
										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{n.trngName}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
											{n.statusName}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row" align="center">
											{n.statusCode.toUpperCase() == "PENDING_WITH_RM".toUpperCase()
												|| n.statusCode.toUpperCase() == "PENDING_WITH_TRNG_APPROVER".toUpperCase()
												?
												<a onClick={event => handleClick(n)}>
													<VisibilitySharpIcon color="primary" />
												</a> : ""}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="flex-shrink-0 border-t-1"
				component="div"
				count={totalRecords}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</div>
	);
}


export default withRouter(ApproverListingTable);
