import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import _ from '@lodash';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import CardHeading from '@core/core/CardHeading';

import { useDispatch, useSelector } from 'react-redux';
import { getAnnouncementListForUser, selectAnnouncements } from './store/empAnnouncementsSlice';
import { withRouter } from 'react-router-dom';
import Scrollbars from '@core/core/Scrollbars';
import dateFunc from '@common/utils/dateFunc';
import trimmed from '@common/utils/trimmed';
import ReadMore from './readMore';
import { Label, GetLabel } from '@common/utils/label';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& h2': {
      fontSize: '1.6rem',
    },
    '& a': {
      color: '#e2001a'
    }
  },
  cTitle: {
    borderBottom: '2px solid #ddd',
    padding: '.5rem',
    margin: '.5rem .5rem 0',
    textTransform: 'uppercase',
  },
  dvdr: {
    borderBottom: '1px solid #ddd!important',
    margin: '0 8px!important'
  },
  more: {
    margin: '0 8px!important'
  },
  date: {
    display: 'block',
    fontSize: '1.2rem',
    color: '#999'
  },
  vm: {
    height: '27px',
    width: '100%',
    padding: '0 10px',
    textAlign: 'right'
  },
  anns: {
    padding: '0 12px',
    height: '318px'
  }
}));

function generate(element) {
  return [0, 1, 2].map((value) => React.cloneElement(element, { key: value }));
}

const Announcement = () => {
  const classNamees = useStyles();
  const history = useHistory();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const dispatch = useDispatch();
  const announcements = useSelector(selectAnnouncements);
  const uuid = useSelector(({ auth }) => auth.user.uuid);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterData, setfilterData] = useState({});

  // const announcements = useSelector(({ announcement }) => announcement);

  // const [data, setData] = useState(announcements);

  // useEffect(() => {
  //   dispatch(getAnnouncementListForUser());
  // }, [dispatch]);
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

  // useEffect(() => {
  //   console.log('announcements :>> ', announcements);
  // }, [announcements])

  return (
    <>
      <div>
        <div className={classNamees.root}>
          {/* <CardHeading variant="subtitle1">Announcement
          </CardHeading> */}
          {/* <Divider variant="inset" /> */}

          <Scrollbars className={classNamees.anns}>
            <List dense={dense}>
              {announcements && announcements.map((anns, index) => {
                if (index < 3) {
                  return (<>
                    <ListItem>
                      <ListItemText
                        primary={(
                          <Typography component="h2" variant="body1" style={{ fontWeight: 700 }}>
                            {anns.annTitle}
                          </Typography>
                        )}
                        secondary={(
                          <React.Fragment>
                            <Typography component="span" className={classNamees.block} color="textPrimary" variant="body2">
                              {trimmed.input(anns.annDesc, 125)}
                              <ReadMore data={anns} />
                              {/* <Link href="#" variant="body2" className={classNamees.more}>Read more...</Link> */}
                            </Typography>
                            <Typography component="span" className={classNamees.date}>
                              {dateFunc.blogDate(anns.createdOn)}
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
                history.push("/app/announcement/list");
              }}
            >
              <Label labelId="BL00159" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Announcement);
