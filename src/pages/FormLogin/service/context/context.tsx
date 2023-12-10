import {createContext, ReactElement, useContext, useReducer} from 'react';

import {
	apiDetailsReducer,
	forgotPasswordReducer,
	loginReducer,
	registerReducer,
	resetPasswordReducer,
	userReducer,
	validateReducer
} from './reducers';
import {ApiDetails} from "../class/ApiDetails";
import {Action, ActionWithText} from "../../types";

export type LoginContextProviderProps = {
	children: ReactElement
};

export const LoginContext = createContext({
	apiDetails: {
		url: '',
		endpoints: {
			login: '',
			register: '',
			forgotPassword: '',
			resetPassword: ''
		}
	} as ApiDetails,
	apiDetailsDispatch: (action: any) => {
		// if (!action) {
		// 	throw new Error('Action must be provided');
		// }
		// if (!action.type) {
		// 	throw new Error('Action type must be provided');
		// }
		// Log the action only in development environment
		console.log("test", action)
		if (process.env.NODE_ENV === 'development') {
			console.log(action);
		}
		// return action
	},
	userData: {
		id: null,
		email: null,
		username: null,
		role: null,
		devise: null,
	},
	userDispatch: (action) => {
		if (!action) {
			throw new Error('Action must be provided');
		}
		if (!action.type) {
			throw new Error('Action type must be provided');
		}
		// Log the action only in development environment
		if (process.env.NODE_ENV === 'development') {
			console.log(action);
		}
		return action
	},
	loginState: {
		emailError: '',
		usernameError: '',
		passwordError: '',
		success: '',
		token: localStorage.getItem('token') || null,
	},
	loginDispatch: (action: Action) => {
		console.log(action)
	},
	registerState: {
		firstnameError: '',
		lastnameError: '',
		emailError: '',
		passwordError: '',
		password2Error: '',
		success: '',
	},
	registerDispatch: (action: ActionWithText) => {
		if (action.type == 'success') {
			localStorage.setItem('user', JSON.stringify(action.text))
		}
	},
	validateState: {
		validateCodeError: '',
		success: '',
	},
	validateDispatch: (action: Action) => {
		console.log(action)
	},
	forgotPasswordState: {
		emailError: '',
		emailSuccess: '',
	},
	forgotPasswordDispatch: (action: Action) => {
		console.log(action)
	},
	resetPasswordState: {
		emailError: '',
		resetCodeError: '',
		passwordError: '',
		password2Error: '',
		success: '',
	},
	resetPasswordDispatch: (action: Action) => {
		console.log(action)
	},
});


export const LoginContextProvider = ({children}) => {
	const [apiDetails, apiDetailsDispatch] = useReducer(apiDetailsReducer, new ApiDetails(
		"",
		{
			login: "",
			register: "",
			forgotPassword: "",
			resetPassword: ""
		}
	))
	const [userData, userDispatch] = useReducer(userReducer, {
		id: null,
		email: '',
		username: '',
		role: '',
		devise: '',
		token: localStorage.getItem('token') || null
	})
	const [loginState, loginDispatch] = useReducer(loginReducer, {
		emailError: '',
		usernameError: '',
		passwordError: '',
		success: '',
		token: ''
	});
	const [registerState, registerDispatch] = useReducer(registerReducer, {
		firstnameError: '',
		lastnameError: '',
		emailError: '',
		usernameError: '',
		passwordError: '',
		password2Error: '',
		success: '',
	});
	const [validateState, validateDispatch] = useReducer(validateReducer, {
		validateCodeError: '',
		success: '',
	});
	const [forgotPasswordState, forgotPasswordDispatch] = useReducer(forgotPasswordReducer, {
		emailError: '',
		emailSuccess: '',
	});
	const [resetPasswordState, resetPasswordDispatch] = useReducer(resetPasswordReducer, {
		emailError: '',
		resetCodeError: '',
		passwordError: '',
		password2Error: '',
		success: '',
	});

	return (
		<LoginContext.Provider value={
			{
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				apiDetails, apiDetailsDispatch,
				userData, userDispatch,
				loginState, loginDispatch,
				registerState, registerDispatch,
				validateState, validateDispatch,
				forgotPasswordState, forgotPasswordDispatch,
				resetPasswordState, resetPasswordDispatch
			}
		}>
			{children}
		</LoginContext.Provider>
	);
};

export const useLoginContext = () => useContext(LoginContext);