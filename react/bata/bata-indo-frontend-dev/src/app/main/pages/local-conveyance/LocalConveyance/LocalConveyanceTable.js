import FuseScrollbars from '@core/core/Scrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getLocalConveyances, selectLocalConveyances } from '../store/empLocalConveyancesSlice';
// import LocalConveyanceTableHead from './LocalConveyanceTableHead';
import Head from '@components/Table/head';
import dateFunc from '@common/utils/dateFunc';
import { Label, GetLabel } from '@common/utils/label';
import SearchFilter from './Filter'

const columns = [
	{
		id: 'lcId',
		align: 'left', // right, center
		disablePadding: false,
		label: <Label labelId="BL00192" />,
		sort: true
	},
	{
		id: 'createdOn',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00193" />,
		sort: true
	},
	{
		id: 'totalAmt',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00186" />,
		sort: true
	},
	{
		id: 'statusCode',
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
		sort: false
	}
];



function LocalConveyanceTable(props) {
	const dispatch = useDispatch();
	const localConveyances = useSelector(selectLocalConveyances);
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const searchText = useSelector(({ localConveyance }) => localConveyance.empLocalConveyances.searchText);
	const totalRecords = useSelector(({ localConveyance }) => localConveyance.empLocalConveyances.totalRecords);

	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(localConveyances);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({});
	const [currColumn, setCurrColumn] = useState("");
	const [filterData, setfilterData] = useState({});

	function onChange(val) {
		setfilterData(val)
		console.log(val)
	}
	console.log("data>>", data)

	useEffect(() => {
		let ord = {}
		columns.forEach(ele => {
			ord = {
				...ord,
				[ele.id]: {
					direction: 'asc',
					id: null
				}
			}
		})

	}, [setOrder])

	useEffect(() => {
		// let postData = filterData
		// postData.pgNo = page
		// postData.pgSize = rowsPerPage
		// postData.uuid = uuid
		dispatch(getLocalConveyances({
			uuid: uuid,
			page: page,
			rowsPerPage: rowsPerPage,
			filterData: filterData
		}));
	}, [dispatch, page]);

	useEffect(() => {
		setPage(0);
		// let postData = filterData
		// postData.pgNo = 0
		// postData.pgSize = rowsPerPage
		//  postData.uuid = uuid
		dispatch(getLocalConveyances({
			uuid: uuid,
			page: 0,
			rowsPerPage: rowsPerPage,
			filterData: filterData
		}));
	}, [rowsPerPage, filterData]);


	useEffect(() => {
		if (searchText.length !== 0) {
			// setData(_.filter(localConveyances, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
			// setPage(0);
		} else {
			setData(localConveyances);
		}
	}, [localConveyances, searchText]);

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
		props.history.push(`/app/employee-service/local-conveyance/${item.id}`);
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
			<SearchFilter change={onChange} />
			<FuseScrollbars className="flex-grow overflow-x-auto">
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
											{n.trxNo}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{dateFunc.changeDate(n.createdOn)}
										</TableCell>

										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{n.totalAmt}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" >
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
		</div >
	);
}


export default withRouter(LocalConveyanceTable);
