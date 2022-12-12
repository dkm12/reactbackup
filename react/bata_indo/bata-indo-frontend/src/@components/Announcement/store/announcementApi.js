import { useRef } from 'react';
import axios from 'axios';
import api from '@api';

export class announcementApi {
	static async getAnnouncementById(id) {
		const response = await axios.get(api.announcement.getById + '/' + id);
		const data = await response.data.data;
		return data;
	}
}

export default announcementApi;
