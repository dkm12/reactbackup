import FuseScrollbars from '@core/core/Scrollbars';
import _ from '@lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivePollList, selectActivePollData } from '../store/empPollActiveSlice';
import dateFunc from '@common/utils/dateFunc';
import { makeStyles } from '@material-ui/core/styles';
import trimmed from '@common/utils/trimmed';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import PollNow from './pollQue';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withRouter, Link } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
// import SearchFilter from '../PollMasterList/filter'

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: "100%",
		'& h2': {
			fontSize: '1.6rem',
			fontWeight: '700'
		},
		'& a': {
			color: '#e2001a'
		}
	},
	date: {
		fontSize: '1.2rem',
		color: '#999'
	},
	dvdr: {
		borderBottom: '1px solid #ddd',
		margin: '0 16px 8px'
	},
	pollBtn :{
		position: 'absolute',
		right: '20px',
		marginTop:'-18px'
	},
	pollQue: {
		width:'80%'
	},
	media: {
		height: 0,
		paddingTop: '56.25%',
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},

}));

function ActivePollsSurveyTable(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const PollMasters = useSelector(selectActivePollData);
	const totalRecords = useSelector(({ pollSurvey }) => pollSurvey.activePollSlice.totalItems);
	const [data, setData] = useState(PollMasters);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [filterData, setfilterData] = useState({});
	
	function onChange(val){
		setfilterData(val)
		console.log(val)
	}

	useEffect(() => {
		let url = filterData
		url.pgNo = page
		url.pgSize = rowsPerPage
		dispatch(getActivePollList(url));
	}, [dispatch, page]);

	useEffect(() => {
		setPage(0);
		let url = filterData
		url.pgNo = 0
		url.pgSize = rowsPerPage
		dispatch(getActivePollList(url));
	}, [rowsPerPage, filterData]);

	useEffect(() => {
		setData(PollMasters);
	}, [PollMasters]);

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	return (
		<div className="w-full flex flex-col">
			{/* <SearchFilter change={onChange}/>			 */}
			<FuseScrollbars className="flex-grow overflow-x-auto">
				{(data) && data
					.map((n, index) => {
						return (
							<React.Fragment>
								<Card key={index} className={classes.root} square elevation='0'>
									<CardHeader
										className='pb-0'
										title={n.title}
										titleTypographyProps={{ component: 'h2' }}
										subheader={<Typography className={classes.date}>{n.description}</Typography>}
										action={
											<div>
											</div>
										}
									/>
									<CardContent>
										<Typography component="span" className={classes.block} color="textPrimary" variant="body2">
											<div className={classes.pollQue}>{n.question}</div>
											<div className={classes.pollBtn}>
												<PollNow data={n}/>
											</div>
										</Typography>
									</CardContent>
								</Card>
								<Divider variant="inset" className={classes.dvdr} component="p" />
							</React.Fragment>
						)
					})}
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

export default withRouter(ActivePollsSurveyTable);