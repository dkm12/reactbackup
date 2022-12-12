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
import EditSharpIcon from '@material-ui/icons/EditSharp';
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import AttachmentIcon from '@material-ui/icons/VisibilitySharp';
import FuseLoading from '@core/core/Loading';
import dateFunc from '@common/utils/dateFunc';
import { makeStyles } from '@material-ui/core/styles';
import Head from '@components/Table/head';
import { Label, GetLabel } from '@common/utils/label';
import SearchFilter from './filter'

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
		id: 'jrtReffByEmpCode',
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

function ApplicantTable(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const referalList = useSelector(selectReferalApplicant);
	const role = useSelector(({ auth }) => auth.user.role);
	const totalRecords = useSelector(({ jobs }) => jobs.referalApplicant.totalItems);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(referalList);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [currColumn, setCurrColumn] = useState("");
	const [loading, setLoading] = useState(false);
	const [order, setOrder] = useState({});
	const [filterData, setfilterData] = useState({});
	
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
		setData(referalList);
	}, [referalList]);

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

	function handleClick(item) {
		console.log(item)
		if (item.jrtJobId != null && role.includes("TALENT-HR")) {
			props.history.push(`/app/jobs/refer-emp/application-form/${item.jrtJobId}/${item.id}`);
		}
		if (item.id != null && role.includes("INDUCTION-HR") && item.jrtStatus.toUpperCase() == 'SELECTED') {
			props.history.push(`/app/jobs/refer-emp/new-joinee-form/${item.id}`);
		}
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
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

											<a className={classes.linkBtn} href={n.jrtResumeAttachId} target="_blank" download>
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

// export default withRouter(JobPostingTable);
export default withRouter(ApplicantTable);