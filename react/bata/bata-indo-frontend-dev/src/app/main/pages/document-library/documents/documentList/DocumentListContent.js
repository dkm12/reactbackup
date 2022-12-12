import React, { useState, useEffect } from 'react';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { getDocuments, saveDocuments, selectDocuments } from '../../store/documentListsSlice';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Box, Checkbox } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import axios from 'axios';
import api from '@api';
import { showMessage } from 'app/store/core/messageSlice';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import download from '@common/utils/download';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '11px 11px 11px 11px',
  },
  root2: {
    flexGrow: 1,
    // backgroundColor: '#1212',
    padding: '11px 11px 11px 11px',
    fontSize: 'medium',
    fontWeight: 'bold',
  },
  paper: {
    padding: theme.spacing(2),
    height: 98,
    width: 139,
    padding: '2px',
    textAlign: 'left',
    border: '1px solid #bfbfbf',
    boxShadow: 'none'
    // color: theme.palette.text.secondary,
  },
  img: {
    cursor: 'pointer',
    height: '100%',
    width: '100%'
  },
  icon: {
    color: 'red',
    paddingBlock: '4px',
    marginBottom: '-3px'
  },
  imageName: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  noData: {
    color: theme.palette.text.secondary,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: '20px',
    fontSize: 'larger',
    fontWeight: 'bold'
  },
  root: {
    border: '1px solid rgba(0,0,0,0.125)',
    // width: '250px',
    borderRadius: '.25rem',
    // maxWidth: '300px',
  },
  div: {
    height: '170px',
    backgroundColor: grey[50],
    position: 'relative',
  },
  chkbx: {
    position: 'relative',
    top: '-12px',
    left: '-12px',
    zIndex: '1',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '12px',
      left: '12px',
      height: '18px',
      width: '18px',
      borderRadiuc: '.25rem',
      backgroundColor: '#ddd',
      zIndex: '-1',
    }
  },
  icon: {
    borderRadius: '.25rem',
    height: '2rem',
    paddingTop: '.4rem',
    // width: '2rem',
    position: 'absolute',
    left: '16px',
    bottom: '16px',
    width: '32px',
    height: '32px',
    overflow: 'hidden',
    textAlign: 'center',
    backgroundColor: '#af78ff',
    color: '#FFF',
  },
  cardImg: {
    maxWidth: '70px',
    margin: 'auto',
    display: 'block',
    marginTop: '24px',
  },
  cardFooter: {
    borderTop: '1px solid rgba(0,0,0,0.125)',
    backgroundColor: grey[50],
    textAlign: 'center',
    '& a': {
      backgroundColor: '#fff !important',
      borderBottom: 'none !important'
    },
  },
  icon: {
    color: '#e2001a',
    marginRight: '2px',
    cursor: 'pointer',
    paddingBlock: '4px',
    marginBottom: '-3px'
 },
  icon1: {
    display: 'flex',
    justifyContent: 'flex-end',
    color: '#e2001a',
    cursor: 'pointer',
    marginTop: '-24px'
 }
}));

const GalleryContent = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const fileList = useSelector(selectDocuments);
  const [data, setData] = useState(fileList);
  let folderId = props.folderId;
  const [isAdmin, setIsAdmin] = React.useState(false);
  const logUser = useSelector(({ auth }) => auth.user.role);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  async function checkAdmin() {
    (await (logUser).includes('ADMIN')) ? setIsAdmin(true) : setIsAdmin(false)
  }
  checkAdmin();

  useEffect(() => {

    dispatch(getDocuments(folderId));
  }, [dispatch]);

  useEffect(() => {
    setData(fileList);
  }, [fileList]);
  console.log(fileList)

  const [photoIndex, setIndex] = React.useState(0);
  const handleToggle = (ind) => {
    setIndex(ind.i);
    setIsOpen(!isOpen);
  }
  const handlePrev = () => {
    setIndex((photoIndex + fileList.length - 1) % fileList.length);
  }
  const handleNext = () => {
    setIndex((photoIndex + fileList.length + 1) % fileList.length);
  }
  const classes = useStyles();

  const handleDelete = async () => {
    setOpenDialog(false);
    let fileObj=deleteItem;
    const response = await axios.delete(api.DocumentLibraryData.deleteFile + fileObj.item.id);
    const data = await response.data;
    console.log(data);

    if (data.status == "200") {
      dispatch(showMessage({ message: 'File deleted succesfully', variant: 'success' }));
      await dispatch(getDocuments(folderId));
    }
    else {
      dispatch(showMessage({ message: 'Could not delete, Please check with administrator', variant: 'error' }));
    }

  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDeleteItem(null);
  };

  const handleOpenDialog = (item) => {
    setOpenDialog(true);
    setDeleteItem(item);
  };

  return (
    <div>
      <div className={classes.root}>
        <div className={classes.root2}>{props.folderName} ({Object.keys(fileList).length})</div>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {!Object.keys(fileList).length > 0 ? (
                <div className={classes.noData}>No Data Found</div>
              ) : null}
              {fileList.map((item, i) => {
                return <Grid item key={i} xs={6} md={3}>
                  {/* <Paper className={classes.paper} onClick={() => handleToggle({ i })}>
                    <img src={item.folderUrl} className={classes.img} justify="center"></img>
                  </Paper> */}

                  <Card className={classes.root} variant="outlined">
                    <CardContent className={classes.div}>
                      {/* <Box className={classes.chkbx}>
                        <Checkbox
                          color="secondary"
                          inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                      </Box> */}
                      <img src="/app/assets/images/icons/doclib.svg" className={classes.cardImg} alt="" />
                      {/* <Box>
                        <Typography component="span" variant="body2" className={classes.icon}>
                          {item.documentType}
                        </Typography>
                      </Box> */}
                    </CardContent>
                    <CardContent className={classes.cardFooter}>
                      {/* <a> */}
                      <Link style={{ color: grey[900] }} onClick={e=>download(item.folderUrl)}>
                        {decodeURI(item.fileName)}
                      </Link>
                      {isAdmin ? (
                        <div className={classes.icon1}>
                          <Icon className={classes.icon} onClick={() => handleOpenDialog({item})}>delete</Icon>
                        </div>
                      ) : null}
                      {/* </a> */}
                    </CardContent>
                  </Card>
                </Grid>
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete File?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure, you want to delete this file?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};
export default GalleryContent;