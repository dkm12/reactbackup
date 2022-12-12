import Admin from "layouts/Admin.js";
import { useState, useEffect, useRef } from "react";
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { TabContext } from '@material-ui/lab';
import { TabList } from '@material-ui/lab';
import { TabPanel } from '@material-ui/lab';
import axios from 'axios';
import SmartTable from "@smart-table";
const index = () => {
    const [value, setValue] = useState('1');
    const tableRef = useRef();
    const [filter, setFilter] = useState({})

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const tableTemplate = {
        columns: [
            {
                title: "Claim ID",
                field: "trxNo"
            },
            {
                title: "Employee Code",
                field: "createdBy",
                maxWidth: "200px"
            },
            {
                title: "Employee Name",
                field: "empName"
            },
            {
                title: "Claim Date",
                field: "createdOn"
            },
            {
                title: "Total Claim Amount",
                field: "totalAmt"
            },
            {
                title: "Current Status",
                field: "statusName"
            }
        ]
    }
    return (
        <>
            <section>
                <div className="pageHeader">
                    Home / Profile
                </div>
                <div className="grid grid-cols-2 gap-4" style={{ padding: "12px 62px 12px 62px" }}>
                    <div>
                        <div>AePS Wallet</div>
                        <div>₹ 10000</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <div>Main Wallet</div>
                        <div>₹ 10000</div>
                    </div>
                </div>
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
                            let url = `http://k8s-batadev-ingressd-0836da90f9-944557268.ap-south-1.elb.amazonaws.com/api/local-claim-th/local-convy/for-approval-list`,
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
                                    data: (result && result.data && result.data.data) ? result.data.data.data : [],
                                    page: (result && result.data && result.data.data) ? result.data.data.currentPage : 0,
                                    totalCount: (result && result.data && result.data.data) ? result.data.data.totalItems : 0,
                                })
                            })
                        })}
                    title="Smart Table"
                    actions={[(rowData) => {
                        let icon1 = {
                            icon: () => (<EditSharpIcon color="primary" size="small" fontSize="small" />),
                            tooltip: 'Order Detail',
                            iconProps: {
                                fontSize: 'small',
                                color: 'primary',
                                classes: 'filled'
                            },
                        }
                        if ('' == 'j') { return (icon1); }
                    }, (rowData) => {
                        if ('k' == 'k') {
                            return {
                                icon: () => (<CheckCircleOutlineIcon color="primary" size="small" fontSize="small" />),
                                tooltip: 'Accept',
                                // onClick: (event, rowData) => handleInventory(rowData)
                            }
                        }
                    }, (rowData) => {
                        let icon3 = {
                            icon: () => (<CheckCircleOutlineIcon color="primary" size="small" fontSize="small" />),
                            tooltip: 'Accept',
                            // onClick: (event, rowData) => handleInventory(rowData)
                        }
                        if ('k' == 'k') { return icon3 }
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
                <div>
                    <Box sx={{ width: '100%' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="primary tabs example"
                        // indicatorColor="none"
                        >
                            <Tab
                                className={(value == '1') ? "tablinks active" : "tablinks"}
                                style={{ textTransform: 'none' }}
                                label="Persolnal Detail" value="1"
                            />
                            <Tab
                                className={(value == '2') ? "tablinks active" : "tablinks"}
                                style={{ textTransform: 'none' }}
                                label="Transactions" value="2"
                            />
                            <Tab
                                className={(value == '3') ? "tablinks active" : "tablinks"}
                                style={{ textTransform: 'none' }}
                                label="Create a ticket" value="3"
                            />
                            <Tab
                                className={(value == '4') ? "tablinks active" : "tablinks"}
                                style={{ textTransform: 'none' }}
                                label="Help and setting" value="4"
                            />
                            <Tab
                                className={(value == '5') ? "tablinks active" : "tablinks"}
                                style={{ textTransform: 'none' }}
                                label="Feedback" value="5"
                            />
                        </Tabs>
                    </Box>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <TabPanel value="1">
                                Item 1
                            </TabPanel>
                            <TabPanel value="2">
                                Item Two
                            </TabPanel>
                            <TabPanel value="3">
                                Item Three
                            </TabPanel>
                            <TabPanel value="4">
                                Item Four
                            </TabPanel>
                            <TabPanel value="5">
                                Item Five
                            </TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </section>
        </>
    )
}

export default index
index.layout = Admin;
