import { useRef } from 'react';
import axios from 'axios';
import api from '@api';
import moment from 'moment';
class dateFunc {
	static changeDate(strDate) {
		let finalDate = "";
		var objDate = new Date(strDate);
		finalDate = moment(objDate).format('DD/MM/YYYY');
		return finalDate;
	}
	static blogDate(strdate) {
		var d = new Date(strdate);
		var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

		var d = weekday[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
		return d;
	}
	static getHoursFromDate = (date) => {
		var hours = moment.utc(date).local().startOf('seconds').fromNow()
		return hours;
	}

}

export default dateFunc;
