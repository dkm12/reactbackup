import React, { useEffect, useState } from 'react';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import { getGallery, saveFolderName, selectGallery } from '../../store/galleryFolderViewSlice';
import { showMessage } from 'app/store/core/messageSlice';
import FuseLoading from '@core/core/Loading';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import api from '@api';
import { Label, GetLabel } from '@common/utils/label';

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
   iconClose: {
      cursor: 'pointer',
      float: 'right',
      color: '#e2001a',
   },
   rootForm: {
      width: '50%',
      paddingTop: '24px',
      paddingBottom: '11px',
      paddingLeft: '21px'
   },
   rootFormInput: {
      width: '50%'
   },
   rootFormButton: {
      textTransform: 'none',
      margin: '18px',
   },
   paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      cursor: 'pointer',
      border: '1px solid #bfbfbf',
      boxShadow: 'none'
   },
   paperCont: {
      paddingLeft: '8px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
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

const ViewContent = (props) => {
   const classes = useStyles();
   const [isAdmin, setIsAdmin] = React.useState(false);
   const [loading, setLoading] = React.useState(true);
   const [folder, setFolder] = useState('');
   const dispatch = useDispatch();
   const folderList = useSelector(selectGallery);
   const uuid = useSelector(({ auth }) => auth.user.uuid);
   const [data, setData] = useState(folderList);
   const logUser = useSelector(({ auth }) => auth.user.role);

   const [openDialog, setOpenDialog] = React.useState(false);
   const [deleteItem, setDeleteItem] = useState(null);
   const [error, setError] = useState(false);
   async function checkAdmin() {
      (await (logUser).includes('ADMIN')) ? setIsAdmin(true) : setIsAdmin(false)
   }
   checkAdmin();
   useEffect(() => {
      async function loadFolders() {
         let url = '/GALLERY/VIDEO';
         await dispatch(getGallery(url));
         setLoading(false);
      }
      loadFolders();
   }, [dispatch]);

   useEffect(() => {
      setData(folderList);
   }, [folderList]);

   const [isOpen, setIsOpen] = React.useState(false);
   const [buttonName, setButtonName] = useState('Add');
   const [tempName, setTempName] = useState('');
   const [updateId, setUpdateId] = useState(null);
   const [disableSub, setDisableSub] = React.useState(false);
   const showAddFolder = () => { setIsOpen(true); }
   const hideAddFolder = () => {
      setIsOpen(false);
      setFolder('');
      setUpdateId(null);
      setButtonName('Add');
   }

   function handleClick(abc) {
      // props.history.push(`/gallery/img/${abc.item.id}/${abc.item.folderName}`);
      props.history.push(`/gallery/contents/${abc.item.id}/${abc.item.folderName}`);

   }
   // function handleDelete(abc) {
   // setTempName('');
   //    console.log("DELETE")
   // }
      
   const handleCloseDialog = () => {
      setOpenDialog(false);
      setDeleteItem(null);
   };

   const handleOpenDialog = (item) => {
      setOpenDialog(true);
      setDeleteItem(item);
   };

   async function handleDelete()
   {
      setOpenDialog(false);
      let folderObj=deleteItem;
         const response = await axios.delete(api.GalleryData.deleteFolder + folderObj.item.id);
	      const data = await response.data;
          console.log(data);
          if(data.status == "200") {
               dispatch(showMessage({ message: 'Folder deleted succesfully', variant: 'success' }));
               let url = '/GALLERY/VIDEO';
               await dispatch(getGallery(url));
         }
         else
         {
            dispatch(showMessage({ message: 'Could not delete, Please check with administrator', variant: 'error' }));
         }
   }

   function onChange(event) {
      if (event.target.value.length >= 2 && event.target.value.length <= 25) {
        setError(false);
      } else {
         setError(true);
      }
    }

   function handleEdit(abc) {
      console.log(abc.item.docList.length)
      if (abc.item.docList.length > 0) {
         hideAddFolder();
         dispatch(showMessage({ message: 'This folder already contains some files', variant: 'error' }));
         return;
      }
      else {
         console.log(abc)
         setIsOpen(true);
         setFolder(abc.item.folderName);
         setUpdateId(abc.item.id);
         setButtonName('Update');
         setTempName(abc.item.folderName);
      }
   }
   async function handleSubmit(event) {
      setDisableSub(true);
      event.preventDefault();
      let postData = {};
      postData = {
         "folderName": folder.trim(),
         "createdBy": uuid,
         'id': updateId,
         'folderType': 'GALLERY',
         'folderSubType': 'VIDEO'
      }
      console.log(postData)
      // await dispatch(saveFolderName(postData));
      let res = await dispatch(saveFolderName(postData));
      if (res.payload.status == "200") {
         if (updateId == null) {
            dispatch(showMessage({ message: 'Folder created succesfully', variant: 'success' }));
         }
         else {
            dispatch(showMessage({ message: 'Folder updated succesfully', variant: 'success' }));
         }
      }
      console.log(res)
      setDisableSub(false);
      let url = '/GALLERY/VIDEO';
      await dispatch(getGallery(url));
      await hideAddFolder()
   }

   return (
		(loading) ?
			<FuseLoading />
			:
      <div>
         {(isOpen && isAdmin) ? (
            <div>
               <div className={classes.root2}>{buttonName} <Label labelId="BL00066" /><Icon className={classes.iconClose} onClick={() => hideAddFolder()}>close</Icon></div>
               <form className={classes.rootForm} onSubmit={handleSubmit}>
                  <TextField 
                  value={folder}
                  helperText={error ? "Bewteen 2 to 25 characters are allowed" : ""}
                  error={error}
                  onInput={e => setFolder(e.target.value)}
                  onChange={(e) => onChange(e)}
                  id="folderName" label="Enter Folder Name" variant="outlined" className={classes.rootFormInput} />
                  <Button
                     type="submit"
                     size="small"
                     variant="contained"
                     color="primary"
                     disabled = {error ? true : (disableSub || folder.trim() == '' || (tempName.trim()).toLowerCase() == (folder.trim()).toLowerCase())}
                     className={classes.rootFormButton}>
                     {buttonName}
                  </Button>
               </form>
            </div>
         ) : null}
         <div className={classes.root2}><Label labelId="BL00066" />
            {(isAdmin && !isOpen) ? (<div className={classes.iconClose} onClick={() => showAddFolder()}>+ <Label labelId="BL00426" /></div>) : null}
         </div>
         <div className={classes.root}>
            <Grid container className={classes.gridForm} spacing={3}>
               {folderList.map((item, i) => {
                  return <Grid item xs={3} key={item.id}>
                     <Paper className={classes.paper}>
                        <div className={classes.paperCont} onClick={() => handleClick({ item })}>
                           <Icon className={classes.icon}>folder</Icon>
                           <span>{item.folderName}</span>
                        </div>
                        {isAdmin ? (
                           <div className={classes.icon1}>
                              <Icon className={classes.icon} onClick={() => handleEdit({ item })}>edit</Icon>
                              <Icon className={classes.icon} onClick={() => handleOpenDialog({item})}>delete</Icon>
                              {/* <Icon className={classes.icon} onClick={() => handleEdit({ item })}>delete</Icon> */}
                           </div>
                        ) : null}
                     </Paper>
                  </Grid>
               })}
            </Grid>
         </div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Folder?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure, you want to delete this folder?
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

export default withRouter(ViewContent);