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
import { getAnnouncementList, selectAnnouncements } from '@components/Announcement/store/empAnnouncementsSlice'
import { Link, useParams } from 'react-router-dom';
import AdminListTableHead from './adminListTableHead';
import dateFunc from '@common/utils/dateFunc';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import IconButton from '@material-ui/core/IconButton';
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import Image from '@components/Attachment';
import Head from '@components/Table/head';
import { Label, GetLabel } from '@common/utils/label';
import SearchFilter from './Filter'

const columns = [
	{
		id: 'annTitle',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00054" />,
		sort: true
	},
	{
		id: 'annDesc',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00055" />,
		sort: true
	},
	{
		id: 'annAttachId',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00123" />,
		sort: true
	},

	{
		id: 'annPublishTillDate',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00057" />,
		sort: true
	},
	{
		id: 'annStatus',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00089" />,
		sort: true
	},
	{
		id: 'edit',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00195" />,
		sort: true
	},

];


function AdminListTable(props) {
	const dispatch = useDispatch();
	const ann = useSelector(selectAnnouncements);

	const totalRecords = useSelector(({ announcement }) => announcement.announcementsList.totalRecords);
	const searchText = useSelector(({ announcement }) => announcement.announcementsList.searchText);
	// const role = useSelector(({ auth }) => auth.user.role);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(ann);
	console.log("data", data);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({});
	const routeParams = useParams(); const [filterData, setfilterData] = useState({});

	function onChange(val) {
		setfilterData(val)
		console.log(val)
	}

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


	useEffect(() => {
		let postData = filterData
		postData.pgNo = page
		postData.pgSize = rowsPerPage
		dispatch(getAnnouncementList(postData));
	}, [dispatch, page]);

	useEffect(() => {
		setPage(0);
		let postData = filterData
		postData.pgNo = 0
		postData.pgSize = rowsPerPage
		dispatch(getAnnouncementList(postData));
	}, [rowsPerPage, filterData]);


	useEffect(() => {
		if (searchText.length !== 0) {
			// setData(_.filter(leaveRequests, item => item.leaveType.toLowerCase().includes(searchText.toLowerCase())));
			// setPage(0);
		} else {
			setData(ann);
		}
	}, [ann, searchText]);


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

	function handleClick(id) {

		props.history.push(`/app/announcement/form/${id}`);
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

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.annTitle}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.annDesc}
										</TableCell>

										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{n && n.annAttachId && <Image src={n.annAttachId} height="40px" />}
										</TableCell>

										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{dateFunc.changeDate(n.annPublishTillDate)}
										</TableCell>
										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{n.annStatus}
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
