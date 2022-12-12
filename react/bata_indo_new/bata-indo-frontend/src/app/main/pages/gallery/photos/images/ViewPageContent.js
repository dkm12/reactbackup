import React, { useState, useEffect } from 'react';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { useDispatch, useSelector } from 'react-redux';
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
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  // const [loadMsg, setLoadMsg] = useState('Loading...');
  const fileList = useSelector(selectImages);
  const [data, setData] = useState(fileList);
  useEffect(() => {
    async function loadFiles(){
      let getUrl = props.folderId + '/image'
      await dispatch(getImages(getUrl));
      setLoading(false);
    }
    loadFiles();
  }, [dispatch]);

  useEffect(() => {
    setData(fileList);
  }, [fileList]);
  console.log(fileList)

  // async function loadData() {
  //   if (loadMsg != 'Loading...') { return; }
  //   let getUrl = props.folderId + '/image';
  //   let res = await dispatch(getImages(getUrl));
  //   if (!res.payload || !res.payload.length) { await setLoadMsg('No Data Found'); }
  //   else { await setLoadMsg('Loaded'); }
  // }
  // loadData();

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
              {/* {((loadMsg == 'Loading...') || (loadMsg == 'No Data Found')) ? ( */}
              {!Object.keys(fileList).length > 0 ? (
                <div className={classes.noData}>No Data Found</div>
              ) : null}
              {fileList.map((item, i) => {
                return <Grid item key={i}>
                  <Paper className={classes.paper} onClick={() => handleToggle({ i })}><img src={item.folderUrl} className={classes.img} justify="center"></img>
                    {/* <div className={classes.imageName}>{item.fileName}</div> */}
                  </Paper>
                </Grid>
              })}
            </Grid>
          </Grid>
          {isOpen ? (
            <Lightbox
              mainSrc={fileList[photoIndex].folderUrl}
              nextSrc={fileList[(photoIndex + 1) % fileList.length].folderUrl}
              prevSrc={fileList[(photoIndex + fileList.length - 1) % fileList.length].folderUrl}
              onCloseRequest={() => handleToggle({ i: 0 })}
              onMovePrevRequest={() => handlePrev()}
              onMoveNextRequest={() => handleNext()}
            />
          ) : null}
        </Grid>
      </div>
    </div>
  );
};
export default GalleryContent;