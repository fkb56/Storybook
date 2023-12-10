import axios from "axios";
import {ApiDetails} from "./class/ApiDetails";

class AuthService extends ApiDetails{
	// apiDetails: ApiDetails;

	// get url()
	// url: string = this.url
	// private url: string;
	// private endpoints: object
	//
	//
	// constructor(url: string, endpoints: object) {
	// 	this.url = url;
	// 	this.endpoints = endpoints;
	// }

	getElementByQuerySelector(query?: string): HTMLInputElement {
		return document.querySelector(query);
	}

	async loginUser(loginDispatch: any, userDispatch: any, redirect: any, {loginCallback}: { loginCallback: any }) {
		const email: string = this.getElementByQuerySelector(".auth__email").querySelector("input").value;
		const password: string = this.getElementByQuerySelector(".auth__password").querySelector("input").value;

		loginDispatch({type: 'reset-all'});
		console.log("this.url", this.url, "this.endpoints.login", this.endpoints.login)

			/**
			 * POST the user request to the API endpoint '/login'.
			 */
		await axios.post(this.url + this.endpoints.login, {
			email: email,
			password: password
		}).then((response) => {
					console.log("response.data")
					console.log(response.data)
					// localStorage.setItem( 'token', response.data.token );
					loginDispatch({type: 'success', text: "login success"});
					userDispatch({type: 'user', text: response.data});
					loginCallback(response.data);
					console.log("loginCallback controller", loginCallback)
					// redirect("/")
				})
				.catch((error) => {
					console.log("error", error)
					if (error.response && error.response.data) {
						if (error.response.data.email) {
							loginDispatch({type: 'email-error', text: error.response.data.email});
						}
						if (error.response.data.username) {
							loginDispatch({type: 'username-error', text: error.response.data.username});
						}
						if (error.response.data.password) {
							loginDispatch({type: 'password-error', text: error.response.data.password});
						}
						if (error.response.data.code === 401) {
							loginDispatch({type: 'email-error', text: error.response.data.message});

						}
					} else {
						loginDispatch({type: 'email-error', text: "Unable to reach server..."});
					}
				});
		}



	async registerNewUser(registerDispatch: any, redirect: any, {registerCallback, apiDetails}: any = {}) {
		// getElementByQuerySelector("#a-form")
		const firstname = this.getElementByQuerySelector("#a-form .auth__firstname")?.value;
		const lastname = this.getElementByQuerySelector("#a-form .auth__lastname")?.value;
		const username = this.getElementByQuerySelector("#a-form .auth__username").value;
		const email = this.getElementByQuerySelector("#a-form .auth__email").value;
		const password = this.getElementByQuerySelector("#a-form .auth__password1").value;
		const password2 = this.getElementByQuerySelector("#a-form .auth__password2").value;

		if (password !== password2) {
			registerDispatch({type: 'password2-error', text: "Passwords don't match"});
			return;
		}

		registerDispatch({type: 'reset-all'});

		/**
		 * POST the user request to the API endpoint '/register'.
		 */
		axios.post(this.url + this.endpoints.register, {
			firstname: firstname,
			lastname: lastname,
			username: username,
			email: email,
			password: password,
			devise: "EUR",
		}, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => {
				// console.log("registerDispatch", response)
				registerDispatch({type: 'success', text: response.data});
				redirect("/")
			})
			.catch((error) => {
				if (error.response && error.response.data) {
					if (error.response.data.username) {
						registerDispatch({type: 'username-error', text: error.response.data.username});
					}
					if (error.response.data.email) {
						registerDispatch({type: 'email-error', text: error.response.data.email});
					}
					if (error.response.data.password) {
						registerDispatch({type: 'password-error', text: error.response.data.password});
					}
					if (error.response.data.password2) {
						registerDispatch({type: 'password2-error', text: error.response.data.password2});
					}
				} else {
					// console.log(error)
					registerDispatch({type: 'username-error', text: "Unable to reach server..."});
				}
			});
	}

