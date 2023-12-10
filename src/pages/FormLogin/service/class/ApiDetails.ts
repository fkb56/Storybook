export class ApiDetails {

	private _url: string;
	private _endpoints: {
		login: string,
		register: string,
		validate?: string,
		forgotPassword?: string,
		resetPassword?: string
	}


	constructor(url: string, endpoints: {login: string, register: string, validate?: string, forgotPassword?: string, resetPassword?: string}) {
		this._url = url;
		this._endpoints = endpoints;
	}


	get url(): string {
		return this._url;
	}

	set url(value: string) {
		this._url = value;
	}

	get endpoints(): {
		login: string;
		register: string;
		validate?: string;
		forgotPassword?: string;
		resetPassword?: string
	} {
		return this._endpoints;
	}

	set endpoints(value: {
		login: string;
		register: string;
		validate?: string;
		forgotPassword?: string;
		resetPassword?: string
	}) {
		this._endpoints = value;
	}
}