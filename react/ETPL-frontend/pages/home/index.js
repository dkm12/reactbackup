import React from 'react'
import Admin from "layouts/Admin.js";
import PreLogin from './prelogin'
import PostLogin from './postlogin'
const index = () => {
    const login = false;
    return (
        <>
            {(login)?<PostLogin/>:<PreLogin/>}
        </>
    )
}

export default index
index.layout = Admin;
