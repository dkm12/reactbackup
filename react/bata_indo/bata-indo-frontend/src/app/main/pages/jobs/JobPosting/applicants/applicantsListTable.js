import FuseScrollbars from '@core/core/Scrollbars';
import _ from '@lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getApplicantsList, selectApplicants } from '../../store/empApplicantsList'
import { Link, useParams } from 'react-router-dom';
import ApplicantsListTableHead from './applicantsListTableHead';
import dateFunc from '@common/utils/dateFunc';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import IconButton from '@material-ui/core/IconButton';
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import { makeStyles } from '@material-ui/core/styles';
import Head from '@components/Table/head';
import { Label, GetLabel } from '@common/utils/label';
import SearchFilter from './filter'

const columns = [
	{
		id: 'jbdTitle',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00299" />,
		sort: true
	},
	{
		id: 'jbdDesigName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00300" />,
		sort: true
	},
	{
		id: 'jbdDeptName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00301" />,
		sort: true
	},

	{
		id: 'jbdLocName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00302" />,
		sort: true
	},
	{
		id: 'fullname',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00079" />,
		sort: true
	},
	{
		id: 'ijpCreatedOn',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00303" />,
		sort: true
	},
	{
		id: 'currentStatusName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00089" />,
		sort: true
	},
	{
		id: 'ijpResumeFileName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00086" />,
		sort: false
	},

	// {
	// 	id: 'action',
	// 	align: 'left',
	// 	disablePadding: false,
	// 	label: 'Action',
	// 	sort: true
	// },

];
const useStyles = makeStyles((theme) => ({
	linkBtn: {
		background: 'transparent !important',
		border: 'none !important',
	}
}))

function ApplicantsListTable(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const Applicants = useSelector(selectApplicants);
	// const uuid = useSelector(({ auth }) => auth.user.uuid);
	const searchText = useSelector(({ jobs }) => jobs.empApplicantsList.searchText);
	const totalItems = useSelector(({ jobs }) => jobs.empApplicantsList.totalItems);
	const role = useSelector(({ auth }) => auth.user.role);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(Applicants);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({});
	const [currColumn, setCurrColumn] = useState("");
	const [filterData, setfilterData] = useState({});
	
	function onChange(val){
		setfilterData(val)
		console.log(val)
	}
	
	useEffect(() => {
		let url = filterData
		url.pgNo = page
		url.pgSize = rowsPerPage
		dispatch(getApplicantsList(url));
	}, [dispatch, page]);

	useEffect(() => {
		setPage(0);
		let url = filterData
		url.pgNo = 0
		url.pgSize = rowsPerPage
		dispatch(getApplicantsList(url));
	}, [rowsPerPage, filterData]);

	useEffect(() => {
		setData(Applicants);
	}, [Applicants]);

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

	function handleClick(id, currentStatusCode) {
		if (currentStatusCode == 'APPROVED' && role.includes("INDUCTION-HR")) {
			props.history.push(`/app/jobs/internal-job-emp/new-joinee-form/${id}`);
		}
		else {
			props.history.push(`/app/jobs/jobposting/approverForm/${id}`);
		}
	}


	return (
		<div className="w-full flex flex-col">
			<SearchFilter change={onChange}/>			
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<Head
						columns={columns}
						order={order}
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
									// onClick={event => handleClick(n.id, n.currentStatusCode)}
									>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left"
											onClick={event => handleClick(n.id, n.currentStatusCode)}>
											{n.jbdTitle}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left"
											onClick={event => handleClick(n.id, n.currentStatusCode)}>
											{n.jbdDesigName}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left"
											onClick={event => handleClick(n.id, n.currentStatusCode)}>
											{n.jbdDeptName}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left"
											onClick={event => handleClick(n.id, n.currentStatusCode)}>
											{n.jbdLocName}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left"
											onClick={event => handleClick(n.id, n.currentStatusCode)}>
											{n.fullname}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left"
											onClick={event => handleClick(n.id, n.currentStatusCode)}>
											{n.ijpCreatedOn ? dateFunc.changeDate(n.ijpCreatedOn) : null}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left"
											onClick={event => handleClick(n.id, n.currentStatusCode)}>
											{n.currentStatusName}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
											<a className={classes.linkBtn} href={n.ijpResumeFileName} target="_blank" download>
												<VisibilitySharpIcon color="primary" />
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
				count={totalItems}
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

export default withRouter(ApplicantsListTable);