	async validateNewUser(validateDispatch, {apiDetails}) {
		const validateCode = this.getElementByQuerySelector('.validate__code');

		validateDispatch({type: 'reset-all'});

		fetch(this.url + this.endpoints.validate, {
			method: "post",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				validatecode: validateCode.value
			})
		})
			.then(response => response.json())
			.then(text => {
				if (text.validatecode) {
					validateDispatch({type: 'validate-code-error', text: text.validatecode});
				}
				if (text.success) {
					validateDispatch({type: 'success', text: text.success});
					validateCode.value = '';
				}
			})
			.catch(e => {
				validateDispatch({
					type: 'validate-code-error',
					text: "Unable to reach server..."
				});
				// console.log(e);
			});
	}

	forgotPasswordOfUser(forgotPasswordDispatch, {apiDetails}) {
		const email = this.getElementByQuerySelector(".forgot-password__email");

		forgotPasswordDispatch({type: 'reset-all'});

		/**
		 * POST the user request to the API endpoint '/forgotpassword'.
		 */
		axios.post(this.url + this.endpoints.forgotPassword, {
			email: email.value
		})
			.then(function (response) {
				if (response.data.emailsent)
					forgotPasswordDispatch({type: 'email-success', text: response.data.emailsent});
			})
			.catch(function (error) {
				if (error.response && error.response.data && error.response.data.email) {
					forgotPasswordDispatch({type: 'email-error', text: error.response.data.email});
				} else {
					forgotPasswordDispatch({type: 'email-error', text: "Unable to reach server..."});
				}
			});
	}

	resetPasswordOfUser(resetPasswordDispatch, {apiDetails}) {
		const resetEmail = this.getElementByQuerySelector('.reset__email');
		const resetCode = this.getElementByQuerySelector('.reset__code');
		const resetPassword = this.getElementByQuerySelector('.reset__password');
		const resetPassword2 = this.getElementByQuerySelector('.reset__password2');

		resetPasswordDispatch({type: 'reset-all'});

		fetch(this.url + this.endpoints.resetPassword, {
			method: "post",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: resetEmail.value,
				resetcode: resetCode.value,
				password: resetPassword.value,
				password2: resetPassword2.value
			})
		})
			.then(response => response.json())
			.then(text => {
				if (text.email) {
					resetPasswordDispatch({type: 'email-error', text: text.email});
				}
				if (text.resetcode) {
					resetPasswordDispatch({type: 'reset-code-error', text: text.resetcode});
				}
				if (text.password) {
					resetPasswordDispatch({type: 'password-error', text: text.password});
				}
				if (text.password2) {
					resetPasswordDispatch({type: 'password2-error', text: text.password2});
				}
				if (text.success) {
					resetPasswordDispatch({type: 'success', text: text.success});
					resetEmail.value = '';
					resetCode.value = '';
					resetPassword.value = '';
					resetPassword2.value = '';
				}
			})
			.catch(e => {
				resetPasswordDispatch({
					type: 'email-error',
					text: "Unable to reach server..."
				});
				console.log(e);
			});
	}
}

export default AuthService;


















