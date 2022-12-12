import React, { useEffect, useState } from 'react';
import Scrollbars from '@core/core/Scrollbars';
import './style.css'
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { getWorkAnniversaryList, selectworkAnniv } from './store/workAnnivSlice';
import { useDispatch, useSelector } from 'react-redux';
import wishesApi from './store/wishesApi';
import { showMessage } from 'app/store/core/messageSlice';
import { Label, GetLabel } from '@common/utils/label';

function Index() {
    const dispatch = useDispatch();
    const taskList = useSelector(selectworkAnniv);
    const [data, setData] = useState(taskList);
    const [dataID, setDataID] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        dispatch(getWorkAnniversaryList('url'));
    }, [dispatch]);

    useEffect(() => {
        setData(taskList);
    }, [taskList]);

    async function handleAccordian(id) {
        await setMessage('');
        if (dataID == id) { setDataID(null); }
        else { setDataID(id); }
    }

    async function handleSendMessage(empCode) {
        if (!message || message.trim() == '') return;
        let postMsg = {};
        postMsg.wishToEmpCode = empCode;
        postMsg.wishComment = message;
        let res = await wishesApi.sendWorkAnnivMsg(postMsg);
        console.log(res);
        if (res.status == '200') {
            await dispatch(showMessage({ message: res.message, variant: 'success' }));
            await setMessage('');
        }
        else dispatch(showMessage({ message: res.message, variant: 'error' }));
        dispatch(getWorkAnniversaryList('url'));
    }

    return (
        <div className="birthday">
            <Scrollbars className="birthday-scroll">
                {(data) &&
                    data.map(n => {
                        return (
                            <div className="wish-box bdr-bottom">
                                <div className="flex justify-between flex-wrap px-12 py-8">
                                    <div className="wish-user flex flex-grow">
                                        <div className="wish-user-icon mr-8 rounded-28 text-center self-center">
                                            {(n.fullname).slice(0, 1)}
                                        </div>
                                        <div className="wish-detail flex-grow">
                                            <div className="wish-name">{n.fullname}</div>
                                            <div className="department">{n.dpt_name}</div>
                                            <div className="wish-date flex">{n.doj}
                                                <div className="send-wish ml-auto">
                                                    {((n.is_comment) && (n.is_comment == 1)) ?
                                                        <a className="self-center send-w pointer disabled">
                                                            <Label labelId="BL00410" />
                                                        </a> :
                                                        <a className="self-center send-w pointer"
                                                            onClick={event => handleAccordian(n.id)}>
                                                            <Label labelId="BL00005" />
                                                        </a>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {(n.id == dataID && n.is_comment != 1) &&
                                    <Paper className="flex items-center max-w-512 p-4 mx-12 mb-8 mt-0 rounded-4" elevation={1}>
                                        <Input
                                            placeholder="Type Message"
                                            className="flex flex-1"
                                            disableUnderline
                                            fullWidth
                                            value={message}
                                            onInput={e => setMessage(e.target.value)}
                                        />
                                        <Icon color="primary" className="pointer" onClick={event => handleSendMessage(n.emp_code)}>send</Icon>
                                    </Paper>
                                }
                            </div>
                        )
                    })}
            </Scrollbars>
        </div>
    )
}

export default Index
