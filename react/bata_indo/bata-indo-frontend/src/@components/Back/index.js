import FuseAnimate from '@core/core/Animate';
import FuseLoading from '@core/core/Loading';
import FusePageSimple from '@core/core/PageSimple';
import { useDeepCompareEffect } from '@core/hooks';
import _ from '@lodash';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withReducer from 'app/store/withReducer';
import SmartForm from '@smart-form';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import api from '@api';
import History from '@components/History';
import { Label, GetLabel } from '@common/utils/label';
import { useHistory } from "react-router-dom";

function Index() {
    const theme = useTheme();
    const history = useHistory();
    return (
        <Typography
            className="normal-case flex items-center sm:mb-12"
            component={Button}
            role="button"
            onClick={() => history.goBack()}
            color="inherit"
        >
            <Icon className="text-20">
                {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
            </Icon>
            <span className="mx-4">Back</span>
        </Typography>
    )
}

export default Index
