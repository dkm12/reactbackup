import React from 'react'
import Head from "components/BillPay/index"
import Admin from "layouts/Admin.js";

const prepaid = () => {
    return (
        <div>
            <div className="pageHeader">
                <div className="container-fluid">
                    Home / Bill Payment & Recharge
                </div>
            </div>
            <Head/>
            Prepaid Mobile Bill Payment
        </div>
    )
}

export default prepaid
prepaid.layout = Admin;