// import axios from "axios";
//
// let getElementByQuerySelector = (query?: string) => document.querySelector(query) as HTMLInputElement;
//
// const apiDetails = new ApiDetails()
// /**
//  * Try to login the user, send the details to the server
//  * and display the server response to the user.
//  */
// export const loginUser = async (loginDispatch: any, userDispatch: any, redirect: any, {loginCallback}: {loginCallback: any}) => {
// 	const email: string = getElementByQuerySelector(".auth__email").querySelector("input").value;
// 	const password: string = getElementByQuerySelector(".auth__password").querySelector("input").value;
//
// 	loginDispatch({type: 'reset-all'});
//
// 	/**
// 	 * POST the user request to the API endpoint '/login'.
// 	 */
// 	await axios.post(apiDetails.url + apiDetails.endpoints.login, {
// 		email: email,
// 		password: password
// 	})
// 		.then((response) => {
// 			console.log("response.data")
// 			console.log(response.data)
// 			// localStorage.setItem( 'token', response.data.token );
// 			loginDispatch({type: 'success', text: "login success"});
// 			userDispatch({type: 'user', text: response.data});
// 			loginCallback(response.data);
// 			console.log("loginCallback controller", loginCallback)
// 			// redirect("/")
// 		})
// 		.catch((error) => {
// 			console.log("error", error)
// 			if (error.response && error.response.data) {
// 				if (error.response.data.email) {
// 					loginDispatch({type: 'email-error', text: error.response.data.email});
// 				}
// 				if (error.response.data.username) {
// 					loginDispatch({type: 'username-error', text: error.response.data.username});
// 				}
// 				if (error.response.data.password) {
// 					loginDispatch({type: 'password-error', text: error.response.data.password});
// 				}
// 				if (error.response.data.code === 401) {
// 					loginDispatch({type: 'email-error', text: error.response.data.message});
//
// 				}
// 			} else {
// 				loginDispatch({type: 'email-error', text: "Unable to reach server..."});
// 			}
// 		});
// }
//
// /**
//  * Try to register the new user, send the details to the server
//  * and display the server response to the user.
//  */
// export const registerNewUser = (registerDispatch: any, redirect: any, {registerCallback, apiDetails}: any = {}) => {
// 	// getElementByQuerySelector("#a-form")
// 	const firstname = getElementByQuerySelector("#a-form .auth__firstname")?.value;
// 	const lastname = getElementByQuerySelector("#a-form .auth__lastname")?.value;
// 	const username = getElementByQuerySelector("#a-form .auth__username").value;
// 	const email = getElementByQuerySelector("#a-form .auth__email").value;
// 	const password = getElementByQuerySelector("#a-form .auth__password1").value;
// 	const password2 = getElementByQuerySelector("#a-form .auth__password2").value;
//
// 	if (password !== password2) {
// 		registerDispatch({type: 'password2-error', text: "Passwords don't match"});
// 		return;
// 	}
//
// 	registerDispatch({type: 'reset-all'});
//
// 	/**
// 	 * POST the user request to the API endpoint '/register'.
// 	 */
// 	axios.post(apiDetails.url + apiDetails.endpoints.register, {
// 		firstname: firstname,
// 		lastname: lastname,
// 		username: username,
// 		email: email,
// 		password: password,
// 		devise: "EUR",
// 	}, {
// 		headers: {
// 			'Content-Type': 'application/json'
// 		}
// 	})
// 		.then((response) => {
// 			// console.log("registerDispatch", response)
// 			registerDispatch({type: 'success', text: response.data});
// 			redirect("/")
// 		})
// 		.catch((error) => {
// 			if (error.response && error.response.data) {
// 				if (error.response.data.username) {
// 					registerDispatch({type: 'username-error', text: error.response.data.username});
// 				}
// 				if (error.response.data.email) {
// 					registerDispatch({type: 'email-error', text: error.response.data.email});
// 				}
// 				if (error.response.data.password) {
// 					registerDispatch({type: 'password-error', text: error.response.data.password});
// 				}
// 				if (error.response.data.password2) {
// 					registerDispatch({type: 'password2-error', text: error.response.data.password2});
// 				}
// 			} else {
// 				// console.log(error)
// 				registerDispatch({type: 'username-error', text: "Unable to reach server..."});
// 			}
// 		});
// }
//
// /**
//  * Send the Validation Code to the backend for processing.
//  */
// function validateNewUser(validateDispatch, {apiDetails}) {
// 	const validateCode = getElementByQuerySelector('.validate__code');
//
// 	validateDispatch({type: 'reset-all'});
//
// 	fetch(apiDetails.url + apiDetails.endpoints.validate, {
// 		method: "post",
// 		headers: {
// 			'Accept': 'application/json',
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({
// 			validatecode: validateCode.value
// 		})
// 	})
// 		.then(response => response.json())
// 		.then(text => {
// 			if (text.validatecode) {
// 				validateDispatch({type: 'validate-code-error', text: text.validatecode});
// 			}
// 			if (text.success) {
// 				validateDispatch({type: 'success', text: text.success});
// 				validateCode.value = '';
// 			}
// 		})
// 		.catch(e => {
// 			validateDispatch({
// 				type: 'validate-code-error',
// 				text: "Unable to reach server..."
// 			});
// 			// console.log(e);
// 		});
// }
//
// /**
//  * Try to initiate the reset of the user's password, send
//  * the details to the server and display the server response
//  * to the user.
//  */
// function forgotPasswordOfUser(forgotPasswordDispatch, {apiDetails}) {
// 	const email = getElementByQuerySelector(".forgot-password__email");
//
// 	forgotPasswordDispatch({type: 'reset-all'});
//
// 	/**
// 	 * POST the user request to the API endpoint '/forgotpassword'.
// 	 */
// 	axios.post(apiDetails.url + apiDetails.endpoints.forgotPassword, {
// 		email: email.value
// 	})
// 		.then(function (response) {
// 			if (response.data.emailsent)
// 				forgotPasswordDispatch({type: 'email-success', text: response.data.emailsent});
// 		})
// 		.catch(function (error) {
// 			if (error.response && error.response.data && error.response.data.email) {
// 				forgotPasswordDispatch({type: 'email-error', text: error.response.data.email});
// 			} else {
// 				forgotPasswordDispatch({type: 'email-error', text: "Unable to reach server..."});
// 			}
// 		});
// }
//
// /**
//  * Send the Reset Token to the backend for processing,
//  * along with User details for password reset.
//  */
// function resetPasswordOfUser(resetPasswordDispatch, {apiDetails}) {
// 	const resetEmail = getElementByQuerySelector('.reset__email');
// 	const resetCode = getElementByQuerySelector('.reset__code');
// 	const resetPassword = getElementByQuerySelector('.reset__password');
// 	const resetPassword2 = getElementByQuerySelector('.reset__password2');
//
// 	resetPasswordDispatch({type: 'reset-all'});
//
// 	fetch(apiDetails.url + apiDetails.endpoints.resetPassword, {
// 		method: "post",
// 		headers: {
// 			'Accept': 'application/json',
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({
// 			email: resetEmail.value,
// 			resetcode: resetCode.value,
// 			password: resetPassword.value,
// 			password2: resetPassword2.value
// 		})
// 	})
// 		.then(response => response.json())
// 		.then(text => {
// 			if (text.email) {
// 				resetPasswordDispatch({type: 'email-error', text: text.email});
// 			}
// 			if (text.resetcode) {
// 				resetPasswordDispatch({type: 'reset-code-error', text: text.resetcode});
// 			}
// 			if (text.password) {
// 				resetPasswordDispatch({type: 'password-error', text: text.password});
// 			}
// 			if (text.password2) {
// 				resetPasswordDispatch({type: 'password2-error', text: text.password2});
// 			}
// 			if (text.success) {
// 				resetPasswordDispatch({type: 'success', text: text.success});
// 				resetEmail.value = '';
// 				resetCode.value = '';
// 				resetPassword.value = '';
// 				resetPassword2.value = '';
// 			}
// 		})
// 		.catch(e => {
// 			resetPasswordDispatch({
// 				type: 'email-error',
// 				text: "Unable to reach server..."
// 			});
// 			console.log(e);
// 		});
// }