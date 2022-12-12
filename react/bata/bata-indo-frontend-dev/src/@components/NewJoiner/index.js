import React, { useEffect, useState } from 'react';
import './style.css'

import { useDispatch, useSelector } from 'react-redux';
import { getempNewJoineeList, selectNewJoinee } from './store/empNewJoineesSlice';
import reducer from './store';
import withReducer from 'app/store/withReducer';
import dateFunc from '@common/utils/dateFunc';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import Scrollbars from '@core/core/Scrollbars';

function Index() {

    const dispatch = useDispatch();
    const history = useHistory();
    const NewJoinees = useSelector(selectNewJoinee);
    const uuid = useSelector(({ auth }) => auth.user.uuid);

    var todayDate = new Date();
    console.log(dateFunc.blogDate(todayDate))
    var endDate = moment().add(-30, 'days')
    console.log(dateFunc.blogDate(endDate))

    useEffect(() => {
        dispatch(getempNewJoineeList());
    }, [dispatch]);

    useEffect(() => {
        console.log('NewJoinees :>> ', NewJoinees);
    }, [NewJoinees])


    return (
        <div className="birthday nj">
            <Scrollbars className="birthday-scroll">
                {NewJoinees && NewJoinees.map((joinee, index) => {
                    return (
                        <div className="wish-box bdr-bottom " key={index}>
                            <div className="flex justify-between flex-wrap px-12 py-8">
                                <div className="wish-user flex flex-grow">
                                    <div className="wish-user-icon mr-8 rounded-28 text-center self-center">
                                        {(joinee.first_name).slice(0, 1)}
                                    </div>
                                    <div className="wish-detail flex-grow">
                                        <div className="wish-name">{joinee.fullname}</div>
                                        <div className="department">{joinee.dsg_code} - {joinee.dpt_code}</div>
                                        <div className="wish-date flex">{dateFunc.blogDate(joinee.doj)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </Scrollbars>
        </div>
    )
}
export default withReducer('newJoinee', reducer)(Index);