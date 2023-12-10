let getElementByQuerySelector = (query?: string) => document.querySelector(query) as HTMLInputElement;

export const onSubmit = (e) => {
	e.preventDefault();
	console.log(e)
}

export const validateEmail = (): boolean => {
	const email: string = getElementByQuerySelector(".auth__email").querySelector("input").value;

	const re: RegExp = /^[\w-._%+-]+@([\w-]+\.)+[A-Za-z]{2,4}$/;

	return re.test(email);
}