import { authRoles } from 'app/auth';
import i18next from 'i18next';

import id from './navigation-i18n/id';
import en from './navigation-i18n/en';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('id', 'navigation', id);

const navigationConfig = [
	{
		id: 'home',
		translate: 'none',
		type: 'item',
		icon: 'home',
		url: '/app/home'
	},
	{
		id: 'ourOrganization',
		title: 'Our Organization',
		translate: 'OURORGNISATION',
		type: 'group',
		icon: 'none',
		children: [
			{
				id: 'ourValues',
				title: 'Our Values',
				translate: 'OURVALUES',
				type: 'item',
				icon: 'none',
				url: '/app/our-organization/our-values'
			},
			{
				id: 'orgChart',
				title: 'Our Board of Directors',
				translate: 'OURBOARDOFDIRECTORS',
				type: 'item',
				icon: 'none',
				url: '/app/our-organization/org-chart'
			},
			// {
			// 	id: 'staticContentPage1',
			// 	title: 'Static Content Page 1',
			// 	translate: 'Static Content Page 1',
			// 	type: 'item',
			// 	icon: 'none',
			// 	url: '/staticContentPage1'
			// },
			// {
			// 	id: 'staticContentPage2',
			// 	title: 'Static Content Page 2',
			// 	translate: 'Static Content Page 2',
			// 	type: 'collapse',
			// 	icon: 'none',
			// 	children: [
			// 		{
			// 			id: 'staticContentPage1',
			// 			title: 'Static Content Page 1',
			// 			translate: 'Static Content Page 1',
			// 			type: 'item',
			// 			icon: 'none',
			// 			url: '/staticContentPage1'
			// 		},
			// 		{
			// 			id: 'staticContentPage2',
			// 			title: 'Static Content Page 2',
			// 			translate: 'Static Content Page 2',
			// 			type: 'item',
			// 			icon: 'none',
			// 			url: '/staticContentPage2'
			// 		},
			// 		{
			// 			id: 'staticContentPage3',
			// 			title: 'Static Content Page 3',
			// 			translate: 'Static Content Page 3',
			// 			type: 'collapse',
			// 			icon: 'none',
			// 			children: [
			// 				{
			// 					id: 'staticContentPage1',
			// 					title: 'Static Content Page 1',
			// 					translate: 'Static Content Page 1',
			// 					type: 'item',
			// 					icon: 'none',
			// 					url: '/staticContentPage1'
			// 				},
			// 				{
			// 					id: 'staticContentPage2',
			// 					title: 'Static Content Page 2',
			// 					translate: 'Static Content Page 2',
			// 					type: 'item',
			// 					icon: 'none',
			// 					url: '/staticContentPage2'
			// 				},
			// 				{
			// 					id: 'staticContentPage3',
			// 					title: 'Static Content Page 3',
			// 					translate: 'Static Content Page 3',
			// 					type: 'item',
			// 					icon: 'none',
			// 					url: '/staticContentPage3'
			// 				},
			// 				{
			// 					id: 'staticContentPage4',
			// 					title: 'Static Content Page 4',
			// 					translate: 'Static Content Page 4',
			// 					type: 'item',
			// 					icon: 'none',
			// 					url: '/staticContentPage4'
			// 				}
			// 			]
			// 		},
			// 		{
			// 			id: 'staticContentPage4',
			// 			title: 'Static Content Page 4',
			// 			translate: 'Static Content Page 4',
			// 			type: 'item',
			// 			icon: 'none',
			// 			url: '/staticContentPage4'
			// 		}
			// 	]
			// },
			// {
			// 	id: 'staticContentPage3',
			// 	title: 'Static Content Page 3',
			// 	translate: 'Static Content Page 3',
			// 	type: 'item',
			// 	icon: 'none',
			// 	url: '/staticContentPage3'
			// },
			// {
			// 	id: 'staticContentPage4',
			// 	title: 'Static Content Page 4',
			// 	translate: 'Static Content Page 4',
			// 	type: 'item',
			// 	icon: 'none',
			// 	url: '/staticContentPage4'
			// }
		]
	},
	{
		id: 'gallery',
		title: 'Gallery',
		translate: 'GALLERY',
		type: 'group',
		icon: 'none',
		children: [
			{
				id: 'photo',
				title: 'Photo',
				translate: 'PHOTO',
				type: 'item',
				icon: 'none',
				url: '/gallery/imgfolderpage',
			},
			{
				id: 'video',
				title: 'Video',
				translate: 'VIDEO',
				type: 'item',
				icon: 'none',
				url: '/gallery/videosfolderpage'
			},
			{
				id: 'test',
				title: 'test Page',
				// translate: 'VIDEO',
				type: 'item',
				icon: 'none',
				url: '/app/pages/dummyTest/new'
			},
			{
				id: 'table tist',
				title: 'table tist',
				// translate: 'VIDEO',
				type: 'item',
				icon: 'none',
				url: '/app/pages/dummyTestPage/dummyTable'
			},
			{
				id: 'Test Form',
				title: 'Test Form',
				// translate: 'VIDEO',
				type: 'item',
				icon: 'none',
				url: '/app/pages/dummyTestPage/testForm/new'
			},
			{
				id: 'tableWithFilter',
				title: 'Table With Filter',
				// translate: 'VIDEO',
				type: 'item',
				icon: 'none',
				url: '/app/pages/dummyTestPage/tableWithFilter'
			}



		]
	},
	{
		id: 'documentLibrary',
		title: 'Document Library',
		translate: 'DOCUMENTLIBRARY',
		type: 'group',
		icon: 'none',
		url: '/app/document-library'
	},
	{
		id: 'employeeServices',
		title: 'Employee Services',
		translate: 'EMPLOYEESERVICES',
		type: 'group',
		icon: 'none',
		children: [
			{
				id: 'referralJobs',
				title: 'Referral Jobs',
				translate: 'REFERRALJOBS',
				type: 'item',
				icon: 'none',
				url: '/app/jobs/refer-emp/ref-active-postings'
			},
			{
				id: 'currentInternalJobs',
				title: 'Internal Jobs',
				translate: 'INTERNALJOBS',
				type: 'item',
				icon: 'none',
				url: '/app/jobs/CurrentInternalJobs'
			},
			{
				id: 'myApplication',
				title: 'My Job Applicantion',
				translate: 'MYJOBAPPLICATION',
				type: 'item',
				icon: 'none',
				url: '/app/jobs/my-applications'
			},
			{
				id: 'pollMasterList',
				title: 'Master Poll List',
				translate: 'POLLMASTERLIST',
				type: 'item',
				auth: authRoles.pollAdmin,
				icon: 'none',
				url: '/app/poll-survey/PollMaster'
			},
			{
				id: 'activePollList',
				title: 'Poll List',
				translate: 'POLLLIST',
				type: 'item',
				icon: 'none',
				url: '/app/poll-survey/active-surveys'
			},
			{
				id: 'appreciationCard',
				title: 'Appreciation Card',
				translate: 'APPRECIATIONCARD',
				type: 'item',
				icon: 'none',
				url: '/app/appreciation/search-user'
			},
			{
				id: 'claimLocalConveyance',
				title: 'Claim Local Conveyance',
				translate: 'LOCALCONVEYANCECLAIM',
				type: 'item',
				icon: 'none',
				url: '/app/employee-service/local-conveyance',
				exact: true
			},
			{
				id: 'cashReimbursement',
				title: 'Cash Reimbursement',
				translate: 'CASHREIMBURSEMENTCLAIM',
				type: 'item',
				icon: 'none',
				url: '/app/employee-service/cash-reimbursement',
				exact: true
			},
			{
				id: 'domesticTravelClaim',
				title: 'Travel Claim',
				translate: 'DOMESTICTRAVECLAIM',
				type: 'item',
				icon: 'none',
				url: '/app/employee-service/travel-claim',
				exact: true
			},
			{
				id: 'leaveRequests',
				title: 'Leave Requests',
				translate: 'EMPLOYEELEAVEREQUEST',
				type: 'item',
				icon: 'none',
				url: '/app/hr-services/leave-requests',
				exact: true
			},
			{
				id: 'advanceImprest',
				title: 'Advance Imprest',
				translate: 'ADVANCEIMPREST',
				type: 'item',
				icon: 'none',
				url: '/app/employee-service/advance-imprest'
			},
			{
				id: 'memorandum',
				title: 'Memorandum',
				translate: 'MEMORANDUM',
				type: 'item',
				icon: 'none',
				url: '/app/employee-service/memorandum'
			},
			{
				id: 'trainingList',
				title: 'Training List',
				translate: 'TRAININGLIST',
				type: 'item',
				icon: 'none',
				url: '/app/employee-service/open-training-list'
			}

		]
	},
	{
		id: 'hrServices',
		title: 'HR Services',
		translate: 'HRSERVICES',
		type: 'group',
		icon: 'none',
		auth: authRoles.hr,
		children: [
			// {
			// 	id: 'talentNewHire',
			// 	title: 'Talent HR New Hire',
			// 	translate: 'Talent HR New Hire',
			// 	type: 'item',
			// 	icon: 'none',
			// 	url: '/hr-services/manage-referrals'
			// },
			// {
			// 	id: 'cashReimbursement',
			// 	title: 'Cash Reimbursement',
			// 	translate: 'Cash Reimbursement',
			// 	type: 'item',
			// 	icon: 'none',
			// 	url: '/hr-services/manage-referrals',
			// 	exact: true
			// },
			// {
			// 	id: 'inductionNewHire',
			// 	title: 'Induction HR New Hire',
			// 	translate: 'Induction HR New Hire',
			// 	type: 'item',
			// 	icon: 'none',
			// 	url: '/hr-services/manage-referrals'
			// },
			{
				id: 'jobPosting',
				title: 'Internal Job List',
				translate: 'INTERNALJOBPOSTING',
				auth: authRoles.talentHr,
				type: 'item',
				icon: 'none',
				url: '/app/jobs/jobposting/newpostingLists'
			},
			{
				id: 'referraljobList',
				title: 'Referral Job List',
				translate: 'REFERRALJOBS',
				auth: authRoles.talentHr,
				type: 'item',
				icon: 'none',
				url: '/app/jobs/refer-emp/refnewpostingLists'
			},
			{
				id: 'referralApplicants',
				title: 'Referral Applicants',
				translate: 'REFERRALAPPLICANTS',
				type: 'item',
				icon: 'none',
				auth: authRoles.hr,
				url: '/app/jobs/refer-emp/refapplicants'
			},
			{
				id: 'hrLeave',
				title: 'Approved Leaves',
				translate: 'APPROVEDEMPLOYEELEAVE',
				type: 'item',
				icon: 'none',
				auth: authRoles.hr,
				url: '/app/claim-requests/hrservices-leaves'
			},
			// {
			// 	id: 'internalApplicants',
			// 	title: 'Internal Applicants',
			// 	translate: 'Internal Applicants',
			// 	type: 'item',
			// 	icon: 'none',
			// 	auth: authRoles.hr,
			// 	url: '/app/jobs/jobposting/applicants-master'
			// },
		]
	},
	{
		id: 'claimRequests',
		title: 'Approve Requests',
		translate: 'CLAIMREQUEST',
		type: 'group',
		icon: 'none',
		auth: authRoles.approver,
		children: [
			{
				id: 'approveLocalConveyance',
				title: 'Approve Local Conveyance Claim',
				translate: 'APPROVELOCALCONVEYANCECLAIM',
				type: 'item',
				icon: 'none',
				url: '/app/employee-service/approve-local-claim'
			},
			{
				id: 'approveCashReimbursement',
				title: 'Approve Cash Reimbursement Claim',
				translate: 'APPROVECASHREIMBURSEMENTCLAIM',
				type: 'item',
				icon: 'none',
				url: '/app/claim-requests/approve-cash-reimbursement'
			},
			{
				id: 'approveDomesticTravel',
				title: 'Approve Travel Claim',
				translate: 'APPROVEDOMESTICTRAVELCLAIM',
				type: 'item',
				icon: 'none',
				url: '/app/claim-requests/approve-travel-claim'
			},
			{
				id: 'approveLeaves',
				title: 'Approve Leaves',
				translate: 'APPROVEEMPLOYEELEAVE',
				type: 'item',
				icon: 'none',
				url: '/app/claim-requests/approve-leaves'
			},
			{
				id: 'approveAdvanceImprest',
				title: 'Approve Advance Imprest',
				translate: 'APPROVEADVANCEIMPREST',
				type: 'item',
				icon: 'none',
				url: '/app/claim-requests/approve-advance-imprest'
			},
			{
				id: 'approveTrainingRequests',
				title: 'Approve Training Requests',
				translate: 'APPROVETRAININGREQUESTS',
				type: 'item',
				icon: 'none',
				url: '/app/claim-requests/training-requests'
			},
			{
				id: 'approveMemorandum',
				title: 'Approve Memorandum',
				translate: 'APPROVEMEMORANDUM',
				type: 'item',
				icon: 'none',
				url: '/app/claim-requests/approve-memorandum'
			},
			{
				id: 'consentMemorandum',
				title: 'Consent Memorandum',
				translate: 'CONSENTMEMORANDUM',
				type: 'item',
				icon: 'none',
				url: '/app/employee-service/consent-memorandum'
			},
			{
				id: 'ijpApplicants',
				title: 'IJP Applicants',
				translate: 'APPROVEIJPAPPLICANTS',
				type: 'item',
				icon: 'none',
				url: '/app/jobs/jobposting/applicants'
			},
		]
	},
	{
		id: 'cashierRequests',
		title: 'Cashier Requests',
		translate: 'CASHIERREQUEST',
		type: 'group',
		icon: 'none',
		auth: authRoles.finance,
		children: [
			{
				id: 'cashDomesticTravel',
				title: 'Cash Travel Claim',
				translate: 'CASHDOMESTICTRAVELCLAIM',
				type: 'item',
				icon: 'none',
				url: '/app/cashier-requests/travel-claim'
			},
			{
				id: 'cashLocalConveyance',
				title: 'Cash LocalConveyance Claim',
				translate: 'CASHLOCALCONVEYANCECLAIM',
				type: 'item',
				icon: 'none',
				url: '/app/cashier-requests/local-claim-cashier'
			},
			{
				id: 'cashierReimbursement',
				title: 'Cash Reimbursement Claim',
				translate: 'CASHREIMBURSEMENTCLAIM',
				type: 'item',
				icon: 'none',
				url: '/app/cashier-requests/cash-Reimbursement'
			},

			{
				id: 'cashierAdvanceImprest',
				title: 'Cash Advance Imprest',
				translate: 'CASHADVANCEIMPREST',
				type: 'item',
				icon: 'none',
				url: '/app/cashier-requests/advance-imprest'
			},

		]
	},
	{
		id: 'manageMasters',
		title: 'Manage Portal',
		translate: 'MANAGEPORTAL',
		type: 'group',
		icon: 'none',
		auth: authRoles.admin,
		children: [
			{
				id: 'announcement',
				title: 'Announcement',
				translate: 'ANNOUNCEMENT',
				type: 'item',
				icon: 'none',
				url: '/app/announcement/adminList'
			},
			{
				id: 'banner',
				title: 'Banner',
				translate: 'BANNER',
				type: 'item',
				icon: 'none',
				url: '/app/master/banner/list'
			},
			{
				id: 'employeeCorner',
				title: 'Employee Corner',
				translate: 'EMPLOYEECORNER',
				type: 'item',
				icon: 'none',
				url: '/app/empCornerReport/list'
			},
			{
				id: 'quickLinks',
				title: 'Quick Links',
				translate: 'QUICKLINKS',
				type: 'item',
				icon: 'none',
				url: '/app/master/quickLink/list'
			},
			{
				id: 'trainingListing',
				title: 'Training Listing',
				translate: 'TRAININGLIST',
				type: 'item',
				icon: 'none',
				auth: authRoles.admin,
				url: '/app/hr-services/training-admin-list'
			},
			{
				id: 'trainingApplications',
				title: 'Training Applications',
				translate: 'TRAININGAPPLICATIONS',
				type: 'item',
				icon: 'none',
				auth: authRoles.admin,
				url: '/app/hr-services/training-applications'
			},
			// {
			// 	id: 'manageOpenings',
			// 	title: 'Manage Openings',
			// 	translate: 'Manage Openings',
			// 	type: 'item',
			// 	icon: 'none',
			// 	url: '/manage-masters/manage-openings'
			// },
			// {
			// 	id: 'manageLCApprovers',
			// 	title: 'Manage LC Approvers',
			// 	translate: 'Manage LC Approvers',
			// 	type: 'item',
			// 	icon: 'none',
			// 	url: '/manage-masters/manage-openings'
			// },
			{
				id: 'manageMasters1',
				title: 'Manage Masters',
				translate: 'MANAGEMASTER',
				type: 'item',
				icon: 'none',
				url: '/app/manage-masters',
				// children: [
				// 	{
				// 		id: 'Bill Type',
				// 		title: 'Bill Type',
				// 		translate: 'Bill Type',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/bill-type/listing'
				// 	},
				// 	{
				// 		id: 'City',
				// 		title: 'City',
				// 		translate: 'City',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/city/listing'
				// 	},
				// 	{
				// 		id: 'citytypemapping',
				// 		title: 'City Type Mapping',
				// 		translate: 'City Type Mapping',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/city-type-mapping/listing'
				// 	},
				// 	{
				// 		id: 'department',
				// 		title: 'Department',
				// 		translate: 'Department',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/department/listing'
				// 	},
				// 	{
				// 		id: 'designation',
				// 		title: 'Designation',
				// 		translate: 'Designation',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/designation/listing'
				// 	},
				// 	{
				// 		id: 'division',
				// 		title: 'Division',
				// 		translate: 'Division',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/division/listing'
				// 	},
				// 	{
				// 		id: 'employeecategory',
				// 		title: 'Employee Category',
				// 		translate: 'Employee Category',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/employee-category/listing'
				// 	},
				// 	{
				// 		id: 'employeeType',
				// 		title: 'Employee Type',
				// 		translate: 'Employee Type',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/employee-type/listing'
				// 	},
				// 	{
				// 		id: 'gender',
				// 		title: 'Gender',
				// 		translate: 'Gender',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/gender/listing'
				// 	},
				// 	{
				// 		id: 'grade',
				// 		title: 'Grade',
				// 		translate: 'Grade',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/grade/listing'
				// 	},
				// 	{
				// 		id: 'hod',
				// 		title: 'HOD',
				// 		translate: 'HOD',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/hod/listing'
				// 	},
				// 	{
				// 		id: 'leavecategory',
				// 		title: 'Leave Category',
				// 		translate: 'Leave Category',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/leave-category/listing'
				// 	},
				// 	{
				// 		id: 'localeligibility',
				// 		title: 'Local Travel Mode Eligibility',
				// 		translate: 'Local Travel Mode Eligibility',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/local-travel-mode-eligibility/listing'
				// 	},
				// 	{
				// 		id: 'location',
				// 		title: 'Location',
				// 		translate: 'Location',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/location/listing'
				// 	},
				// 	{
				// 		id: 'maritalStatus',
				// 		title: 'Marital Status',
				// 		translate: 'Marital Status',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/marital-status/listing'
				// 	},
				// 	{
				// 		id: 'travelModeEligibility',
				// 		title: 'Travel Mode Eligibility',
				// 		translate: 'Travel Mode Eligibility',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/travel-mode-eligibility/listing'
				// 	},
				// 	{
				// 		id: 'salutation',
				// 		title: 'Salutation',
				// 		translate: 'Salutation',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/salutation/listing'
				// 	},
				// 	{
				// 		id: 'state',
				// 		title: 'State',
				// 		translate: 'State',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/state/listing'
				// 	},
				// 	{
				// 		id: 'subdepartment',
				// 		title: 'Subdepartment',
				// 		translate: 'Subdepartment',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/subDepartment/listing'
				// 	},
				// 	{
				// 		id: 'vertical',
				// 		title: 'Vertical',
				// 		translate: 'Vertical',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/vertical/listing'
				// 	},
				// 	{
				// 		id: 'zone',
				// 		title: 'Zone',
				// 		translate: 'Zone',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/zone/listing'
				// 	},
				// 	{
				// 		id: 'holiday',
				// 		title: 'Holiday',
				// 		translate: 'Holiday',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/holiday/listing'
				// 	},
				// 	{
				// 		id: 'organizationalValues',
				// 		title: 'Organizational Values',
				// 		translate: 'Organizational Values',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/organizational-values/listing'
				// 	},
				// 	{
				// 		id: 'training-category',
				// 		title: 'Training Category',
				// 		translate: 'Training Category',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/training-category/listing'
				// 	},
				// 	{
				// 		id: 'training-sub-category',
				// 		title: 'Training Sub Category',
				// 		translate: 'Training Sub Category',
				// 		type: 'item',
				// 		icon: 'none',
				// 		url: '/app/master/training-sub-category/listing'
				// 	},
				// ]
			},
		]
	}
];

export default navigationConfig;
