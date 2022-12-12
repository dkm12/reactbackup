import FusePageSimple from '@core/core/PageSimple';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import SmartForm from '@smart-form';
import axios from 'axios';
import masterApi from '@common/utils/masterApi';
import api from '@api';
import { Label, GetLabel } from '@common/utils/label';
import SmartTable from '@smart-table';

import _ from '@lodash';
import dateFunc from '@common/utils/dateFunc';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';


const useStyles = makeStyles(theme => ({
    // layoutHeader: {
    //      height: 30,
    //      minHeight: 320,
    //     [theme.breakpoints.down('md')]: {
    //         height: 240,
    //         minHeight: 240
    //     }
    // },
    firstIcon: {
        paddingLeft: 70
    }
}));

function DummyTable(props) {
    const classes = useStyles();
    const tableRef = React.useRef();
    const role = useSelector(({ auth }) => auth.user.role);
    const dispatch = useDispatch();
    const [masterData, setMasterData] = useState({});
    const [filter, setFilter] = useState({})

    async function getDropdownData() {
        let desigData = await masterApi.getAllActivedesignation();
        let data = [];
        _.isArray(desigData)
            && desigData.map((d) => (data.push({ value: d.dsgCode, title: d.dsgName })));

        let deptData = await masterApi.getAllActivedepartments();
        let data2 = [];
        _.isArray(deptData)
            && deptData.map((d) => (data2.push({ value: d.dptCode, title: d.dptName })));

        let locData = await masterApi.getAllActiveCities();
        let data3 = [];
        _.isArray(locData)
            && locData.map((d) => (data3.push({ value: d.cityCode, title: d.cityName })));

        setMasterData(
            {
                desig: data,
                dept: data2,
                loc: data3
            }
        );
    }
    useEffect(() => {
        getDropdownData();
    }, [dispatch]);

    async function onSubmit(event) {
        console.log(event.data)
        setFilter(event.data)
        setTimeout(() => {
            tableRef.current && tableRef.current.onQueryChange()
        }, 0);
    }
    function handleClick(jbdId, yuhi) {
        console.log(jbdId, yuhi)
		props.history.push(`/app/jobs/jobposting/createNewPosting/${jbdId}`);
    }
    let templateFilter = {
        layout: { column: 2, spacing: 2, size: 'small', label: 'top', type: 'flex' },
        sections: [
            {
                layout: { column: 2, spacing: 2, size: 'small', label: 'top', type: 'flex' },
                fields: [
                    {
                        type: 'text',
                        name: 'jbdTitle',
                        id: 'jbdTitle',
                        title: GetLabel('BL00069')
                    }, 
                    {
                        type: 'autocomplete',
                        name: 'jbdDesigName',
                        id: 'jbdDesigName',
                        options: (masterData && _.isArray(masterData.desig)) ? masterData.desig : [],
                        title: GetLabel('BL00072'),
                        style: {
                            minWidth: '15%'
                        }
                    },
                    {
                        type: 'autocomplete',
                        name: 'jbdDeptName',
                        id: 'jbdDeptName',
                        title: GetLabel('BL00073'),
                        options: (masterData && _.isArray(masterData.dept)) ? masterData.dept : [],
                        style: {
                            minWidth: '10%'
                        }

                    },
                    {
                        type: 'autocomplete',
                        name: 'jbdLocName',
                        id: 'jbdLocName',
                        title: GetLabel('BL00074'),
                        options: (masterData && _.isArray(masterData.loc)) ? masterData.loc : [],
                        style: {
                            minWidth: '10%'
                        }

                    },
                    {
                        type: 'date',
                        name: 'jbdPubFrmDate',
                        id: 'jbdPubFrmDate',
                        title: GetLabel('BL00127')
                    },
                    {
                        type: 'date',
                        name: 'jbdPubToDate',
                        id: 'jbdPubToDate',
                        title: GetLabel('BL00128')
                    },
                ]
            }

        ]
    };


    const columns = [
        
    
    ];
    const tableTemplate = {
        columns: [
            {
                title: <Label labelId="BL00069" />,
                field: 'jbdTitle',
            },
            {
                title: <Label labelId="BL00070" />,
                field: 'jbdDesc',
            },
            {
                title: <Label labelId="BL00071" />,
                field: 'jbdYOExp',
            },
        
            {
                title: <Label labelId="BL00072" />,
                field: 'jbdDesigName',
            },
            {
                title: <Label labelId="BL00073" />,
                field: 'jbdDeptName',
            },
            {
                title: <Label labelId="BL00074" />,
                field: 'jbdLocName',
            },
            {
                title: <Label labelId="BL00076" />,
                field: 'jbdPubFrmDate',
                render: rowData => (
                    dateFunc.changeDate(rowData.createdOn)
                )
            },
            {
                title: <Label labelId="BL00077" />,
                field: 'jbdPubToDate',
                render: rowData => (
                    dateFunc.changeDate(rowData.createdOn)
                )
            },
            {
                title: <Label labelId="BL00075" />,
                field: 'jbdNumVacancy',
            },
            {
                title: <Label labelId="BL00089" />,
                field: 'ijpStatus',
                render: rowData => (
                    rowData.ijpStatus !== null ? rowData.ijpStatus : ""
                )
            },
        ]
    }

    return (
        <FusePageSimple
            // classes={{
            //     content: 'flex',
            //     contentCard: 'overflow-hidden',
            //     header: 'min-h-140 h-64 sm:h-136 sm:min-h-100'
            // }}
            // header={}
            content={
                <>
                    <div className="p-16 sm:p-24">
                        <SmartForm
                            template={templateFilter}
                            onSubmit={onSubmit}
                            // onCancel={onCancel}
                            buttons={['search']}
                        />
						
						
                        <SmartTable
                            components={{
                                Toolbar: (props) => (
                                    <>
                                        <div
                                            style={{
                                                height: "0px",
                                            }}
                                        >
                                        </div>
                                    </>
                                ),
                            }}
                            tableRef={tableRef}
                            columns={tableTemplate.columns}
                            data={query =>
                                new Promise((resolve, reject) => {
                                    let url = api.jobs.ijpGetAll,
                                        body = {
                                            pageSize: query.pageSize,
                                            pageNo: query.page
                                        }
                                    if (!_.isEmpty(filter)) {
                                        body = {
                                            ...body,
                                            ...filter
                                        }
                                    }

                                    axios.post(url, body).then(result => {
                                        resolve({
                                            data: (result && result.data && result.data.data && result.data.data.data) ? result.data.data.data : [],
                                            page: (result && result.data && result.data.data && result.data.data.currentPage) ? result.data.data.currentPage : 0,
                                            totalCount: (result && result.data && result.data.data && result.data.data.totalItems) ? result.data.data.totalItems : 0,
                                        })
                                    })
                                })}
                            actions={[
                                {
                                    icon: () => (<EditSharpIcon color="primary" />),
                                    tooltip: "Edit",
                                    onClick: (event, rowData) => handleClick(rowData.jbdId, rowData.ijpStatus)
                                }
                            ]}
                            onFilterChange={(appliedFilter) => {
                                console.log("selected Filters : ", appliedFilter);
                            }}
                            options={{
                                search: false,
                                showTitle: false,
                                actionsColumnIndex: -1
                            }}
                            localization={{
                                body: {
                                    emptyDataSourceMessage: "No records to display",
                                    filterRow: {
                                        filterTooltip: "Filter",
                                        filterPlaceHolder: "Filtaaer",
                                    },
                                },
                            }}
                            onSearchChange={(e) => console.log("search changed: " + e)}
                            onColumnDragged={(oldPos, newPos) =>
                                console.log(
                                    "Dropped column from " + oldPos + " to position " + newPos
                                )
                            }
                        />
                    </div>
                </>
            }
        />
    );
}
export default DummyTable;