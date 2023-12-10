import {useNavigate} from 'react-router-dom';
import {ButtonGoogle} from "../../components/ButtonGoogle/ButtonGoogle"
import {Input} from "../../components/input/input"
// import type {FormHTMLAttributes} from "react";
// TODO
// @ts-ignore
import style from "../../style.module.css";
import {validateEmail} from "./service/utils";
import {useLoginContext} from "./service/context/context";
import AuthService from "./service/controller";

export type FormLoginProps = {
	loginCallback?: () => void;
	apiDetails?: any;
}


export const FormLogin = ({loginCallback, apiDetails}: FormLoginProps) => {
	const navigate = useNavigate();

	const authService = new AuthService(apiDetails.url, apiDetails.endpoints);

	const {loginDispatch, userDispatch} = useLoginContext();

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (!validateEmail()) {
			console.log("handleSubmit")
			loginDispatch({type: 'emailError', text: "Ce n'est pas un email valide"});
			return;
		}

		await authService.loginUser(loginDispatch, userDispatch, navigate, {loginCallback});
		console.log("loginCallback", loginCallback);
	}

	return (
		<form className={style.form} id="b-form" onSubmit={handleSubmit}>
			<h2 className={`${style.formTitle} ${style.title}`}>Se connecter</h2>
			<div>
				<ButtonGoogle variant="google" className={style.buttonGoogle}>Se connecter avec Google</ButtonGoogle>
			</div>
			<span className={style.formSpan}>
                ou connectez vous avec votre adresse mail
              </span>
			<Input
				className={`${style.formInput} auth__email`}
				type="text"
			>Entrez votre adresse email</Input>
			<Input
				className={`${style.formInput} auth__password`}
				type="password"
			>Entrez votre mots de passe</Input>
			{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
			{/* TODO ajouter la page de mots de passe oublié */}
			{/* <a href="#" className={style.formLink}>Mots de passe oublié ?</a> */}
			<button type="submit" className={`${style.formButton} ${style.button} ${style.submit}`}>
				SE CONNECTER
			</button>
		</form>
	)
}
