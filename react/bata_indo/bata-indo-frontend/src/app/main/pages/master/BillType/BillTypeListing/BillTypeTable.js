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
import BillTypeTableHead from './BillTypeTableHead';
import dateFunc from '@common/utils/dateFunc';
import masterApi from '@common/utils/masterApi';


function BillTypeTable(props) {
	const [bills, setBills] = useState([]);
	useEffect(() => {
		async function updateProductState() {
			let BillType = await masterApi.getAllBillTypes();
			let BillArray = [];
			_.isArray(BillType)
				&& BillType.map((d) => (BillArray.push(
					{
						btId: d.btId,
						btCode: d.btCode,
						btName: d.btName,
						createdOn: d.createdOn,
						status: d.status,
					}
				)));
			setBills(BillArray);
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
			setSelected(bills.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleClick(item) {
		props.history.push(`/app/master/billtype/create/${item.btId}`);
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
					<BillTypeTableHead
						numSelected={selected.length}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={bills.length}
					/>

					<TableBody>
						{_.orderBy(
							bills,
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
											{n.btId}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.btCode}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.btName}
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
				count={bills.length}
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


export default withRouter(BillTypeTable);
