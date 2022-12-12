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
import { getRefJobsList, selectRefJobPostings } from '../../store/refEmpNewPostingsSlice'
import { Link, useParams } from 'react-router-dom';
import JobPostingTableHead from './jobPostingTableHead';
import dateFunc from '@common/utils/dateFunc';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import FuseLoading from '@core/core/Loading';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import TouchApp from '@material-ui/icons/TouchApp';
import Head from '@components/Table/head';
import { Label, GetLabel } from '@common/utils/label';
import SearchFilter from './filter'

const columns = [
	{
		id: 'jbdTitle',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00069" />,
		sort: true
	},
	{
		id: 'jbdDesc',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00070" />,
		sort: true
	},
	{
		id: 'jbdYOExp',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00071" />,
		sort: true
	},

	{
		id: 'jbdDesigName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00072" />,
		sort: true
	},
	{
		id: 'jbdDeptName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00073" />,
		sort: true
	},
	{
		id: 'jbdLocName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00074" />,
		sort: true
	},
	{
		id: 'jbdPubFrmDate',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00076" />,
		sort: true
	},
	{
		id: 'jbdPubToDate',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00077" />,
		sort: true
	},
	{
		id: 'jbdNumVacancy',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00075" />,
		sort: true
	},
	{
		id: 'action',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00195" />,
		sort: false
	}
];

function JobPostingTable(props) {
	const dispatch = useDispatch();
	const JobPosting = useSelector(selectRefJobPostings);
	const role = useSelector(({ auth }) => auth.user.role);
	const totalRecords = useSelector(({ jobs }) => jobs.refEmpNewPostings.totalRecords);
	const [selected, setSelected] = useState([]);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState(JobPosting);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [currColumn, setCurrColumn] = useState("");
	const [order, setOrder] = useState({});
	const [filterData, setfilterData] = useState({});
	// const temp = [{name: 'jbdTitle', type: 'select', values: []},
	// {name: 'jbdDeptName', type: 'select', values: [{title: 'Dept1', val: 'dept1'},{title: 'Dept2', val: 'dept2'}]},
	// {name: 'jbdDesgName', type: 'select', values: [{title: 'Desg1', val: 'desg1'},{title: 'Desg2', val: 'desg2'}]}]
	
	function onChange(val){
		setfilterData(val)
		console.log(val)
	}
	
	useEffect(() => {
		let url = filterData
		url.pgNo = page
		url.pgSize = rowsPerPage
		dispatch(getRefJobsList(url));
	}, [dispatch, page]);

	useEffect(() => {
		setPage(0);
		let url = filterData
		url.pgNo = 0
		url.pgSize = rowsPerPage
		dispatch(getRefJobsList(url));
	}, [rowsPerPage, filterData]);

	useEffect(() => {
		setData(JobPosting);
	}, [JobPosting]);

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

	function handleClick(item) {
		console.log(item)
		props.history.push(`/app/jobs/refer-emp/application-form/${item.jbdId}/new`);
	}

	function handleEdit(item) {
		console.log(item)
		props.history.push(`/app/jobs/refer-emp/ref-job-entry/${item.jbdId}`);
	}

	return (
		// (loading || !data.length) ?
		// 	<FuseLoading />
		// 	:
		<div className="w-full flex flex-col">
			<SearchFilter change={onChange}/>			
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
										onClick={event => handleEdit(n)}
									// onClick={event => handleClick(n)}
									>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.jbdTitle}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.jbdDesc}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.jbdYOExp}
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
											{dateFunc.changeDate(n.jbdPubFrmDate)}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
											{dateFunc.changeDate(n.jbdPubToDate)}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
											{n.jbdNumVacancy}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left">

											{/* <Button
												color="primary"
												variant="contained"
												className="mr-4"
												onClick={event => handleClick(n)}>Apply</Button> */}
											{/* < IconButton onClick={event => handleClick(n)} size='small'>
												<TouchApp color="primary" />
											</IconButton> */}

											{role.includes("TALENT-HR") &&
												// <Button color="primary"
												// 	variant="contained"
												// 	onClick={event => handleEdit(n)}>Edit</Button>
												< IconButton onClick={event => handleEdit(n)} size='small'>
													<EditSharpIcon color="primary" />
												</IconButton>
											}
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

export default withRouter(JobPostingTable);