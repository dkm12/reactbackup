/**
 * Authorization Roles
 */
const authRoles = {
	employee: ["EMPLOYEE"],
	claimCashier: ["CLAIM-CASHIER"],
	talentHr: ["TALENT-HR"],
	financeOnce: ["FINANCE_ONE"],
	inductionHr: ["INDUCTION-HR"],
	pollAdmin: ["POLL-ADMIN"],
	financeDir: ["FINANCE_DIR"],
	hr: ["TALENT-HR", "INDUCTION-HR", "LEAVE-HR"],
	approver: ["IJP-APPROVER-L1", "TALENT-HR", "INDUCTION-HR", "LEAVE-HR", "RM", "HOD", "TRNG-APPROVER-L1", 'FINANCE_ONE','FINANCE_DIR','PRECIDENT_DIR'],
	finance: ["FINANCE_DIR", "FINANCE_ONE", "CLAIM-CASHIER"],
	admin: ['ADMIN'],
	// localConvL1: ["LOCAL-CONV-L1"],
	// travelClaimL1: ["TRVL-CLAIM-L1"],
	// travelCliamL2: ["TRVL-CLAIM-L2"],
	// localConvL2: ["LOCAL-CONV-L2"],
	// staff: ['admin', 'staff', "EMPLOYEE", "LOCAL-CON-L1Employee", "TRAVEL-L2"],
	// user: ['admin', 'staff', 'user', "EMPLOYEE", "LOCAL-CON-L1Employee", "TRAVEL-L2"],
	onlyGuest: []
};

export default authRoles;
