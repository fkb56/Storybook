/**
 * Reducers for maintaining the state of
 * 1. Login page,
 * 2. Register page &
 * 3. Forgot password page.
 */
import {ApiDetails} from "../class/ApiDetails";
import {
	Action,
	ActionWithText,
	ForgotPasswordState,
	LoginState,
	RegisterState, ResetPasswordState,
	UserData,
	ValidateState
} from "../../types";


const apiDetailsReducer = (state: ApiDetails, action: any) => {
	console.log("hvbnksjl,d;,kjhvgheqsbdnklnjksfvghdsvhjbvnjsnjvhsvbjvdxkjnsbjhdbhj")
	console.log("state", state)
	console.log("action", action)
	switch (action.type) {
		case 'set-url':
			return {
				...state,
				url: action.payload
			};
		case 'set-endpoints':
			return {
				...state,
				endpoints: action.payload
			};
		case 'set-api':
			return {
				...state,
				...action.payload
			};
		default:
			return state
		// switch (action.type) {
		//     case 'set-api':
		//         return {
		//             ...state,
		//             // id: action.object.id,
		//             // email: action.object.email,
		//             // username: action.object.username,
		//             // role: action.object.role,
		//             // devise: action.object.devise
		//         }
		//     case 'reset-all':
		//         return {
		//             ...state,
		//             // id: null,
		//             // email: '',
		//             // username: '',
		//             // role: '',
		//             // devise: ''
		//         };
		//     default:
		// return {...state, apiDetails: (action as ActionWithObject).object};
		// return {...state, action};

		// return {
		//             ...state,
		//             get url(): string {
		//                 return this.url
		//             },
		//             get endpoints(): {login: string, register: string, validate?: string, forgotPassword?: string, resetPassword?: string} {
		//                 return this.endpoints
		//             }
		//         // }
		//         // throw new Error('Unexpected action');
		// }
	}
}
const userReducer = (state: UserData, action: { type: string, object: UserData }) => {
	console.log("state", state)
	console.log("action", action)
	switch (action.type) {
		case 'success':
			return {
				...state,
				id: action.object.id,
				email: action.object.email,
				username: action.object.username,
				role: action.object.role,
				devise: action.object.devise
			}
		case 'reset-all':
			return {
				...state,
				id: null,
				email: '',
				username: '',
				role: '',
				devise: ''
			};
		default:
			throw new Error('Unexpected action');
	}
}
const loginReducer = (state: LoginState, action: Action): LoginState => {
	switch (action.type) {
		case 'user':
			console.log("login reducer state", state)
			return {
				...state,
			}
		case 'emailError':
			return {...state, emailError: (action as ActionWithText).text};
		case 'username-error':
			return {...state, usernameError: (action as ActionWithText).text};
		case 'password-error':
			return {...state, passwordError: (action as ActionWithText).text};
		case 'success':
			return {...state, success: (action as ActionWithText).text};
		case 'token':
			console.log('token', state.token);
			return {...state, token: localStorage.getItem('token') || null};
		case 'reset-all':
			return {
				...state,
				emailError: '',
				usernameError: '',
				passwordError: '',
				success: '',
				token: ''
			};
		default:
			console.log("error loginreducer", action)
			return {
				...state
			}
		// throw new Error('Unexpected action');
	}
};

const registerReducer = (state: RegisterState, action: Action) => {
	switch (action.type) {
		case 'firstname-error':
			return {...state, firstnameError: (action as ActionWithText).text};
		case 'lastname-error':
			return {...state, lastnameError: (action as ActionWithText).text};
		case 'email-error':
			return {...state, emailError: (action as ActionWithText).text};
		case 'password-error':
			return {...state, passwordError: (action as ActionWithText).text};
		case 'password2-error':
			return {...state, password2Error: (action as ActionWithText).text};
		case 'success':
			return {...state, success: (action as ActionWithText).text};
		case 'reset-all':
			return {
				...state,
				firstnameError: '',
				lastnameError: '',
				emailError: '',
				passwordError: '',
				password2Error: '',
				success: ''
			};
		default:
			throw new Error('Unexpected action');
	}
};

const validateReducer = (state: ValidateState, action: Action) => {
	switch (action.type) {
		case 'validate-code-error':
			return {...state, validateCodeError: (action as ActionWithText).text};
		case 'success':
			return {...state, success: (action as ActionWithText).text};
		case 'reset-all':
			return {
				...state,
				validateCodeError: '',
				success: ''
			};
		default:
			throw new Error('Unexpected action');
	}
};

const forgotPasswordReducer = (state: ForgotPasswordState, action: Action) => {
	switch (action.type) {
		case 'email-error':
			return {...state, emailError: (action as ActionWithText).text};
		case 'email-success':
			return {...state, emailSuccess: (action as ActionWithText).text};
		case 'reset-all':
			return {
				...state,
				emailError: '',
				emailSuccess: ''
			};
		default:
			throw new Error('Unexpected action');
	}
};

const resetPasswordReducer = (state: ResetPasswordState, action: Action) => {
	switch (action.type) {
		case 'email-error':
			return {...state, emailError: (action as ActionWithText).text};
		case 'reset-code-error':
			return {...state, resetCodeError: (action as ActionWithText).text};
		case 'password-error':
			return {...state, passwordError: (action as ActionWithText).text};
		case 'password2-error':
			return {...state, password2Error: (action as ActionWithText).text};
		case 'success':
			return {...state, success: (action as ActionWithText).text};
		case 'reset-all':
			return {
				...state,
				emailError: '',
				resetCodeError: '',
				passwordError: '',
				password2Error: '',
				success: ''
			};
		default:
			throw new Error('Unexpected action');
	}
};

export {
	apiDetailsReducer,
	userReducer,
	loginReducer,
	registerReducer,
	validateReducer,
	forgotPasswordReducer,
	resetPasswordReducer
}