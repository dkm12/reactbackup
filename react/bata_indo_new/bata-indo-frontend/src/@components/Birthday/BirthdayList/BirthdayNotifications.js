import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import trimmed from '@common/utils/trimmed';
import reducer from '@components/EmpCorner/store';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { getBirthDayWishes, selectbirthdayWishes } from '../../WorkAnniversary/store/birthdayWishesSlice ';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Avatar, Collapse, Divider } from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import dateFunc from '@common/utils/dateFunc';
import NoData from '@components/NoData/NoData';
import _ from '@lodash';


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
  content: {
    marginLeft: "55px",
    fontSize: "1.4rem",
    fontFamily: 'Muli,Roboto,"Helvetica",Arial,sans-serif',
    fontweight: 400,
    lineHeight: 1.5,
  }

}));

function EmpCornerListContent(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const birthDayWishes = useSelector(selectbirthdayWishes);
  const [data, setData] = useState(birthDayWishes);
  const uuid = useSelector(({ auth }) => auth.user.uuid);

  useEffect(() => {
    dispatch(getBirthDayWishes());
  }, [])
  useEffect(() => {
    setData(birthDayWishes);
  }, [birthDayWishes]);



  return (
    <>
      {data && _.isArray(data) && data.length === 0 &&
        < NoData />
      }
      {data && _.isArray(data) && data.map((wish, index) => {
        return (
          <>
            <Card
              key={index}
              className={classes.root}
              square
              elevation='0'>
              <CardHeader
                className='pb-0 pr-56'
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {wish && wish.wishByEmpCode && (wish.wishByEmpCode).slice(0, 1)}
                  </Avatar>
                }
                title={<Typography component="h2" variant="body1" >
                  {wish.wishByEmpCode}
                </Typography>}
                subheader={<Typography component="span" className={classes.date}>
                  <ScheduleIcon className="ml-8" style={{ fontSize: 14 }} /> {dateFunc.getHoursFromDate(wish.createdOn)}
                </Typography>}
              />
              <CardContent className='pt-5'>
                <Typography component="span" className={classes.content}>
                  {wish.wishComment}
                </Typography>
              </CardContent>
            </Card>
            <Divider variant="inset" className={classes.dvdr} component="p" />
          </>)
      })}
    </>
  );
}

export default withRouter(EmpCornerListContent)