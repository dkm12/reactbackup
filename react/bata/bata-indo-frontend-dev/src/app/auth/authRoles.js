/**
 * Authorization Roles
 */
const authRoles = {
	employee: ["EMPLOYEE"],
	claimCashier: ["CLAIM-CASHIER"],
	talentHr: ["TALENT-HR"],
	localConvL1: ["LOCAL-CONV-L1"],
	travelClaimL1: ["TRVL-CLAIM-L1"],
	financeOnce: ["FINANCE_ONE"],
	inductionHr: ["INDUCTION-HR"],
	pollAdmin: ["POLL-ADMIN"],
	travelCliamL2: ["TRVL-CLAIM-L2"],
	localConvL2: ["LOCAL-CONV-L2"],
	financeDir: ["FINANCE_DIR"],
	hr: ["TALENT-HR", "INDUCTION-HR"],
	approver: ["LOCAL-CONV-L1", "TRVL-CLAIM-L1", "TRVL-CLAIM-L2", "LOCAL-CONV-L2",'EMP-LEAVE-L1','RM','HOD','FINANCE_ONE','FINANCE_DIR','PRECIDENT_DIR'],
	finance: ["FINANCE_DIR", "FINANCE_ONE", "CLAIM-CASHIER"],
	admin: ['ADMIN'],
	// staff: ['admin', 'staff', "EMPLOYEE", "LOCAL-CON-L1Employee", "TRAVEL-L2"],
	// user: ['admin', 'staff', 'user', "EMPLOYEE", "LOCAL-CON-L1Employee", "TRAVEL-L2"],
	onlyGuest: []
};

export default authRoles;
