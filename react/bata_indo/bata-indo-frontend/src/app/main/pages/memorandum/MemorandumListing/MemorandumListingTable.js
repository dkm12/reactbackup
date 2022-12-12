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
import { getMemorandums, selectMemorandums } from '../store/empMemorandumListingSlice';
//import MemorandumListingTableHead from './MemorandumListingTableHead';
import { Link } from 'react-router-dom';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import dateFunc from '@common/utils/dateFunc';
import Head from '@components/Table/head';
import { Label, GetLabel } from '@common/utils/label';
import SearchFilter from './filter';

const columns = [
	{
		id: 'mmRefNo',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00237" />,
		sort: true
	},
	{
		id: 'mmTitle',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00054" />,
		sort: true
	},
	{
		id: 'mmType',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00238" />,
		sort: true
	},
	{
		id: 'statusCode',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00089" />,
		sort: true
	},
	{
		id: 'createdOn',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00239" />,
		sort: true
	},
	{
		id: 'statusCode',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00195" />,
		sort: true
	}
];
function MemorandumTable(props) {
	const dispatch = useDispatch();
	const memorandums = useSelector(selectMemorandums);
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const searchText = useSelector(({ memorandum }) => memorandum.empMemorandumListing.searchText);
	const totalRecords = useSelector(({ memorandum }) => memorandum.empMemorandumListing.totalRecords);

	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(memorandums);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({});
	const [currColumn, setCurrColumn] = useState("");
	const [filterData, setfilterData] = useState({});

	useEffect(() => {
		dispatch(getMemorandums({
			uuid: uuid,
			page: page,
			rowsPerPage: rowsPerPage,
			filterData: filterData
		}));
	}, [dispatch,page]);

	useEffect(() => {
		setPage(0);
		dispatch(getMemorandums(
			{
				uuid: uuid,
				page: 0,
				rowsPerPage: rowsPerPage,
				filterData: filterData
			}));
	}, [rowsPerPage,filterData]);

	
	function onFilterChange(val){
		setfilterData(val);
	}

	useEffect(() => {
		if (searchText.length !== 0) {
			// setData(_.filter(memorandums, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
			// setPage(0);
		} else {
			setData(memorandums);
		}
	}, [memorandums, searchText]);

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
				[property]:{
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
		if(item.mmPendingId===0)
		{
			props.history.push(`/app/employee-service/internal-memorandum/${item.id}`);
		}
		if(item.mmPendingId===-1)
		{
			props.history.push(`/app/employee-service/memorandum/${item.id}`);
		}
		else
		{
			props.history.push(`/app/employee-service/memorandum/${item.id}`);
		}
	}

	function handleInternalClick(item)
	{
		props.history.push(`/app/employee-service/internal-memorandum/${item.id}`);
	}

	function handleEditClick(item)
	{
		props.history.push(`/app/employee-service/memorandum/${item.id}`);
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
			<SearchFilter change={onFilterChange}/>
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
											{n.mmRefNo}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.mmTitle}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.mmType}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
										{n.mmPendingId === 0 ? "Approved" : 
										 (n.mmPendingId === -1 ? "Pending With User" : 
										 (n.mmPendingId === -2 ? "Rejected" : "Pending With Approver")
										)
										}
										</TableCell>
										
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{dateFunc.changeDate(n.createdOn)}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
											{n.mmPendingId === 0  ?
												<a onClick={event => handleInternalClick(n)}>
													<VisibilitySharpIcon color="primary" />
												</a>
												: n.mmPendingId === -1  ?
												<a onClick={event => handleEditClick(n)}>
													<EditSharpIcon color="primary" />
												</a>
												: <a onClick={event => handleClick(n)}>
												<VisibilitySharpIcon color="primary" />
											</a>}
										</TableCell> 

										{/* <TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
											{n.statusName !== null ? n.statusName : "Pending With User"}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
											{(n.outcome == "SAVE" || (n.outcome == "SUBMIT" && n.statusName !== null && n.statusName.toUpperCase() === "Returned".toUpperCase())) ?
												<a onClick={event => handleClick(n)}>
													<EditSharpIcon color="primary" />
												</a>
												: <a onClick={event => handleClick(n)}>
													<VisibilitySharpIcon color="primary" />
												</a>}
										</TableCell> */}
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


export default withRouter(MemorandumTable);
