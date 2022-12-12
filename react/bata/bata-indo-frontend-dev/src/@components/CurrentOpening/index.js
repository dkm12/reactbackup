import React, { useEffect, useState } from 'react';
import './style.css'
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { getempNewJoineeList, selectNewJoinee } from './store/empNewJoineesSlice';
import { getActiveJobsList, selectInternalJobPostings } from '../../app/main/pages/jobs/store/empCurrentVacanciesSlice'
// import reducer from './store';
import withReducer from 'app/store/withReducer';
import dateFunc from '@common/utils/dateFunc';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import Scrollbars from '@core/core/Scrollbars';
import Link from '@material-ui/core/Link';
import { Label, GetLabel } from '@common/utils/label';

function Index() {

    const dispatch = useDispatch();
    const history = useHistory();
    const NewJoinees = useSelector(selectInternalJobPostings);
    const uuid = useSelector(({ auth }) => auth.user.uuid);

    useEffect(() => {
        let url = {}
        url.pgNo = 0
        url.pgSize = 5
        dispatch(getActiveJobsList(url));
    }, [dispatch]);

    useEffect(() => {
        console.log('NewJoinees :>> ', NewJoinees);
    }, [NewJoinees])


    return (
        <div>
            <div className="birthday cv">
                <Scrollbars className="birthday-scroll">
                    {NewJoinees && NewJoinees.map((emp, index) => {
                        return (
                            <div className="wish-box bdr-bottom " key={index}>
                                <div className="flex justify-between flex-wrap px-12 py-8">
                                    <div className="wish-user flex flex-grow">
                                        <div className="wish-user-icon mr-8 rounded-28 text-center self-center">
                                            {(emp.jbdTitle).slice(0, 1)}
                                        </div>
                                        <div className="wish-detail flex-grow">
                                            <div className="wish-name">{emp.jbdTitle}</div>
                                            <div className="department">{emp.jbdDesigName} - {emp.jbdDeptName}</div>
                                            <div className="wish-date flex">{dateFunc.blogDate(emp.jbdPubToDate)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </Scrollbars>
            </div>
            <div className='vm'>
                <Link
                    component="button"
                    variant="body2"
                    onClick={() => {
                        history.push("/app/jobs/CurrentInternalJobs");
                    }}
                >
                    <Label labelId="BL00159" />
                </Link>
            </div>
        </div>
    )
}
// export default withReducer('newJoinee', reducer)(Index);
export default withRouter(Index);
