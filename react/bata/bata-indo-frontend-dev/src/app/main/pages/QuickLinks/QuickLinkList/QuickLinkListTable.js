import FuseScrollbars from '@core/core/Scrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme } from '@material-ui/core/styles';
import FuseAnimate from '@core/core/Animate';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getQuickLinks, selectQuickLink } from '../Store/quickLinkList';
import { Link, useParams } from 'react-router-dom';
import dateFunc from '@common/utils/dateFunc';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import IconButton from '@material-ui/core/IconButton';
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import Image from '@components/Attachment';
import Head from '@components/Table/head';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Label, GetLabel } from '@common/utils/label';

const columns = [
	{
		id: 'quickLinksTitle',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00054" />,
		sort: true
	},
	{
		id: 'quickLinksUrl',
		align: 'left',
		disablePadding: false,
		label: 'URL',
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
		sort: false
	}
];

function AdminListTable(props) {
	const dispatch = useDispatch();
	const quicklinks = useSelector(selectQuickLink);
	const role = useSelector(({ auth }) => auth.user.role);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(quicklinks);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({});

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
		dispatch(getQuickLinks());
	}, [dispatch]);


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

	function handleClick(id) {
		props.history.push(`/app/master/quickLink/create/${id}`);
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
						rowCount={quicklinks.length}
					/>

					<TableBody>
						{_.orderBy(
							quicklinks,
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
							[order.direction])
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
									// onClick={event => handleClick(n.id)}
									>
										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row" >
											{n.quickLinksTitle}
										</TableCell>
										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row" >
											{n.quickLinksUrl}
										</TableCell>
										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{dateFunc.changeDate(n.createdOn)}
										</TableCell>
										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{n.status}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
											< IconButton onClick={event => handleClick(n.id)} size='small'>
												<EditSharpIcon color="primary" />

											</IconButton>
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>

				</Table>
			</FuseScrollbars>

			{/* <TablePagination
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
			/> */}
		</div>
	);
}


export default withRouter(AdminListTable);
