import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as apiSpec from '../../apiSpec';
/* eslint-disable camelcase */

const ACCESS_TOKEN_KEY = 'cmV0ZXRhdGFybw==yar';

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
					if (err.response.status === 403 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);
					}


					if (err.response.status === 409 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Username sau email deja in uz.');
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
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	createUser = data => {
		return new Promise((resolve, reject) => {
			axios.post(apiSpec.REGISTER, data).then(response => {
				if (response.data.data.displayName) {
					this.setSession(response.data.data.access_token);
					resolve(response.data.data.displayName);
				} else {
					reject(response.data.error);
					console.log(response)
				}
			});
		});
	};

	signInWithUsernameAndPassword = (username, password) => {
		return new Promise((resolve, reject) => {
			axios
				.post(apiSpec.LOGIN, {
					username,
					password
				})
				.then(response => {
					if (response.data) {
						this.setSession(response.data.data.access_token);
						resolve(response.data);
					} else {
						reject(response.data.error);
					}
				});
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			axios
				.get(
					apiSpec.REFRESH_TOKEN
					// 	, {
					// 	data: {
					// 		access_token: this.getAccessToken()
					// 	}
					// }
				)
				.then(response => {
					if (response.data) {
						this.setSession(response.data.access_token);
						this.getUserData()
							.then(data => {
								resolve(data);
							})
							.catch(() => {
								reject(new Error('Failed to login with token. No token provided!'));
							});
					} else {
						this.logout();
						reject(new Error('Failed to login with token.'));
					}
				})
				.catch(error => {
					this.logout();
					reject(new Error('Failed to login with token.'));
				});
		});
	};

	getUserData = () => {
		return new Promise((resolve, reject) => {
			axios.get(apiSpec.PROFILE).then(response => {
				if (response.data) {
					resolve(response.data);
				} else {
					this.logout();
					reject(new Error('Failed to login with token.'));
				}
			});
		});
	};

	updateUserData = user => {
		return axios.post('/api/auth/user/update', {
			user
		});
	};

	setSession = access_token => {
		if (access_token) {
			window.localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			window.localStorage.removeItem(ACCESS_TOKEN_KEY);
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
		return window.localStorage.getItem(ACCESS_TOKEN_KEY);
	};
}

const instance = new JwtService();

export default instance;
