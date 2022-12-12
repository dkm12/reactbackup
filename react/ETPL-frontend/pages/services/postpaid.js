import React from 'react'
import Head from "components/BillPay/index"
import Admin from "layouts/Admin.js";

const PostPaid = () => {
    return (
        <div>
            <div className="pageHeader">
                <div className="container-fluid">
                    Home / Bill Payment & Recharge
                </div>
            </div>
            <Head/>
            PostPaid Mobile Bill Payment
        </div>
    )
}

export default PostPaid
PostPaid.layout = Admin;
