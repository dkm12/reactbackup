
const regex = {
	emailReg: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
	phoneReg: /^[0-9]{10,10}$/, // 8 to 15 digit
	aadharReg: /^[0-9]{12,12}$/, // 12 digit only numeric type
	// phoneReg: /^[0-9]{10,10}$/, // 8 to 15 digit
	numOfYearReg: /^[0-9]{1,2}$/, // 1 to 99
	yearReg: /^[0-9]{4}$/, // 1 to 99
	vacancyReg: /^[0-9]{1,6}$/, // below 1,000,000
	amountReg: /^(?:[1-9][0-9]{0,9}|10000000000)$/, // below 1,0000000000 (/^0*[1-9]\d{1,10}$/) /^(?:[1-9]\d?|10000000000)$/
	amountReg0: /^(?:[0-9][0-9]{0,9}|10000000000)$/, // 0 to 10000000000 (/^0*[1-9]\d{1,10}$/) /^(?:[1-9]\d?|10000000000)$/
	distanceReg: /^(?:[1-9][0-9]{0,3}|5000)$/,
	alphanumwith_Reg: /^[a-zA-Z0-9_]*$/,
	alphanumwithspaceReg: /^[a-zA-Z0-9 ]*$/,
	urlReg: /^[><?@+'`~^%&\*\[\]\{\}.!#|\\\"$';,:;=/\(\),\-\w+]{1,50}$/,
	messageReg: /^.*[a-zA-Z]+.*$/,
	maxSize250: /^(?=.*[a-zA-Z]).{1,249}$/,
	maxSize50: /^(?=.*[a-zA-Z]).{1,49}$/,
	maxSize30: /^(?=.*[a-zA-Z]).{1,29}$/,
	maxSize150: /^(?=.*[a-zA-Z]).{1,149}$/,
	maxSize50AllowNum: /^(?=.*[a-zA-Z0-9_]).{1,49}$/,
	temp1To5000: /^((5000)|([1-4][0-9]{3})|([1-9][0-9]{2})|([1-9][0-9]{1})|([1-9]))$/,
	allowedExtensions: /(\.jpg|\.jpeg|\.png|\.pdf)$/i
};

export default regex;
