import React, { useState, useEffect } from 'react';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ReactImageVideoLightbox from "react-image-video-lightbox";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import { getImages, saveImages, selectImages } from '../../store/imageViewsSlice';
import FuseLoading from '@core/core/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '11px 11px 11px 11px',
  },
  root2: {
    flexGrow: 1,
    backgroundColor: '#1212',
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
  }
}));

const GalleryContent = (props) => {
  const [fileUrl, setfileUrl] = React.useState([]);
  const [click, setClick] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const fileList = useSelector(selectImages);
  const [data, setData] = useState(fileList);

  useEffect(() => {
    async function getFiles() {
      let getRequest = props.folderId+'/video';
      await dispatch(getImages(getRequest));
      await setLoading(false);
    }
    getFiles();
  }, [dispatch]);

  useEffect(() => {
    setData(fileList);
  }, [fileList]);

  const [photoIndex, setIndex] = React.useState(0);
  async function handleToggle(ind) {
    if (click == 0) {
      for await (let item of fileList) {
        await fileUrl.push({
          url: item.folderUrl,
          type: "video",
          title: item.fileName,
        })
      }
    }
    await setClick(1);
    console.log(fileUrl);
    await setIndex(ind.i);
    await setIsOpen(!isOpen);
  }
  
  const classes = useStyles();

  return (
		(loading) ?
			<FuseLoading />
			:
    <div>
      <div className={classes.root}>
        <div className={classes.root2}>{props.folderName} ({Object.keys(fileList).length})</div>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
            {!Object.keys(fileList).length>0 ? (
              <div className={classes.noData}>No Data Found</div>
            ):null}
              {fileList.map((item, i) => {
                return <Grid item key={i}>
                  <Paper className={classes.paper} onClick={() => handleToggle({ i })}>
                    <video className={classes.img} justify="center">
                      <source src={item.folderUrl} type="video/mp4"/>
                    </video>
                  </Paper>
                </Grid>
              })}
            </Grid>
          </Grid>
          {isOpen ? (
             <ReactImageVideoLightbox
             data={fileUrl}
             startIndex={photoIndex}
             showResourceCount={true}
             onCloseCallback={() => handleToggle({ i: 0 })} />
          ) : null}
        </Grid>
      </div>
    </div>
  );
};
export default GalleryContent;