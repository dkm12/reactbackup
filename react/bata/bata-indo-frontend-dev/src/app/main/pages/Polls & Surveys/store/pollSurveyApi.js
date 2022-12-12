import { useRef } from 'react';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';

export class pollSurveyApi {
    //SAVE AND UPDATE POLL QUESTIONS
	static async save(body) {
		const response = await axios.post(api.pollSurvey.save, body);
		const data = await response.data;
		return data;
	}
	static async getById(id) {
		const response = await axios.get(api.pollSurvey.getById+id);
		const data = await response.data;
		return data;
	}
	static async updateById(id, body) {
		const response = await axios.put(api.pollSurvey.updateById+id, body);
		const data = await response.data;
		return data;
	}
	static async updateStatusById(id, body) {
		const response = await axios.put(api.pollSurvey.updateStatusById+id, body);
		const data = await response.data;
		return data;
	}
//SAVE ANSWERS AND GET GRAPH VALUES
	static async saveAns(body) {
		const response = await axios.post(api.pollSurvey.saveAns, body);
		const data = await response.data;
		return data;
	}
	static async getGraph(id) {
		const response = await axios.get(api.pollSurvey.getGraph+id);
		const data = await response.data;
		return data;
	}

}

export default pollSurveyApi;
