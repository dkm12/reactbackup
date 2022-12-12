
const regex = {
	emailReg: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
	phoneReg: /^[0-9]{8,15}$/, // 8 to 15 digit
	numOfYearReg: /^[0-9]{1,2}$/, // 1 to 99
	yearReg: /^[0-9]{4}$/, // 1 to 99
	vacancyReg: /^[0-9]{1,6}$/, // below 1,000,000
	alphanumwith_Reg: /^[a-zA-Z0-9_]*$/,
	alphanumwithspaceReg: /^[a-zA-Z0-9 ]*$/,
	messageReg: /^.*[a-zA-Z]+.*$/,
	maxSize250: /^(?=.*[a-zA-Z]).{1,249}$/,
	maxSize50: /^(?=.*[a-zA-Z]).{1,49}$/,
	maxSize30: /^(?=.*[a-zA-Z]).{1,29}$/,
	maxSize150: /^(?=.*[a-zA-Z]).{1,159}$/,
	maxSize50AllowNum: /^(?=.*[a-zA-Z0-9_]).{1,49}$/,
	allowedExtensions: /(\.jpg|\.jpeg|\.png|\.pdf)$/i
};

export default regex;
