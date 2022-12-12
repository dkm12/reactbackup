import { useRef } from 'react';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';

export class wishesApi {
	static async sendBdayMsg(postData) {
		const response = await axios.post(api.anniversary.sendBdayMsg, postData);
		const data = await response.data;
		return data;
	}
    
    static async sendWorkAnnivMsg(postData) {
		const response = await axios.post(api.anniversary.sendWorkAnnivMsg, postData);
		const data = await response.data;
		return data;
	}
}

export default wishesApi;
