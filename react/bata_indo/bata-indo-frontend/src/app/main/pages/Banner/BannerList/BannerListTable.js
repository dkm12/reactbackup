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
import { getBanners, selectBanners } from '../store/bannerListSlice'
import { deleteBanner, getBanner } from '../store/bannerSaveSlice'
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
		id: 'imageUrl',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00134" />,
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
		id: 'createdOn',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00371" />,
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
	const banners = useSelector(selectBanners);

	const totalRecords = useSelector(({ banner }) => banner.bannerList.totalRecords);
	const searchText = useSelector(({ banner }) => banner.bannerList.searchText);
	// const role = useSelector(({ auth }) => auth.user.role);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(banners);
	console.log("data", data);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({});
	const [openDialog, setOpenDialog] = React.useState(false);
	const [deleteItem, setDeleteItem] = useState(null);
	const routeParams = useParams();

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
		dispatch(getBanners(
			{
				page: page,
				rowsPerPage: rowsPerPage
			}
		));
	}, [dispatch, page]);

	useEffect(() => {
		setPage(0);
		dispatch(getBanners(
			{
				page: 0,
				rowsPerPage: rowsPerPage
			}));
	}, [rowsPerPage]);


	useEffect(() => {
		if (searchText.length !== 0) {
			// setData(_.filter(leaveRequests, item => item.leaveType.toLowerCase().includes(searchText.toLowerCase())));
			// setPage(0);
		} else {
			setData(banners);
		}
	}, [banners, searchText]);


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
	const handleCloseDialog = () => {
		setOpenDialog(false);
		setDeleteItem(null);
	};
	const handleOpenDialog = (item) => {
		setOpenDialog(true);
		setDeleteItem(item);
	};
	function handleClick(id) {
		props.history.push(`/app/master/banner/create/${id}`);
	}
	const handleDeleteBanner = async () => {
		setOpenDialog(false);
		await dispatch(deleteBanner(deleteItem));
		await dispatch(getBanners({
			page: page,
			rowsPerPage: rowsPerPage
		}));
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
										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row" align="right">
											{n && n.imageUrl && <Image src={n.imageUrl} height="40px" />}
										</TableCell>

										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{n.status}
										</TableCell>
										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{dateFunc.changeDate(n.createdOn)}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
											< IconButton onClick={event => handleClick(n.id)} size='small'>
												<EditSharpIcon color="primary" />

											</IconButton>
											< IconButton onClick={event => handleOpenDialog(n.id)} size='small'>
												<DeleteIcon color="primary" />
											</IconButton>
										</TableCell>
										{/* <TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
											< IconButton onClick={event => handleClick(n.id)} size='small'>
												<DeleteIcon color="primary" />
											</IconButton>
										</TableCell> */}
									</TableRow>
								);
							})}
					</TableBody>

				</Table>
			</FuseScrollbars>
			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"Delete Banner?"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure, you want to delete this Banner?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} color="primary">
						Cancel
					</Button>
					<Button onClick={handleDeleteBanner} color="primary" autoFocus>
						Yes
					</Button>
				</DialogActions>
			</Dialog>

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


export default withRouter(AdminListTable);
