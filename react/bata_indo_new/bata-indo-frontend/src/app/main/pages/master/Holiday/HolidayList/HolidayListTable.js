import FuseScrollbars from '@core/core/Scrollbars';
import _ from '@lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import { useForm, useDeepCompareEffect } from '@core/hooks';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import HolidayListTableHead from './HolidayListTableHead';
import dateFunc from '@common/utils/dateFunc';
import masterApi from '@common/utils/masterApi';
import { Label } from '@common/utils/label';
import Head from '@components/Table/head';

const columns = [
	{
		id: 'hldId',
		align: 'left', // right, center
		disablePadding: false,
		label: <Label labelId="BL00232" />,
		sort: true
	},
	{
		id: 'hldCode',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00428" />,
		sort: true
	},
	{
		id: 'hldName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00429" />,
		sort: true
	},
	{
		id: 'hlddate',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00143" />,
		sort: true
	},
	{
		id: 'hldYear',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00431" />,
		sort: true
	},
	{
		id: 'hldDay',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00430" />,
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
		label: <Label labelId="BL00089" />,
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
function DepartmentListTable(props) {
	const [data, setData] = useState([]);
	useEffect(() => {
		async function updateProductState() {
			let getApi = await masterApi.getAllholidays();
			let Array = [];
			_.isArray(getApi)
				&& getApi.map((d) => (Array.push(
					{
						hldId: d.hldId,
						...d
					}
				)));
			setData(Array);
		}
		updateProductState();
	}, []);


	const [selected, setSelected] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleClick(item) {
		props.history.push(`/app/master/holiday/create/${item.hldId}`);
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
									switch (order.id) {
										case 'categories': {
											return o.categories[0];
										}
										default: {
											return o[order.id];
										}
									}
								}
							],
							[order.direction]
						)
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
											{n.hldId}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.hldCode}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.hldName}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{dateFunc.changeDate(n.hldDate)}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.hldYear}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.hldDay}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{dateFunc.changeDate(n.createdOn)}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.status}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											<a onClick={event => handleClick(n)}>
												<EditSharpIcon color="primary" />
											</a>
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
				count={data.length}
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


export default withRouter(DepartmentListTable);
