import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import Link from '@material-ui/core/Link';

function getFileName(url) {
    let filename = url.substring(url.lastIndexOf('/') + 1);
    if (!(filename.indexOf('.') == -1)) {
        return { name: filename.split('.')[0], type: filename.split('.')[1] }
    } else {
        return null
    }
}
const useStyles = makeStyles((theme) => ({
    link: {
        border: 0,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        justifyItems: 'center',
        borderRadius: '6px',
        height: '30px',
        padding: '0 10px',
        fontSize: '12px'
    }
}));
function Attachment({ src, width, height, maxHeight, maxWidth, minHeight, minWidth, image, title, style, className }) {
    const classes = useStyles();
    const [error, setError] = useState(false)
    const [filename, setFileName] = useState(getFileName(src))

    return (
        <div className="flex justify-left" style={{ width, height, maxHeight, maxWidth, minHeight, minWidth, ...style }}>
            {filename && <a className={classes.link} href={src} target="_blank">{filename.name.replace(/%20/g, " ")}</a>}
            {/* {!error && (
                <img src={src} onError={setError(true)} />
            )}

            {error && (
                <>
                    <BrokenImageIcon fontSize='24px'/>
                    <spna>Image link broken</spna>
                </>
            )} */}
        </div>
    )
}

export default Attachment;
