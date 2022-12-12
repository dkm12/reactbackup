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
import { getJobsList, selectJobPostings } from '../../store/empNewPostingsSlice'
import { Link, useParams } from 'react-router-dom';
import JobPostingTableHead from './jobPostingTableHead';
import dateFunc from '@common/utils/dateFunc';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import IconButton from '@material-ui/core/IconButton';
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import Head from '@components/Table/head';
import { Label, GetLabel } from '@common/utils/label';
import SearchFilter from '../../refer-employee/newPostingLists/filter'
import CSVDownloadComp from '@components/CSVDownload/csv'

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
		id: 'ijpStatus',
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
		sort: false
	},

];

function JobPostingTable(props) {
	const dispatch = useDispatch();
	const JobPosting = useSelector(selectJobPostings);
	// const uuid = useSelector(({ auth }) => auth.user.uuid);
	const totalRecords = useSelector(({ jobs }) => jobs.empNewPostings.totalItems);
	const searchText = useSelector(({ jobs }) => jobs.empNewPostings.searchText);
	const role = useSelector(({ auth }) => auth.user.role);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(JobPosting);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({});
	const [currColumn, setCurrColumn] = useState("");
	const routeParams = useParams();
	const [filterData, setfilterData] = useState({});
	
	let csvdata = [];
	let csvheaders = [];
	if(columns){
		columns.map(n => {
			if(n.sort) csvheaders.push({title: GetLabel([n.label.props.labelId][0]), field: n.id})
		})
	}
	if (data) {
		data.map(n => {
			csvdata.push({
				jbdTitle: n.jbdTitle,
				jbdDesc: n.jbdDesc,
				jbdYOExp: n.jbdYOExp,
				jbdDesigName: n.jbdDesigName,
				jbdDeptName: n.jbdDeptName,
				jbdLocName: n.jbdLocName,
				jbdPubFrmDate: dateFunc.changeDate(n.jbdPubFrmDate),
				jbdPubToDate: dateFunc.changeDate(n.jbdPubToDate),
				jbdNumVacancy: n.jbdNumVacancy,
				ijpStatus: n.ijpStatus,
			})
		})
	}
	function onChange(val){
		setfilterData(val)
		console.log(val)
	}
	
	useEffect(() => {
		let url = filterData
		url.pgNo = page
		url.pgSize = rowsPerPage
		dispatch(getJobsList(url));
	}, [dispatch, page]);

	useEffect(() => {
		setPage(0);
		let url = filterData
		url.pgNo = 0
		url.pgSize = rowsPerPage
		dispatch(getJobsList(url));
	}, [rowsPerPage, filterData]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(_.filter(JobPosting, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
			setPage(0);
		} else {
			setData(JobPosting);
		}
	}, [JobPosting, searchText]);

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
		props.history.push(`/app/jobs/jobposting/createNewPosting/${id}`);
	}

	function apply() {
		props.history.push("/app/jobs/jobposting/applicantsForm/new");
	}
	return (
		<div className="w-full flex flex-col">
			<SearchFilter change={onChange}/>			
			<CSVDownloadComp data={csvdata} header={csvheaders} filename='internal_jobs'/>
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
										onClick={event => handleClick(n.id)}
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
											{n.ijpStatus}
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

export default withRouter(JobPostingTable);
