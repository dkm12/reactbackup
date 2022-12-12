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
import { getReferalApplicant, selectReferalApplicant } from '../../store/referalApplicantSlice'
import { Link, useParams } from 'react-router-dom';
import dateFunc from '@common/utils/dateFunc';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import FuseLoading from '@core/core/Loading';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import TouchApp from '@material-ui/icons/TouchApp';
import Head from '@components/Table/head';
import { Label, GetLabel } from '@common/utils/label';
import SearchFilter from './filter'
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import { makeStyles } from '@material-ui/core/styles';
import CSVDownloadComp from '@components/CSVDownload/csv'
import download from '@common/utils/download';

const columns = [
	{
		id: 'jrtFullName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00079" />,
		sort: true
	},
	{
		id: 'jrtYOExp',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00071" />,
		sort: true
	},
	{
		id: 'jrtCurrLocName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00083" />,
		sort: true
	},
	{
		id: 'jrtCurrDesgName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00084" />,
		sort: true
	},
	{
		id: 'jrtCurrDeptName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00085" />,
		sort: true
	},
	{
		id: 'jrtReffByEmpName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00087" />,
		sort: true
	},
	{
		id: 'createdOn',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00088" />,
		sort: true
	},
	{
		id: 'jrtStatus',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00089" />,
		sort: true
	},
	{
		id: 'jrtResumeAttachId',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00086" />,
		sort: false
	},
];

const useStyles = makeStyles((theme) => ({
	linkBtn: {
		background: 'transparent !important',
		border: 'none !important',
	}
}))

function JobPostingTable(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const JobPosting = useSelector(selectReferalApplicant);
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
	
	let csvdata = [];
	let csvheaders = [];
	if(columns){
		columns.map(n => {
			if(n.sort) csvheaders.push({label: GetLabel([n.label.props.labelId]), key: n.id})
		})
	}
	if (data) {
		data.map(n => {
			csvdata.push({
				jrtFullName: n.jrtFullName,
				jrtYOExp: n.jrtYOExp,
				jrtCurrLocName: n.jrtCurrLocName,
				jrtCurrDesgName: n.jrtCurrDesgName,
				jrtCurrDeptName: n.jrtCurrDeptName,
				jrtReffByEmpName: n.jrtReffByEmpCode+' - '+n.jrtReffByEmpName,
				createdOn: dateFunc.changeDate(n.createdOn),
				jrtStatus: n.jrtStatus
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
		dispatch(getReferalApplicant(url));
	}, [dispatch, page]);

	useEffect(() => {
		setPage(0);
		let url = filterData
		url.pgNo = 0
		url.pgSize = rowsPerPage
		dispatch(getReferalApplicant(url));
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
		if (item.jrtJobId != null && role.includes("TALENT-HR")) {
			props.history.push(`/app/jobs/refer-emp/application-form/${item.jrtJobId}/${item.id}`);
		}
		if (item.id != null && role.includes("INDUCTION-HR") && item.jrtStatus.toUpperCase() == 'SELECTED') {
			props.history.push(`/app/jobs/refer-emp/new-joinee-form/${item.id}`);
		}
	}

	return (
		// (loading || !data.length) ?
		// 	<FuseLoading />
		// 	:
		<div className="w-full flex flex-col">
			<SearchFilter change={onChange}/>			
			<CSVDownloadComp data={csvdata} header={csvheaders} filename='referral_applicants'/>
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
									>

										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(n)}>
											{n.jrtFullName}
										</TableCell>

										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row" onClick={event => handleClick(n)}>
											{n.jrtYOExp}
										</TableCell>
										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row" onClick={event => handleClick(n)}>
											{n.jrtCurrLocName}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(n)} align="left">
											{n.jrtCurrDesgName}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(n)} align="left">
											{n.jrtCurrDeptName}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(n)} align="left">
											{n.jrtReffByEmpName}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(n)} align="left">
											{(n.createdOn) ? dateFunc.changeDate(n.createdOn) : null}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row" onClick={event => handleClick(n)} align="left">
											{n.jrtStatus}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left">

											<a className={classes.linkBtn} onClick={e=>download(n.jrtResumeAttachId)}>
												<VisibilitySharpIcon color="primary" />
											</a>
										</TableCell>


										{/* <TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
											{n.jbdAttachId}
										</TableCell> */}
										{/* <TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
										{n.outcome == "SAVE" ?
												<a onClick={event => handleClick(n)}>
												<EditSharpIcon color="primary" />
											</a>
											: <a onClick={event => handleClick(n)}>
												<VisibilitySharpIcon color="primary" />
											</a>}	
										</TableCell> */}
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