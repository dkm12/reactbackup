import { useRef } from 'react';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';
import history from '@history';
import { showSplash, hideSplash } from 'app/store/core/splashSlice';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'app/store/core/messageSlice';

export class referralApi {
	static async getJobById(id) {
		const response = await axios.get(api.applicants.getJobById+id);
		const data = await response.data.data;
		return data;
	}
	static async updateJobById(id, putData) {
		const response = await axios.put(api.applicants.updateJobById+id, putData);
		const data = await response.data;
		return data;
	}
	
	static async getDataById(id) {
		const response = await axios.get(api.applicants.getById+id);
		const data = await response.data.data;
		// _.isArray(response.data.data) && response.data.data.map((d) => (data.push({ id: d.jrtRecrId, ...d })));
		return data;
	}
	static async updateReadStatus(id) {
		console.log(id)
		const response = await axios.put(api.applicants.readStatusById+id);
		const data = await response.data;
		return data;
	}
	static async updateFirstRemarks(id, postData) {
		const response = await axios.put(api.applicants.putFirstRemById+id, postData);
		const data = await response.data;
		return data;
	}
	static async updateSecRemarks(id, postData) {
		const response = await axios.put(api.applicants.putSecRemById+id, postData);
		const data = await response.data;
		return data;
	}
	static async updateHiringRemarks(id, postData) {
		const response = await axios.put(api.applicants.putHiringRemById+id, postData);
		const data = await response.data;
		return data;
	}
	
	static async saveNewJoineeData(id, postData) {
		const response = await axios.put(api.applicants.saveNewJoinee+id, postData);
		const data = await response.data;
		return data;
	}

	static async getIJPapplicantById(ijpRecrId) {
		const response = await axios.get(api.applicants.ijpGetById+'/'+ijpRecrId);
		const data = await response.data.data;
		return data;
	}

	static async saveIJPnewJoinee(id, postData) {
		const response = await axios.put(api.applicants.ijpnewJoinee+id, postData);
		const data = await response.data;
		return data;
	}
	static async saveNewJoineeWithoutRefData(postData){
		const response = await axios.post(api.applicants.newJoineeWithoutRef, postData);
		const data = await response.data;
		return data;
	}
	static async checkDuplicate(postData) {
		const response = await axios.post(api.applicants.checkDuplicate, postData);
		const data = await response.data;
		return data;
	}

}

export default referralApi;
