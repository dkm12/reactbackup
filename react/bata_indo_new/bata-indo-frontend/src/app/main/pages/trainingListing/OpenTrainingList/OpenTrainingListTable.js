import FuseScrollbars from '@core/core/Scrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getOpenTrainingList, selectOpenTrainingList } from '../store/empOpenTrainingListSlice';
//import OpenTrainingListTableHead from './OpenTrainingListTableHead';
import { Link } from 'react-router-dom';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';
import dateFunc from '@common/utils/dateFunc';
import IconButton from '@material-ui/core/IconButton';
import Head from '@components/Table/head';
import { Label, GetLabel } from '@common/utils/label';
import SearchFilter from './filterOpenTraining';
const columns = [
	{
		id: 'trngName',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00379" />,
		sort: true
	},
	{
		id: 'trngDuration',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00383" />,
		sort: true
	},
	{
		id: 'trngDesc',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00384" />,
		sort: true
	},

	{
		id: 'learningPlatform',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00381" />,
		sort: true
	},
	{
		id: 'trngCategory',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00365" />,
		sort: true
	},
	{
		id: 'trngSubCategory',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00368" />,
		sort: true
	},
	{
		id: 'isApplied',
		align: 'left',
		disablePadding: false,
		label: <Label labelId="BL00386" />,
		sort: false
	}
];

function OpenTrainingListTable(props) {
	const dispatch = useDispatch();
	const openTrainingList = useSelector(selectOpenTrainingList);
	const uuid = useSelector(({ auth }) => auth.user.uuid);
	const searchText = useSelector(({ training }) => training.empOpenTrainingList.searchText);
	const totalRecords = useSelector(({ training }) => training.empOpenTrainingList.totalRecords);

	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(openTrainingList);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({});
	const [currColumn, setCurrColumn] = useState("");
	const [filterData, setfilterData] = useState({});
	useEffect(() => {
		dispatch(getOpenTrainingList(
			{
				uuid: uuid,
				page: page,
				rowsPerPage: rowsPerPage,
				filterData: filterData
			}));
	}, [dispatch, page]);

	useEffect(() => {
		setPage(0);
		dispatch(getOpenTrainingList(
			{
				uuid: uuid,
				page: 0,
				rowsPerPage: rowsPerPage,
				filterData: filterData
			}));
	}, [rowsPerPage,filterData]);

	useEffect(() => {
		if (searchText.length !== 0) {
			// setData(_.filter(openTrainingList, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
			// setPage(0);
		} else {
			setData(openTrainingList);
		}
	}, [openTrainingList, searchText]);

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
				[property]:{
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
		props.history.push(`/app/employee-service/view-training/${item.id}`);
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

	function onFilterChange(val){
		setfilterData(val);
	}


	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
			<SearchFilter change={onFilterChange}/>

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
											{n.trngName}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.trngDuration}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.trngDesc}
										</TableCell>

										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{n.learningPlatform}
										</TableCell>
										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{n.trngCategoryName}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
											{n.trngSubCategoryName}
										</TableCell>
										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
											{n.isApplied === true ? "Yes" : "No"}
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


export default withRouter(OpenTrainingListTable);
