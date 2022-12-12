import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import trimmed from '@common/utils/trimmed';
import reducer from '@components/Announcement/store';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ReadMore from '@components/Announcement/readMore';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { selectAnnouncements, getAnnouncementListForUser } from '@components/Announcement/store/empAnnouncementsSlice'
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import EditSharpIcon from '@material-ui/icons/EditSharp';
import dateFunc from '@common/utils/dateFunc';
import TablePagination from '@material-ui/core/TablePagination';
import SearchFilter from './Filter'



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

function AnnouncementListContent(props) {


  const dispatch = useDispatch();
  const classes = useStyles();
  const announcements = useSelector(selectAnnouncements);
  const [selected, setSelected] = useState([]);
  const role = useSelector(({ auth }) => auth.user.role);
  // const [data, setData] = useState(NewAnn);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalRecords = useSelector(({ announcement }) => announcement.announcementsList.totalRecords);
  const [filterData, setfilterData] = useState({});

  function onChange(val) {
    setfilterData(val)
    console.log(val)
  }

  useEffect(() => {
    console.log(announcements);
  }, [announcements])

  // useEffect(() => {

  //   dispatch(getAnnouncementListForUser());


  // }, [])
  useEffect(() => {
    let postData = filterData
    postData.pgNo = page
    postData.pgSize = rowsPerPage
    dispatch(getAnnouncementListForUser(postData));
  }, [dispatch, page]);

  useEffect(() => {
    setPage(0);
    let postData = filterData
    postData.pgNo = 0
    postData.pgSize = rowsPerPage
    dispatch(getAnnouncementListForUser(postData));
  }, [rowsPerPage, filterData]);


  function handleClick(id) {
    props.history.push(`/app/announcement/form/${id}`);
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
      {announcements && announcements.map((item, index) => {
        return (
          <React.Fragment>
            <Card key={index} className={classes.root} square elevation='0'>
              <CardHeader
                className='pb-0'
                title={item.annTitle}
                titleTypographyProps={{ component: 'h2' }}
                subheader={<Typography className={classes.date}>{dateFunc.blogDate(item.createdOn)}</Typography>}
                action={
                  <div>
                    {role.includes("ADMIN") &&

                      <IconButton onClick={event => handleClick(item.id)} aria-label="edit">
                        <EditSharpIcon />
                      </IconButton>
                    }
                  </div>

                }
              />
              <CardContent>
                <Typography component="span" className={classes.block} color="textPrimary" variant="body2">
                  {trimmed.input(item.annDesc, 125)}
                  <ReadMore data={item} />
                </Typography>

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

export default withRouter(AnnouncementListContent)