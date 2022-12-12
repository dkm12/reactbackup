import { useRef } from 'react';
import axios from 'axios';
import api from '@api';
import _ from '@lodash';
class uploadDoc {
	static async saveDoc(fileObj,folderName) {
		const formData = new FormData();
		formData.append('file',fileObj);
		formData.append('folderName',folderName);
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}

		const response = await axios.post(api.document.saveByReact, formData, config);
		const data = await response.data;
        
        return data;
	}
}

export default uploadDoc;
