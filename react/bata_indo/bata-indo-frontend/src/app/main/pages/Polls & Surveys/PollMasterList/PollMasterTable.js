import FuseScrollbars from '@core/core/Scrollbars';
import _ from '@lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPollMasterList, selectPollMasterData } from '../store/empPollMasterSlice';
import { pollSurveyApi } from '../store/pollSurveyApi';
import PollMasterTableHead from './PollMasterTableHead';
import dateFunc from '@common/utils/dateFunc';
import { showMessage } from 'app/store/core/messageSlice';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import IconButton from "@material-ui/core/IconButton";
import Head from '@components/Table/head';
import { Label, GetLabel } from '@common/utils/label';
import SearchFilter from './filter'

const columns = [
	{
		id: 'Id',
		align: 'left', // right, center
		disablePadding: false,
		label: <Label labelId="BL00406" />,
		sort: true
	},
	{
		id: 'title',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00054" />,
		sort: true
	},
	{
		id: 'description',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00055" />,
		sort: true
	},
	{
		id: 'question',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00396" />,
		sort: true
	},
	{
		id: 'publishedFromDate',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00076" />,
		sort: true
	},
	{
		id: 'publishedToDate',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00077" />,
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
		id: 'action',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00195" />,
		sort: false
	}
];

function LocalConveyanceTable(props) {
	const dispatch = useDispatch();
	const PollMasters = useSelector(selectPollMasterData);
	const totalRecords = useSelector(({ pollSurvey }) => pollSurvey.pollMasterSlice.totalItems);
	const [data, setData] = useState(PollMasters);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [currColumn, setCurrColumn] = useState("");
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
		dispatch(getPollMasterList(url));
	}, [dispatch, page]);

	useEffect(() => {
		setPage(0);
		let url = filterData
		url.pgNo = 0
		url.pgSize = rowsPerPage
		dispatch(getPollMasterList(url));
	}, [rowsPerPage, filterData]);

	useEffect(() => {
		setData(PollMasters);
	}, [PollMasters]);

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

	async function handleClickButton(item) {
		console.log(item.status)
		if (item.status.toUpperCase() == 'SAVE AS DRAFT') {
			props.history.push(`/app/poll-survey/PollCreate/${item.surveyId}/editable`);
		}
		else {
			props.history.push(`/app/poll-survey/PollCreate/${item.surveyId}/none`);
		}
		// 	let postData = {
		// 		'surveyStatus': "Published"
		// 	}
		// 	let res = await pollSurveyApi.updateStatusById(item.surveyId, postData);
		// 	console.log(res);
		// 	if (res.status == '200') {
		// 		await dispatch(showMessage({ message: res.message, variant: 'success' }));
		// 	}
		// 	else dispatch(showMessage({ message: res.message, variant: 'error' }));
		// 	let dataCount = {
		// 		'pgNo': 0,
		// 		'pgSize': rowsPerPage
		// 	}
		// 	dispatch(getPollMasterList(dataCount));
		// }
		// else {
		// 	props.history.push(`/app/poll-survey/PollCreate/${item.surveyId}`);
		// }
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
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
							.map((n, index) => {
								return (
									<TableRow
										className="h-64 cursor-pointer"
										hover
										role="checkbox"
										tabIndex={-1}
										key={n.id}
										onClick={event => handleClickButton(n)}
									>
										<TableCell className="p-4 md:p-16" component="th" scope="row" >
											{index + 1}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row" >
											{n.title}
										</TableCell>
										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{n.description}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.question}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row" >
											{dateFunc.changeDate(n.publishedFromDate)}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" >
											{dateFunc.changeDate(n.publishedToDate)}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.status}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row" >
												< IconButton size='small'>
													<EditSharpIcon color="primary" />
												</IconButton>
											{/* <Button
												className="whitespace-no-wrap normal-case"
												variant="contained"
												color="primary"
												onClick={event => handleClickButton(n)}
											>
												{(n.status == "Save As Draft") && <span className="sm:flex">Publish</span>}
												{(n.status == "Expired") && <span className="sm:flex">Re-Publish</span>}
												{(n.status == "Published") && <span className="sm:flex">Edit</span>}
											</Button> */}
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
		</div >
	);
}

export default withRouter(LocalConveyanceTable);
