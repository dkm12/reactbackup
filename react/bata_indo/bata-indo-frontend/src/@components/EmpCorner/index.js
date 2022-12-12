import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { makeStyles } from '@material-ui/core/styles';
import _ from '@lodash';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import ReadMore from './Topic';
import { getEmpCornerList, selectEmpCorners } from './store/empEmpCornersSlice';
import Input from '@material-ui/core/Input';
import ReplyIcon from '@material-ui/icons/Reply';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import ScheduleIcon from '@material-ui/icons/Schedule';
import dateFunc from '@common/utils/dateFunc';
import trimmed from '@common/utils/trimmed';
import { Label, GetLabel } from '@common/utils/label';
// import Topic from './Topic';
import Scrollbars from '@core/core/Scrollbars';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflowWrap: 'break-word',
    '& h2': {
      fontSize: '1.6rem',
      fontWeight: '700',
      marginRight: '8px'
    },
    '& a': {
      color: '#e2001a'
    },
    '& input': {
      borderBottom: '1px solid #ddd'
    },
    '& button:hover': {
      textDecoration: 'none'
    }
  },
  dvdr: {
    borderBottom: '1px solid #ddd!important',
    margin: '0 8px!important'
  },
  more: {
    // marginLeft: '8px',
    color: '#e2001a',
    display: 'inline-block'
  },
  date: {
    display: 'inline-block',
    fontSize: '1.2rem',
    color: '#999'
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
  vm: {
    height: '27px',
    width: '100%',
    padding: '0 10px',
    textAlign: 'right'
  },
  avatar: {
    background: '#e2001a',
  },
  li: {
    '&:hover': {
      cursor: "pointer",
      background: "#f9f9f9"
    }
  },
  ecr: {
        padding: '0 12px',
        height: '221px'
    }
}));

function generate(element) {
  return [0, 1, 2].map((value) => React.cloneElement(element, { key: value }));
}

const EmpCorner = (props) => {
  const classNamees = useStyles();
  const history = useHistory();
  const [dense, setDense] = React.useState(false);
  const EmpCorners = useSelector(selectEmpCorners);
  const [secondary, setSecondary] = React.useState(false);

  const dispatch = useDispatch();
  const uuid = useSelector(({ auth }) => auth.user.uuid);

  useEffect(() => {
    dispatch(getEmpCornerList());
  }, [dispatch]);

  useEffect(() => {
    console.log('EmpCorners :>> ', EmpCorners);
  }, [EmpCorners])

  const Click = () => {
    history.push('/app/empCorner/form/new')
  }
  function handleClick(item) {
    props.history.push(`/app/empCorner/detailPage/${item.id}`);
  }

  return (
    <div className={classNamees.root}>
      <div className="flex flex-1 items-center justify-end px-12">
        <Typography>
          <Link
            component="button"
            variant="body2"
            onClick={Click}
          >
            <Label labelId="BL00154" /> <AddCircleOutlineOutlinedIcon className="my-4" color="primary" />
          </Link>
        </Typography>
      </div>
      <Divider variant="middle" />
      <Scrollbars className={classNamees.ecr}>
      <List dense={dense}>
        {EmpCorners && EmpCorners.map((ecr, index) => {
          if (index < 3) {
            return (<>
              <ListItem alignItems="flex-start"
                className={classNamees.li}
                hover
                onClick={event => handleClick(ecr)}
              >
                <ListItemText
                  primary={(
                    <React.Fragment>
                      <Typography component="h2" variant="body1" style={{ display: 'inline' }}>
                        {ecr.topicTitle}
                        {/* <Topic data={ecr} /> */}
                      </Typography>
                      <Typography className={classNamees.more} variant="body2">
                        <Label labelId="BL00010" />...
                      </Typography>
                    </React.Fragment>
                  )}
                  secondary={(
                    <React.Fragment>
                      <Typography component="span" className={classNamees.date}>
                        {ecr.createdByName}
                      </Typography>
                      <Typography component="span" className={classNamees.date}>
                        <ScheduleIcon className="ml-8" style={{ fontSize: 14, marginTop: '-4px' }} /> {dateFunc.getHoursFromDate(ecr.createdOn)}
                      </Typography>
                      <Typography component="span" className={classNamees.commentAction}>
                        <ThumbUpAltIcon style={{ fontSize: 14, marginTop: '-4px' }} /> Likes ({ecr.topicLikesCount})
                        <CommentIcon className="ml-8" style={{ fontSize: 14, marginTop: '-4px' }} /> Comments ({ecr.commentCount})
                      </Typography>
                    </React.Fragment>
                  )}
                />
              </ListItem>
              <Divider variant="inset" className={classNamees.dvdr} component="li" />
            </>
            )
          }
        })

        }
      </List>
      </Scrollbars>
      <div className={classNamees.vm}>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            history.push("/app/empCorner/list");
          }}
        >
          <Label labelId="BL00159" />
        </Link>
      </div>
    </div>

  );
};

export default withRouter(EmpCorner);
