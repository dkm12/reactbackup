import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import trimmed from '@common/utils/trimmed';
import reducer from '@components/EmpCorner/store';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import Topic from '@components/EmpCorner/Topic';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { getEmpCornerList, selectEmpCorners } from '@components/EmpCorner/store/empEmpCornersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Avatar, Divider } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import EditSharpIcon from '@material-ui/icons/EditSharp';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import ScheduleIcon from '@material-ui/icons/Schedule';
import dateFunc from '@common/utils/dateFunc';
import TablePagination from '@material-ui/core/TablePagination';
import { Label, GetLabel } from '@common/utils/label';
import SearchFilter from './Filter'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    wordBreak: 'break-word',
    '& h2': {
      fontSize: '1.6rem',
      fontWeight: '700',
      marginRight: '8px',
      color: 'rgba(0, 0, 0, 0.87)'
    },
    '& a': {
      color: '#e2001a'
    },
    '&:hover': {
      cursor: "pointer",
      background: "#f9f9f9"
    }
  },
  more: {
    // marginLeft: '8px',
    paddingLeft: '5px',
    color: '#e2001a',
    display: 'inline-block'
  },
  date: {
    display: 'inline-block',
    fontSize: '1.2rem',
    color: '#999'
  },
  dvdr: {
    borderBottom: '1px solid #ddd',
    margin: '0 16px'
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
  avatar: {
    background: '#e2001a',
  },
  commentAction: {
    display: 'block',
    fontSize: '1.2rem',
    color: '#999',
    marginTop: '4px',
    '& button': {
      fontSize: '1.2rem',
      color: '#999'
    },
  },

}));

function EmpCornerListContent(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const empCorners = useSelector(selectEmpCorners);
  const uuid = useSelector(({ auth }) => auth.user.uuid);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalRecords = useSelector(({ empCorner }) => empCorner.empCornersList.totalRecords);
  const [filterData, setfilterData] = useState({});

  function onChange(val) {
    setfilterData(val)
    console.log(val)
  }

  useEffect(() => {
    let postData = filterData
    postData.pgNo = page
    postData.pgSize = rowsPerPage
    dispatch(getEmpCornerList(postData));
  }, [dispatch, page]);

  useEffect(() => {
    setPage(0);
    let postData = filterData
    postData.pgNo = 0
    postData.pgSize = rowsPerPage
    dispatch(getEmpCornerList(postData));
  }, [rowsPerPage, filterData]);

  function Click(topicId) {
    props.history.push(`/app/empCorner/form/${topicId}`);
  }
  function handleClick(item) {
    props.history.push(`/app/empCorner/detailPage/${item.id}`);
  }
  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  return (
    <>
      <SearchFilter change={onChange} />
      {empCorners && empCorners.map((item, index) => {
        let createdBy = item.createdBy;
        return (
          <React.Fragment>
            <div style={{ position: 'absolute', right: '24px' }}>
              {/* {role.includes("ADMIN") &&
                <IconButton style={{ marginTop: '8px' }} onClick={event => Click(item.topicId)} aria-label="edit">
                  <EditSharpIcon fontSize="small" />
                </IconButton>
              } */}
              {uuid.includes(`${createdBy}`) &&
                <IconButton onClick={event => Click(item.id)} aria-label="edit">
                  <EditSharpIcon fontSize="small" color="primary" />
                </IconButton>
              }
            </div>
            <Card
              key={index}
              className={classes.root}
              square
              elevation='0'
              onClick={event => handleClick(item)}>
              <CardHeader
                className='pb-0 pr-56'
                // avatar={
                //   <Avatar aria-label="recipe" className={classes.avatar}>
                //     {item.createdByName.charAt(0)}
                //   </Avatar>
                // }
                subheader={<div><Typography component="h2" variant="body1" style={{ display: 'inline' }}>
                  {item.topicTitle}
                  <Typography className={classes.more} variant="body2">
                    <Label labelId="BL00010" />...
                  </Typography>
                  {/* <Topic data={item} /> */}
                </Typography>

                </div>}
                action={
                  <div>
                    {/*    {role.includes("ADMIN") &&
                    <IconButton onClick={event => Click(item.topicId)} aria-label="edit">
                       <EditSharpIcon fontSize="small" />
                     </IconButton>
                   } */}
                  </div>
                }
              />
              <CardContent className='pt-0'>
                <React.Fragment>
                  <Typography component="span" className={classes.date}>
                    {item.createdByName}
                  </Typography>
                  <Typography component="span" className={classes.date}>
                    <ScheduleIcon className="ml-8" style={{ fontSize: 14, marginTop: '-2px' }} /> {dateFunc.getHoursFromDate(item.createdOn)}
                  </Typography>
                  <Typography component="span" className={classes.commentAction}>
                    <ThumbUpAltIcon style={{ fontSize: 14, marginTop: '-2px' }} /> Likes ({item.topicLikesCount})
                    <CommentIcon className="ml-8" style={{ fontSize: 14, marginTop: '-2px' }} /> Comments ({item.commentCount})
                  </Typography>
                </React.Fragment>
              </CardContent>
            </Card>
            <Divider variant="inset" className={classes.dvdr} component="p" />
          </React.Fragment>
        )
      })}
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
    </>
  );
}

export default withRouter(EmpCornerListContent)