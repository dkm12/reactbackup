import FuseUtils from '@core/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import api from '@api';
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					// if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
					if (!err.response) {
						// if you ever get an unauthorized response, logout the user Error: Network Error
						// this.emit('onAutoLogout', 'Error: Network Error or API is not working');
						// this.setSession(null);
					}else if(err.response.status === 401 && err.config && !err.config.__isRetryRequest){
						this.emit('onAutoLogout', 'User does not exist. Please contact system administrator.');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');

			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token, this.getUser());
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	createUser = data => {
		return new Promise((resolve, reject) => {
			axios.post('/api/auth/register', data).then(response => {
				if (response.data.user) {
					this.setSession(response.data.access_token);
					resolve(response.data.user);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	signInWithEmailAndPassword = (email, password) => {
		return new Promise((resolve, reject) => {
			axios
				.post(api.auth.login, {
					username: email,
					password
				})
				.then(response => {
					if (response.data.status && response.data.status !== "404" && response.data.status !== "405") {
						const settingData = {
							displayName: response.data.userName,
							photoURL: 'app/assets/images/avatars/Abbott.jpg',
							email: 'admin',
							settings: {
							layout: {
								style: 'layout3',
								config: {
								scroll: 'content',
								navbar: {
									display: true,
									folded: true,
									position: 'left'
								},
								toolbar: {
									display: true,
									style: 'fixed',
									position: 'above'
								},
								footer: {
									display: true,
									style: 'static',
									position: 'below'
								},
								mode: 'container',
								leftSidePanel: {
									display: false
								},
								rightSidePanel: {
									display: false
								}
								}
							},
							customScrollbars: true,
							theme: {
								main: 'default',
								navbar: 'default',
								toolbar: 'default',
								footer: 'default'
							},
							animations: true,
							direction: 'ltr'
							},
							shortcuts: [
							'calendar',
							'mail',
							'contacts'
							]
						}
						const roles = response.data.userrole.split(",").map(function (value) {
							return value.trim();
						 });
						const udata = {
								uuid: response.data.empId,
								role: roles,
								from: "custom-db",
								email: 'admin',
								name: response.data.userName
							}
						console.log(`udata`, JSON.stringify(udata))
						
						this.setSession(response.data.token, JSON.stringify(udata));
						resolve({...udata, data: settingData});
						// resolve({...response.data.user, data: settingData});
					} else if(response.data.status == "404") {
						reject("Invalid Credentials.");
					} else if(response.data.status == "405") {
						reject("User does not exist. Please contact system administrator.");
					}else {
						reject(response.data.error);
					}
				});
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			
				const udata = JSON.parse(this.getUser());
				const access_token = this.getAccessToken();

				const settingData = {
					displayName: udata.name,
					photoURL: 'app/assets/images/avatars/Abbott.jpg',
					email: 'admin',
					settings: {
					layout: {
						style: 'layout3',
						config: {
						scroll: 'content',
						navbar: {
							display: true,
							folded: true,
							position: 'left'
						},
						toolbar: {
							display: true,
							style: 'fixed',
							position: 'above'
						},
						footer: {
							display: true,
							style: 'static',
							position: 'below'
						},
						mode: 'container',
						leftSidePanel: {
							display: false
						},
						rightSidePanel: {
							display: false
						}
						}
					},
					customScrollbars: true,
					theme: {
						main: 'default',
						navbar: 'default',
						toolbar: 'default',
						footer: 'default'
					},
					animations: true,
					direction: 'ltr'
					},
					shortcuts: [
					'calendar',
					'mail',
					'contacts'
					]
				}
				// this.setSession(access_token, JSON.stringify());
				resolve({...udata, data: settingData});
				
			
		});
	};

	updateUserData = user => {
		return axios.post('/api/auth/user/update', {
			user
		});
	};

	setSession = (access_token, user) => {
		if (access_token) {
			localStorage.setItem('jwt_access_token', access_token);
			localStorage.setItem('user_data', user);
			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.clear();
			delete axios.defaults.headers.common.Authorization;
		}
	};

	logout = () => {
		this.setSession(null);
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('jwt_access_token');
	};

	getUser = () => {
		return window.localStorage.getItem('user_data');
	};
}

const instance = new JwtService();

export default instance;
