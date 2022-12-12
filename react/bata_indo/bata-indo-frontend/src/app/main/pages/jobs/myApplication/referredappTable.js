import FuseScrollbars from '@core/core/Scrollbars';
import _ from '@lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMyIJPApp, selectMyIjpApp } from '../store/myIjpAppSlice'
import { getMyREFApp, selectMyRefApp } from '../store/myRefAppSlice'
import RefAppTableHead from './referredAppTableHead';
import dateFunc from '@common/utils/dateFunc';
import SmartForm from '@smart-form';
import { makeStyles } from '@material-ui/core/styles';
import Head from '@components/Table/head';
import { Label, GetLabel } from '@common/utils/label';

const columns = [
	{
		id: 'jbdTitle',
		align: 'left',
		disablePadding: false,
		label: 'Job Title',
		sort: true
	},
	{
		id: 'fullname',
		align: 'left',
		disablePadding: false,
		label: 'Full Name',
		sort: true
	},

	{
		id: 'jbdDesigName',
		align: 'left',
		disablePadding: false,
		label: 'Designation',
		sort: true
	},
	{
		id: 'jbdDeptName',
		align: 'left',
		disablePadding: false,
		label: 'Department',
		sort: true
	},
	{
		id: 'jbdLocName',
		align: 'left',
		disablePadding: false,
		label: 'Location',
		sort: true
	},
	{
		id: 'ijpCreatedOn',
		align: 'left',
		disablePadding: false,
		label: 'Job Applied On',
		sort: true
	},
	{
		id: 'currentStatusName',
		align: 'left',
		disablePadding: false,
		label: 'Current Status',
		sort: true
	},
];
const useStyles = makeStyles((theme) => ({
	smartForm2: {
		marginBottom: '-30px',
	},
}));

function RefAppTable(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const REFJobPosting = useSelector(selectMyRefApp);
	const totalRecords = useSelector(({ applicants }) => applicants.myRefApplication.totalRecords);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({});
	const [currColumn, setCurrColumn] = useState("");

	useEffect(() => {
		let url = {
			'pgNo': page,
			'pgSize': rowsPerPage
		}
		dispatch(getMyREFApp(url));
	}, [dispatch, page]);

	useEffect(() => {
		setPage(0);
		let url = {
			'pgNo': 0,
			'pgSize': rowsPerPage
		}
		dispatch(getMyREFApp(url));
	}, [rowsPerPage]);

	useEffect(() => {
		setData(REFJobPosting);
	}, [REFJobPosting]);

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
	async function handleChangePage(event, value) {
		await setPage(value);
	}

	async function handleChangeRowsPerPage(event) {
		await setRowsPerPage(event.target.value);
	}

	// function handleClick(item) {
	// 	console.log(item)
	// 	props.history.push(`/app/jobs/refer-emp/application-form/${item.jbdId}/new`);
	// }

	return (
		// (loading || !data.length) ?
		// 	<FuseLoading />
		// 	:
		<div className="w-full flex flex-col">
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
							// .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
									// onClick={event => handleClick(n)}
									// onClick={event => handleClick(n)}
									>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.jbdTitle}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.jrtFullName}
										</TableCell>

										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{n.jbdDesigName}
										</TableCell>
										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{n.jbdDeptName}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
											{n.jbdLocName}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
											{dateFunc.changeDate(n.createdOn)}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
											{n.jrtStatus}
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

export default withRouter(RefAppTable);