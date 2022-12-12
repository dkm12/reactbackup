import React, { Component, useState, useEffect } from 'react'

import axios from 'axios'
// import { Breadcrumb } from 'app/components'
import { Card } from '@material-ui/core'
import SmartForm from '@smart-form'
import SmartTable from '@smart-table';
import api from '@api/index'
import masterApi from '@common/utils/masterApi'
import _ from '@lodash'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Label, GetLabel } from '@common/utils/label';
import dateFunc from '@common/utils/dateFunc';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import VisibilitySharpIcon from '@material-ui/icons/VisibilitySharp';


function DummyTable(props) {
    const [formdata, setFormdata] = useState([]);
    const [dept, setDept] = useState([]);
    const [desig, setDesig] = useState([]);
    const [loc, setLoc] = useState([]);
    const [filter, setFilter] = useState({});
    const tableRef = React.useRef();
    const dispatch = useDispatch()
    const today = new Date();
    async function onSubmit(val) {
        console.log('filter val', val)
        setFilter(val.data)
        setTimeout(() => {
            tableRef.current && tableRef.current.onQueryChange()
        }, 0);

    }


    function handleClick(jbdId, yuhi) {
        console.log(jbdId, yuhi)
		props.history.push(`/app/pages/dummyTest/${jbdId}`);
    }
    async function optionData() {
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


        setDept(data2);
        setDesig(data);
        setLoc(data3);


    }

    useEffect(() => {
        optionData();

    }, [dispatch])



    let templateFilter = {
        layout: { column: 1, spacing: 2, size: 'medium', label: 'top', type: 'flex' },
        title: 'Upload Form',
        description: 'Form for applying Job',
        sections: [
            {
                layout: { column: 6, spacing: 2, size: 'small', label: 'top', type: 'flex' },
                id: 'personal_information',
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
                        options: desig,
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
                        options: dept,
                        style: {
                            minWidth: '10%'
                        }

                    },
                    {
                        type: 'autocomplete',
                        name: 'jbdLocName',
                        id: 'jbdLocName',
                        title: GetLabel('BL00074'),
                        options: loc,
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
    }


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
                    dateFunc.changeDate(rowData.jbdPubFrmDate)
                )
            },
            {
                title: <Label labelId="BL00077" />,
                field: 'jbdPubToDate',
                render: rowData => (
                    dateFunc.changeDate(rowData.jbdPubToDate)
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
        <>
            <div className="m-sm-30">

                <Card className="px-6 pt-2 pb-4">
                    <SmartForm
                        template={templateFilter}
                        onSubmit={onSubmit}

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



                </Card>
            </div>
        </>
    )

}


export default DummyTable