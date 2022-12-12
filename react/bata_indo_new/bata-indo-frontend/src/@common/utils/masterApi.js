import { useRef } from 'react';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';
import history from '@history';
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { showMessage } from 'app/store/core/messageSlice';

class masterApi {
	static async getAllCities() {
		const response = await axios.get(api.masterData.getAllCities);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ cityId: d.cityId, ...d })));
		return data;
	}
	static async getAllActiveCities() {
		const response = await axios.get(api.masterData.getAllCities + "?status=active");
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ cityId: d.cityId, ...d })));
		return data;
	}
	static async getAllLocalFood() {
		const response = await axios.get(api.masterData.getAllLocalFood);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ lfeId: d.lfeId, ...d })));
		return data;
	}
	static async getActiveLeaveCategories() {
		const response = await axios.get(api.masterData.getActiveLeaveCategory);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ lcId: d.lcId, ...d })));
		return data;
	}

	static async getLeaveTaken(uuid) {
		const response = await axios.get(api.leaveRequest.leaveTaken + uuid);
		let data = {};
		if (response && response.data && response.data.data) {
			data = response.data.data;
		}

		return data;
	}

	static async saveToMaster({ name, formData }) {
		const response = await axios.post(`${api.masterData.master}/${name}`, formData);
		const data = await response.data;
		if (data.status == "200") {
			history.push({
				pathname: `/app/master/${name}/listing`
			});
		} else {
		}

		return data;
	}

	static async updateToMaster({ name, id, formData }) {
		const response = await axios.put(`${api.masterData.master}/${name}/${id}`, formData);
		const data = await response.data;
		if (data.status == "200") {
			history.push({
				pathname: `/app/master/${name}/listing`
			});
		} else {
		}

		return data;
	}

	static async getAllBillTypes() {
		const response = await axios.get(api.masterData.getAllBillTypes);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ btId: d.btId, ...d })));
		return data;
	}


	static async getAllActiveBillTypes() {
		const response = await axios.get(api.masterData.getAllBillTypes + "?status=active");
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ btId: d.btId, ...d })));
		return data;
	}

	static async getCityById(cityId) {
		const response = await axios.get(api.masterData.getAllCities + "/" + cityId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getBillById(billTypeId) {
		const response = await axios.get(api.masterData.getAllBillTypes + "/" + billTypeId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}


	static async getAllActiveCityTypeMappings() {
		const response = await axios.get(api.masterData.getAllCityTypeMappings + "?status=active");
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ ctmId: d.ctmId, ...d })));
		return data;
	}
	static async getAllCityTypeMappings() {
		const response = await axios.get(api.masterData.getAllCityTypeMappings);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ ctmId: d.ctmId, ...d })));
		return data;
	}
	static async getAllCityTypeMappingById(cityTpeMappingId) {
		const response = await axios.get(api.masterData.getAllCityTypeMappings + "/" + cityTpeMappingId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}

	static async getAlldepartments() {
		const response = await axios.get(api.masterData.getAlldepartments);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ dptId: d.dptId, ...d })));
		return data;
	}
	static async getAllActivedepartments() {
		const response = await axios.get(api.masterData.getAlldepartments + "?status=active");
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ dptId: d.dptId, ...d })));
		return data;
	}

	static async getdepartmentById(dptId) {
		const response = await axios.get(api.masterData.getAlldepartments + "/" + dptId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}

	static async getAlldesignation() {
		const response = await axios.get(api.masterData.getAlldesignation);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ dsgId: d.dsgId, ...d })));
		return data;
	}
	static async getAllActivedesignation() {
		const response = await axios.get(api.masterData.getAlldesignation + "?status=active");
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ dsgId: d.dsgId, ...d })));
		return data;
	}
	static async getdesignationById(dsgId) {
		const response = await axios.get(api.masterData.getAlldesignation + "/" + dsgId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}


	static async getAlldivisions() {
		const response = await axios.get(api.masterData.getAlldivisions);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ divId: d.divId, ...d })));
		return data;
	}
	static async getAllActivedivisions() {
		const response = await axios.get(api.masterData.getAlldivisions + "?status=active");
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ divId: d.divId, ...d })));
		return data;
	}
	static async getdivisionById(divId) {
		const response = await axios.get(api.masterData.getAlldivisions + "/" + divId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAllEmployeeCategorys() {
		const response = await axios.get(api.masterData.getAllEmployeeCategorys);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ ecId: d.ecId, ...d })));
		return data;
	}
	static async getAllActiveEmployeeCategorys() {
		const response = await axios.get(api.masterData.getAllEmployeeCategorys + "?status=active");
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ ecId: d.ecId, ...d })));
		return data;
	}
	static async getEmployeeCategoryById(ecId) {
		const response = await axios.get(api.masterData.getAllEmployeeCategorys + "/" + ecId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAllEmployeeTypes() {
		const response = await axios.get(api.masterData.getAllEmployeeTypes);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ etId: d.etId, ...d })));
		return data;
	}
	static async getAllActiveEmployeeTypes() {
		const response = await axios.get(api.masterData.getAllEmployeeTypes + "?status=active");
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ etId: d.etId, ...d })));
		return data;
	}
	static async getEmployeeTypeById(etId) {
		const response = await axios.get(api.masterData.getAllEmployeeTypes + "/" + etId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAllGenders() {
		const response = await axios.get(api.masterData.getAllGenders);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ genderId: d.genderId, ...d })));
		return data;
	}
	static async getAllActiveGenders() {
		const response = await axios.get(api.masterData.getAllGenders + "?status=active");
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ genderId: d.genderId, ...d })));
		return data;
	}
	static async getGenderById(genderId) {
		const response = await axios.get(api.masterData.getAllGenders + "/" + genderId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAllgrades() {
		const response = await axios.get(api.masterData.getAllgrades);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ gradeId: d.gradeId, ...d })));
		return data;
	}
	static async getAllActivegrades() {
		const response = await axios.get(api.masterData.getAllgrades + "?status=active");
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ gradeId: d.gradeId, ...d })));
		return data;
	}
	static async getGradeById(gradeId) {
		const response = await axios.get(api.masterData.getAllgrades + "/" + gradeId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAllHods() {
		const response = await axios.get(api.masterData.getAllHods);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ hodId: d.hodId, ...d })));
		return data;
	}
	static async getAllActiveHods() {
		const response = await axios.get(api.masterData.getAllHods + "?status=active");
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ hodId: d.hodId, ...d })));
		return data;
	}
	static async getHodById(hodId) {
		const response = await axios.get(api.masterData.getAllHods + "/" + hodId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAllleaveCategorys() {
		const response = await axios.get(api.masterData.getAllleaveCategorys);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ lcId: d.lcId, ...d })));
		return data;
	}
	static async getAllActiveleaveCategorys() {
		const response = await axios.get(api.masterData.getAllleaveCategorys + "?status=active");
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ lcId: d.lcId, ...d })));
		return data;
	}
	static async getleaveCategoryById(lcId) {
		const response = await axios.get(api.masterData.getAllleaveCategorys + "/" + lcId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getLocTvlModeElig() {
		const response = await axios.get(api.masterData.getLocTvlModeElig);
		// const data = [];
		// _.isArray(response.data.data) && response.data.data.map((d) => (data.push({ lmotId: d.lmotId, ...d })));
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getActiveLocTvlModeElig() {
		const response = await axios.get(api.masterData.getLocTvlModeElig + "?status=active");
		// const data = [];
		// _.isArray(response.data.data) && response.data.data.map((d) => (data.push({ lmotId: d.lmotId, ...d })));
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getLocTvlModeEligById(ltmeId) {
		const response = await axios.get(api.masterData.getLocTvlModeElig + "/" + ltmeId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getTvlModeElig() {
		const response = await axios.get(api.masterData.getTvlModeElig);
		// const data = [];
		// _.isArray(response.data.data) && response.data.data.map((d) => (data.push({ lmotId: d.lmotId, ...d })));
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getTvlModeEligById(tmeId) {
		const response = await axios.get(api.masterData.getTvlModeElig + "/" + tmeId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAlllocations() {
		const response = await axios.get(api.masterData.getAlllocations);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ locId: d.locId, ...d })));
		return data;
	}
	static async getAllActivelocations() {
		const response = await axios.get(api.masterData.getAlllocations + "?status=active");
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ locId: d.locId, ...d })));
		return data;
	}
	static async getlocationById(locId) {
		const response = await axios.get(api.masterData.getAlllocations + "/" + locId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAllmaritalStatus() {
		const response = await axios.get(api.masterData.getAllmaritalStatus);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ msId: d.msId, ...d })));
		return data;
	}
	static async getAllActivemaritalStatus() {
		const response = await axios.get(api.masterData.getAllmaritalStatus + "?status=active");
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ msId: d.msId, ...d })));
		return data;
	}
	static async getmaritalStatusById(msId) {
		const response = await axios.get(api.masterData.getAllmaritalStatus + "/" + msId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAllmodeOfTravels() {
		const response = await axios.get(api.masterData.getAllmodeOfTravels);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ motId: d.motId, ...d })));
		return data;
	}
	static async getmodeOfTravelById(motId) {
		const response = await axios.get(api.masterData.getAllmodeOfTravels + "/" + motId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAllSalutations() {
		const response = await axios.get(api.masterData.getAllSalutations);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ saluId: d.saluId, ...d })));
		return data;
	}
	static async getAllActiveSalutations() {
		const response = await axios.get(api.masterData.getAllSalutations + "?status=active");
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ saluId: d.saluId, ...d })));
		return data;
	}
	static async getSalutationById(saluId) {
		const response = await axios.get(api.masterData.getAllSalutations + "/" + saluId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAllStates() {
		const response = await axios.get(api.masterData.getAllStates);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ stateId: d.stateId, ...d })));
		return data;
	}
	static async getAllActiveStates() {
		const response = await axios.get(api.masterData.getAllStates + "?status=active");
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ stateId: d.stateId, ...d })));
		return data;
	}
	static async getStateById(stateId) {
		const response = await axios.get(api.masterData.getAllStates + "/" + stateId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAllSubDepartments() {
		const response = await axios.get(api.masterData.getAllSubDepartments);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ sbdId: d.sbdId, ...d })));
		return data;
	}
	static async getAllActiveSubDepartments() {
		const response = await axios.get(api.masterData.getAllSubDepartments + "?status=active");
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ sbdId: d.sbdId, ...d })));
		return data;
	}
	static async getSubDepartmentById(sbdId) {
		const response = await axios.get(api.masterData.getAllSubDepartments + "/" + sbdId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAllTravelEntitlement() {
		const response = await axios.get(api.masterData.getAllTravelEntitlement);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ teId: d.teId, ...d })));
		return data;
	}
	static async getTravelEntitlementById(teId) {
		const response = await axios.get(api.masterData.getAllTravelEntitlement + "/" + teId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAllTravelRates() {
		const response = await axios.get(api.masterData.getAllTravelRates);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ trId: d.trId, ...d })));
		return data;
	}
	static async getTravelRateById(trId) {
		const response = await axios.get(api.masterData.getAllTravelRates + "/" + trId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAllverticals() {
		const response = await axios.get(api.masterData.getAllverticals);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ vtId: d.vtId, ...d })));
		return data;
	}
	static async getAllActiveverticals() {
		const response = await axios.get(api.masterData.getAllverticals + "?status=active");
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ vtId: d.vtId, ...d })));
		return data;
	}
	static async getverticalById(vtId) {
		const response = await axios.get(api.masterData.getAllverticals + "/" + vtId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAllzones() {
		const response = await axios.get(api.masterData.getAllzones);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ zoneId: d.zoneId, ...d })));
		return data;
	}
	static async getAllActivezones() {
		const response = await axios.get(api.masterData.getAllzones + "?status=active");
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ zoneId: d.zoneId, ...d })));
		return data;
	}
	static async getzoneById(zoneId) {
		const response = await axios.get(api.masterData.getAllzones + "/" + zoneId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAllholidays() {
		const response = await axios.get(api.masterData.getAllholidays);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ hldId: d.hldId, ...d })));
		return data;
	}
	static async getAllActiveholidays() {
		const response = await axios.get(api.masterData.getAllholidays + "?status=active");
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ hldId: d.hldId, ...d })));
		return data;
	}
	static async getAllholidayById(hldId) {
		const response = await axios.get(api.masterData.getAllholidays + "/" + hldId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAllTravelModeRatesByCategory(empCategory) {
		const response = await axios.get(api.masterData.getAllTravelModeRatesByCategory + empCategory);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}

	static async getAllTravelModeType() {
		const response = await axios.get(api.masterData.getAllTravelModeType);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAllLolTravelModeType() {
		const response = await axios.get(api.masterData.getAllLolTravelModeType);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAllActiveLolTravelModeType() {
		const response = await axios.get(api.masterData.getAllLolTravelModeType + "?status=active");
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAllLolFoodModeType() {
		const response = await axios.get(api.masterData.getAllLolFoodModeType);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAllLocalModeRatesByCategory(empCategory) {
		const response = await axios.get(api.masterData.getAllLocalModeRatesByCategory + empCategory);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}

	static async getIJPApprover() {
		const response = await axios.get(api.jobs.getIJPApprover);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}

	static async getOrganizationalValues() {
		const response = await axios.get(api.masterData.findAllOrganizationalValues);
		let data = {};
		if (response && response.data) {
			data = response.data;
		}
		return data;
	}
	static async getAllOrganizationalValues() {
		const response = await axios.get(api.masterData.getAllOrganizationalValues);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ orgValId: d.orgValId, ...d })));
		return data;
	}
	static async getOrganizationalById(orgValId) {
		const response = await axios.get(api.masterData.getAllOrganizationalValues + "/" + orgValId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}

	static async getAllUsers() {
		const response = await axios.get(api.auth.getAllUsers);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ employId: d.employId, ...d })));
		return data;
	}


	static async getAllUsersData() {
		const response = await axios.get(api.masterData.rmList);
		let data = {};
		if (response && response.data) {
			data = response.data.data;
		}
		return data;
	}

	static async getTalentHr() {
		const response = await axios.get(api.jobs.getTalentHr);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}

	static async getIndHr() {
		const response = await axios.get(api.jobs.getIndHr);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}

	static async getAllTrainingCategory() {
		const response = await axios.get(api.masterData.getAllTrainingCategory);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ trngCatId: d.trngCatId, ...d })));
		return data;
	}
	static async getAllActiveTrainingCategory() {
		const response = await axios.get(api.masterData.getAllTrainingCategory + "?status=active");
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ trngCatId: d.trngCatId, ...d })));
		return data;
	}

	static async getAllActiveTrainingSubCategory() {
		const response = await axios.get(api.masterData.getAllTrainingSubCategory + "?status=active");
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ trngSubcatId: d.trngSubcatId, ...d })));
		return data;
	}
	static async getTrainingCategoryById(trngCatId) {
		const response = await axios.get(api.masterData.getAllTrainingCategory + "/" + trngCatId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}
	static async getAllTrainingSubCategory() {
		const response = await axios.get(api.masterData.getAllTrainingSubCategory);
		const data = [];
		_.isArray(response.data.data) && response.data.data.map((d) => (data.push({ trngCat: d.trngCat, ...d })));
		return data;
	}
	static async getTrainingSubCategoryById(trngSubCatId) {
		const response = await axios.get(api.masterData.getAllTrainingSubCategory + "/" + trngSubCatId);
		let data = {};
		if (response.data.data && response.data.data != null) {
			data = response.data.data;
		}
		return data;
	}

}

export default masterApi;
