import { useRef } from 'react';
import axios from 'axios';
import api from '@api';
import moment from 'moment';
class trimmed {
	static input(srting, number) {
		return srting.substr(0, srting.substring(0,number).lastIndexOf(" "));
	}

}

export default trimmed;
