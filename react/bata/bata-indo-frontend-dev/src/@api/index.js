// const apiUrlEC2 = 'http://65.1.255.148:8083';
const apiUrl = 'http://k8s-batadev-ingressd-0836da90f9-944557268.ap-south-1.elb.amazonaws.com/api'

// const apiUrl = 'http://k8s-game2048-ingress2-5e3236251d-1561360077.us-west-2.elb.amazonaws.com/api'
// const apiUrl = 'http://90a15e73-default-ingress20-95a7-1368515745.us-east-1.elb.amazonaws.com/api'

export default {
    auth: {
        login: `${apiUrl}/user/login/authenticate`,
        leaveEmpRM: `${apiUrl}/user/role/leave-emp-rm/`,
        leaveEmpHR: `${apiUrl}/user/role/leave-hr/`,
        getUserDetail: `${apiUrl}/user/user-info/user/dtl/`,
        getAllUsers: `${apiUrl}/user/user-info/memo/approver/list`,
        getMyProfile: `${apiUrl}/user/user-info/user/profile/`,
    },
    mytask: {
        getAllTasks: `${apiUrl}/user/user-info/get-task-list-count`,
    },
    anniversary: {
        getAllWorkAnniversary: `${apiUrl}/user/user-info/get-anniversary-list`,
        getAllBday: `${apiUrl}/user/user-info/get-birthday-list`,
        getAllBdayWishes: `${apiUrl}/user/user-info/get-birthday-wishes`,
        getAllWorkAnvsryWishes: `${apiUrl}/user/user-info/get-anniversary-wishes`,
        sendBdayMsg: `${apiUrl}/user/user-info/send-birthday-wishes`,
        sendWorkAnnivMsg: `${apiUrl}/user/user-info/send-anniversary-wishes`,

    },
    pollSurvey: {
        getAllMaster: `${apiUrl}/training-listing-service/survey/get-all`,
        getAllActive: `${apiUrl}/training-listing-service/survey/get-all-active-surveys`,
        save: `${apiUrl}/training-listing-service/survey/save`,
        getById: `${apiUrl}/training-listing-service/survey/get-by-id/`,
        updateById: `${apiUrl}/training-listing-service/survey/update-by-id/`,
        updateStatusById: `${apiUrl}/training-listing-service/survey/update-status/`,
        saveAns: `${apiUrl}/training-listing-service/poll/save`,
        getGraph: `${apiUrl}/training-listing-service/poll/result/`,
    },
    localConveyance: {
        create: `${apiUrl}/local-claim/local-convy/save`,
        getCreatedBy: `${apiUrl}/local-claim/local-convy/get-created-by`,
        getById: `${apiUrl}/local-claim/local-convy/get-by-id/`,
        getAll: `${apiUrl}/local-claim/local-convy/get-all`,
        forApprovalList: `${apiUrl}/local-claim/local-convy/for-approval-list`,
        runWorkflow: `${apiUrl}/local-claim/local-convy/run-workflow`,
        getLocalConveyanceFinanceOne: `${apiUrl}/login-service/role/user-list/finance_one`,
        getLocalConveyanceFinanceDir: `${apiUrl}/login-service/role/user-list/finance_dir`,
        getLocalConveyancePreceidentDir: `${apiUrl}/login-service/role/user-list/PRECIDENT_DIR`,
        forCashierList: `${apiUrl}/local-claim/local-convy/for-cashier-list`,
        updateByCashier: `${apiUrl}/local-claim/local-convy/update-by-cashier`,
    },
    leaveRequest: {
        create: `${apiUrl}/leave/emp-leave/save`,
        getCreatedBy: `${apiUrl}/leave/emp-leave/get-apply-by/`,
        getById: `${apiUrl}/leave/emp-leave/get-by-id/`,
        getAll: `${apiUrl}/local-claim/local-convy/get-all`,
        forApprovalList: `${apiUrl}/leave/emp-leave/for-approval-list`,
        runWorkflow: `${apiUrl}/leave/emp-leave/run-workflow`,
        getWorkflowHistory: `${apiUrl}/leave/emp-leave-trx/get-workflow-history`,
        leaveBalance: `${apiUrl}/leave/emp-leave/get-leave-balance/`,
        leaveTaken: `${apiUrl}/leave/emp-leave/get-leave-taken-by-emp/`,
        getLeaveHR: `${apiUrl}/login-service/role/user-list/leave-hr`,
    },
    travelClaim: {
        create: `${apiUrl}/travel-claim/trvl-claim/save`,
        getCreatedBy: `${apiUrl}/travel-claim/trvl-claim/get-created-by/`,
        getById: `${apiUrl}/travel-claim/trvl-claim/get-by-id/`,
        forApprovalList: `${apiUrl}/travel-claim/trvl-claim/for-approval-list`,
        getTravelClaimFinanceOne: `${apiUrl}/login-service/role/user-list/finance_one`,
        getTravelClaimFinanceDir: `${apiUrl}/login-service/role/user-list/finance_dir`,
        getTravelClaimPreceidentDir: `${apiUrl}/login-service/role/user-list/PRECIDENT_DIR`,
        getWorkflowHistory: `${apiUrl}/leave/emp-leave-trx/get-workflow-history`,
        runWorkflow: `${apiUrl}/travel-claim/trvl-claim/run-workflow`,
        forCashierList: `${apiUrl}/travel-claim/trvl-claim/for-cashier-list`,
        updateByCashier: `${apiUrl}/travel-claim/trvl-claim/update-by-cashier`,

    },
    masterData: {
        master: `${apiUrl}/master`,
        getAllCities: `${apiUrl}/master/city`,
        getAllLocalFood: `${apiUrl}/master/local-food-eligibility`,
        getActiveLeaveCategory: `${apiUrl}/master/leave-category?status=ACTIVE`,
        getAllBillTypes: `${apiUrl}/master/bill-type`,
        getAllCityTypeMappings: `${apiUrl}/master/city-type-mapping`,
        getAlldepartments: `${apiUrl}/master/department`,
        getAlldesignation: `${apiUrl}/master/designation`,
        getAlldivisions: `${apiUrl}/master/division`,
        getAllEmployeeCategorys: `${apiUrl}/master/employee-category`,
        getAllEmployeeTypes: `${apiUrl}/master/employee-type`,
        getAllGenders: `${apiUrl}/master/gender`,
        getAllgrades: `${apiUrl}/master/grade`,
        getAllHods: `${apiUrl}/master/hod`,
        getAllleaveCategorys: `${apiUrl}/master/leave-category`,
        getLocTvlModeElig: `${apiUrl}/master/local-travel-mode-eligibility`,
        getTvlModeElig: `${apiUrl}/master/travel-mode-eligibility`,
        getAlllocations: `${apiUrl}/master/location`,
        getAllmaritalStatus: `${apiUrl}/master/marital-status`,
        getAllmodeOfTravels: `${apiUrl}/master/mode-of-travel`,
        getAllSalutations: `${apiUrl}/master/salutation`,
        getAllStates: `${apiUrl}/master/state`,
        getAllSubDepartments: `${apiUrl}/master/subDepartment`,
        getAllTravelEntitlement: `${apiUrl}/master/travel-entitlement`,
        getAllTravelRates: `${apiUrl}/master/travel-rate`,
        getAllverticals: `${apiUrl}/master/vertical`,
        getAllzones: `${apiUrl}/master/zone`,
        getAllTrainingCategory: `${apiUrl}/master/training-category`,
        getAllTrainingSubCategory: `${apiUrl}/master/training-sub-category`,
        getAllTravelModeRatesByCategory: `${apiUrl}/master/travel-mode-eligibility/mode/category?travelModeType=Travel&empCatCode=`,
        getAllTravelModeType: `${apiUrl}/master/travel-mode-eligibility/type?modeType=Travel`,
        getAllLolTravelModeType: `${apiUrl}/master/local-travel-mode-eligibility/type?modeType=Travel`,
        getAllLolFoodModeType: `${apiUrl}/master/local-travel-mode-eligibility/type?modeType=Food`,
        getAllLocalModeRatesByCategory: `${apiUrl}/master/local-travel-mode-eligibility/mode/category?travelModeType=Travel&empCatCode=`,
        getAllholidays: `${apiUrl}/master/holiday`,
        findAllOrganizationalValues: `${apiUrl}/master/organizational-values?status=active`,
        getAllOrganizationalValues: `${apiUrl}/master/organizational-values`,
        rmList: `${apiUrl}/user/user-info/user/allusers`,
        getAllTrainingCategory: `${apiUrl}/master/training-category`,
        getAllTrainingSubCategory: `${apiUrl}/master/training-sub-category`,
        quickLink: `${apiUrl}/master/quick-links`,
    },
    getFile: `${apiUrl}/dms/batadms/get-presigned-url`,
    document: {
        saveByReact: `${apiUrl}/dms/batadms/saveDocument`,
        galleryUploadDoc: `${apiUrl}/dms/batadms/uploadDocument`
    },
    GalleryData: {
        getallFolder: `${apiUrl}/dms/batadms/get-folder-list-by-folder-type`,
        createFolder: `${apiUrl}/dms/batadms/create-folder`,
        getFilesById: `${apiUrl}/dms/batadms/get-document-by-folder-id-and-type/`,
        uploadFiles: `${apiUrl}/dms/batadms/uploadDocument`,
        deleteFolder: `${apiUrl}/dms/batadms/delete-folder-by-folder-id/`,
    },
    jobs: {
        save: `${apiUrl}/jobref/job-description/save`,
        getAll: `${apiUrl}/jobref/job-description/get-all`,
        getAllActive: `${apiUrl}/jobref/job-description/get-all-active-jobs`,
        getById: `${apiUrl}/jobref/job-description/get-by-id`,
        ijpSave: `${apiUrl}/ijp/ijp-job-description/save`,
        ijpGetAll: `${apiUrl}/ijp/ijp-job-description/get-all`,
        ijpUpdate: `${apiUrl}/ijp/ijp-job-description/update-by-id`,
        ijpSave: `${apiUrl}/ijp/ijp-job-description/save`,
        ijpGetAll: `${apiUrl}/ijp/ijp-job-description/get-all`,
        ijpGetAllActiveJobs: `${apiUrl}/ijp/ijp-job-description/get-all-active-jobs`,
        // ijpUpdate: `${apiUrl}/ijp/ijp-job-description/update-by-id`,
        ijpGetById: `${apiUrl}/ijp/ijp-job-description/get-by-id`,
        ijpJobPublish: `${apiUrl}/ijp/ijp-job-description/update-status/`,
        getIJPApprover: `${apiUrl}/login-service/role/user-list/IJP-APPROVER-L1`,
        getTalentHr: `${apiUrl}/login-service/role/user-list/TALENT-HR`,
        getIndHr: `${apiUrl}/login-service/role/user-list/INDUCTION-HR`,

    },
    applicants: {
        save: `${apiUrl}/jobref/job-recruitment/save`,
        getAll: `${apiUrl}/jobref/job-recruitment/get-by-role`,
        getById: `${apiUrl}/jobref/job-recruitment/get-by-id/`,
        readStatusById: `${apiUrl}/jobref/job-recruitment/update-read-status/`,
        putFirstRemById: `${apiUrl}/jobref/job-recruitment/update-first-remark/`,
        putSecRemById: `${apiUrl}/jobref/job-recruitment/update-second-remark/`,
        putHiringRemById: `${apiUrl}/jobref/job-recruitment/update-hiring-details/`,
        saveNewJoinee: `${apiUrl}/jobref/job-recruitment/update-joining-details/`,
        getAllActiveJob: `${apiUrl}/jobref/job-description/get-all-active-jobs`,
        getAllJob: `${apiUrl}/jobref/job-description/get-all`,
        getJobById: `${apiUrl}/jobref/job-description/get-by-id/`,
        updateJobById: `${apiUrl}/jobref/job-description/update-by-id/`,
        addNewJob: `${apiUrl}/jobref/job-description/save`,
        getMyRefApp: `${apiUrl}/jobref/job-recruitment/my-pending-referral`,
        getMyIJPApp: `${apiUrl}/ijp/ijp-job-recruitment/my-pending-ijp`,
        ijpSave: `${apiUrl}/ijp/ijp-job-recruitment/save`,
        ijpGetAll: `${apiUrl}/ijp/ijp-job-description/get-all-active-jobs`,
        ijpTaskList: `${apiUrl}/ijp/ijp-job-recruitment/ijp-task-list`,
        ijpGetById: `${apiUrl}/ijp/ijp-job-recruitment/ijp-task-list-by-id`,
        ijpRunWorkflow: `${apiUrl}/ijp/ijp-job-recruitment/run-workflow`,
        ijpnewJoinee: `${apiUrl}/ijp/ijp-job-recruitment/update-user-details/`,

    },
    appreciation: {
        getUser: `${apiUrl}/user/user-info/search-user`,
        sendAppreciation: `${apiUrl}/user/appreciation/send`,
    },
    announcement: {
        save: `${apiUrl}/announcement/announcement/save`,
        getAll: `${apiUrl}/announcement/announcement/get-all`,
        getById: `${apiUrl}/announcement/announcement/get-by-id`,
        update: `${apiUrl}/announcement/announcement/update-by-id`,
        getAllActiveAnn: `${apiUrl}/announcement/announcement/get-all-active-announcements`,
        updateStatus: `${apiUrl}/announcement/announcement/update-status`,
    },
    cashReimbursement: {
        create: `${apiUrl}/cash-reimburs/cash-reim/save`,
        getCreatedBy: `${apiUrl}/cash-reimburs/cash-reim/get-created-by/`,
        getById: `${apiUrl}/cash-reimburs/cash-reim/get-by-id/`,
        forApprovalList: `${apiUrl}/cash-reimburs/cash-reim/for-approval-list/`,
        getTravelClaimFinanceOne: `${apiUrl}/login-service/role/user-list/finance_one`,
        getTravelClaimFinanceDir: `${apiUrl}/login-service/role/user-list/finance_dir`,
        getTravelClaimPreceidentDir: `${apiUrl}/login-service/role/user-list/PRECIDENT_DIR`,
        getWorkflowHistory: `${apiUrl}/leave/emp-leave-trx/get-workflow-history`,
        runWorkflow: `${apiUrl}/cash-reimburs/cash-reim/run-workflow`,
        forCashierList: `${apiUrl}/cash-reimburs/cash-reim/for-cashier-list`,
        updateByCashier: `${apiUrl}/cash-reimburs/cash-reim/update-by-cashier`,
    },
    DocumentLibraryData: {
        getallFolder: `${apiUrl}/dms/batadms/get-folder-list-by-folder-type/DOC_LIBRARY`,
        createFolder: `${apiUrl}/dms/batadms/create-folder`,
        getFilesById: `${apiUrl}/dms/batadms/get-document-by-folder-id/`,
        uploadFiles: `${apiUrl}/dms/batadms/uploadDocument`,
        deleteFolder: `${apiUrl}/dms/batadm/delete-folder-by-folder-id/`,
        deleteFile: `${apiUrl}/dms/batadms/delete-document-by-document-id/`,
    },
    advanceImprest: {
        create: `${apiUrl}/advance-imprest/adv-imprest/save`,
        getCreatedBy: `${apiUrl}/advance-imprest/adv-imprest/get-created-by/`,
        getById: `${apiUrl}/advance-imprest/adv-imprest/get-by-id/`,
        forApprovalList: `${apiUrl}/advance-imprest/adv-imprest/for-approval-list/`,
        getTravelClaimFinanceOne: `${apiUrl}/login-service/role/user-list/finance_one`,
        getTravelClaimFinanceDir: `${apiUrl}/login-service/role/user-list/finance_dir`,
        getTravelClaimPreceidentDir: `${apiUrl}/login-service/role/user-list/PRECIDENT_DIR`,
        getWorkflowHistory: `${apiUrl}/leave/emp-leave-trx/get-workflow-history`,
        runWorkflow: `${apiUrl}/advance-imprest/adv-imprest/run-workflow`,
        forCashierList: `${apiUrl}/advance-imprest/adv-imprest/for-cashier-list`,
        updateByCashier: `${apiUrl}/advance-imprest/adv-imprest/update-by-cashier`,
    },
    newJoinee: {
        getAll: `${apiUrl}/user/user-info/get-new-joinee-list`,
    },
    empCorner: {
        getAllTopics: `${apiUrl}/empcorner/topic/get-all`,
        saveTopic: `${apiUrl}/empcorner/topic/save`,
        deleteTopic: `${apiUrl}/empcorner/topic/delete-by-id`,
        getByIdTopic: `${apiUrl}/empcorner/topic/get-by-id`,
        updateTopic: `${apiUrl}/empcorner/topic/update-by-id`,
        updateComment: `${apiUrl}/empcorner/comment/update-by-id`,
        saveComment: `${apiUrl}/empcorner/comment/save`,
        getByIdComment: `${apiUrl}/empcorner/comment/get-by-id`,
        deleteComment: `${apiUrl}/empcorner/comment/delete-by-id`,
        topicLikes: `${apiUrl}/empcorner/topic/like/save`,
        topicdisLikes: `${apiUrl}/empcorner/topic/dislike/save`,
        commentLikes: `${apiUrl}/empcorner/comment/like/save`,
        commentdisLikes: `${apiUrl}/empcorner/comment/dislike/save`,
        getAllReports: `${apiUrl}/empcorner/report/get-all`,
        saveReport: `${apiUrl}/empcorner/report/save`,
    },
    memorandum: {
        create: `${apiUrl}/memo/memo/save`,
        getCreatedBy: `${apiUrl}/memo/memo/get-created-by`,
        getById: `${apiUrl}/memo/memo/get-by-id/`,
        forApprovalList: `${apiUrl}/memo/memo/for-approval-list`,
        getTravelClaimFinanceOne: `${apiUrl}/login-service/role/user-list/finance_one`,
        getTravelClaimFinanceDir: `${apiUrl}/login-service/role/user-list/finance_dir`,
        getTravelClaimPreceidentDir: `${apiUrl}/login-service/role/user-list/PRECIDENT_DIR`,
        getWorkflowHistory: `${apiUrl}/leave/emp-leave-trx/get-workflow-history`,
        runWorkflow: `${apiUrl}/memo/memo/run-workflow`,
        forCashierList: `${apiUrl}/memo/memo/for-cashier-list`,
        updateByCashier: `${apiUrl}/memo/memo/update-by-cashier`,
        sendConsent: `${apiUrl}/memo/memo/send-consent`,
        forConsentApprovalList: `${apiUrl}/memo/memo/for-consent-approval-list`,
        replyConsent: `${apiUrl}/memo/memo/reply-consent`,
        getDescLog: `${apiUrl}/memo/memo/get-desc-log/`,
    },
    training: {
        save: `${apiUrl}/training-listing-service/training/save`,
        getAll: `${apiUrl}/training-listing-service/training/get-all`,
        getById: `${apiUrl}/training-listing-service/training/get-by-id/`,
        updateById: `${apiUrl}/training-listing-service/training/update-by-id`,
        getAllActiveTrainings: `${apiUrl}/training-listing-service/training/get-all-active-trainings`,
        updateStatus: `${apiUrl}/training-listing-service/training/update-status`,
        openTrainingApplication: `${apiUrl}/training-listing-service/training/get-all-active-trainings`,
        appliedTrainingApplication: `${apiUrl}/training-listing-service/training-application/my-applied-trainings`,
        applyRequest: `${apiUrl}/training-listing-service/training-application/save`,
        pendingApproval: `${apiUrl}/training-listing-service/training-application/pending-approval`,
        getTRNGAPPROVERL1: `${apiUrl}/login-service/role/user-list/TRNG-APPROVER-L1`,
        runWorkflow: `${apiUrl}/training-listing-service/training-application/run-workflow`,
        getByTrngAppId: `${apiUrl}/training-listing-service/training-application/get-by-trngAppId/`,
        viewAll: `${apiUrl}/training-listing-service/training-application/view-all`,
        getWorkflowHistory: `${apiUrl}/leave/emp-leave-trx/get-workflow-history`
    },
    banner: {
        uploadBanner: `${apiUrl}/dms/batadms/upload-banner`,
        getAllBanners: `${apiUrl}/dms/batadms/get-all-banner`,
        getActiveBanners: `${apiUrl}/dms/batadms/get-active-banner-list`,
        getById: `${apiUrl}/dms/batadms/get-by-banner-id`,
        deleteBanner: `${apiUrl}/dms/batadms/delete-banner-by-id`,
    },
    notification: {
        getAll: `${apiUrl}/user/user-info/get-notification-list`,
        update: `${apiUrl}/user/user-info/update-notificaton`,
    }



};
