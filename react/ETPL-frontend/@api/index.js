const btoken = 'eyJhbGciOiJIUzUxMiJ9.eyJSb2xlIjoiIiwic3ViIjoiNzI5MDgwNzY5MSIsImV4cCI6MTYzOTA2NjI0MSwiaWF0IjoxNjM5MDYyNjQxfQ.8q5wdtvSKXLY-nticQD2GKiAz511LRfT4DHEWVROT55PHAWKiH_tki4Dd5LPdqPEMaPcjh2eFPS9h-dCNrkQPg'
const zoopurl = 'https://test.zoop.one/'

export default {
    token: 'Bearer '+ btoken,
    otpByAadhar: `${zoopurl}in/identity/okyc/otp/request`,
    // downloadCsv: `${csvURL}/exp/csv`,
    // auth: {
    //     login: `${apiUrl}/user-th/login/authenticate`,
    //     leaveEmpRM: `${apiUrl}/user-th/role/leave-emp-rm/`,
    //     leaveEmpHR: `${apiUrl}/user-th/role/leave-hr/`,
    //     getUserDetail: `${apiUrl}/user-th/user-info/user/dtl/`,
    //     getAllUsers: `${apiUrl}/user-th/user-info/memo/approver/list`,
    //     getMyProfile: `${apiUrl}/user-th/user-info/user/profile/`,
    // },
    // mytask: {
    //     getAllTasks: `${apiUrl}/user-th/user-info/get-task-list-count`,
    // },
    
};