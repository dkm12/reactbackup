import { useRef } from 'react';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';

export class appreciationApi {
	static async getUsers(postData) {
		const response = await axios.post(api.appreciation.getUser, postData);
		console.log(response)
		const data = await response.data;
		return data;
	}
	static async sendAppreciation(postData) {
		const response = await axios.post(api.appreciation.sendAppreciation, postData);
		console.log(response)
		const data = await response.data;
		return data;
	}
}

export default appreciationApi;