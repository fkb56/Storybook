import type {ButtonHTMLAttributes, ReactNode} from 'react';
import {Google} from "../../SVG/Google/Google";
import {twMerge} from 'tailwind-merge';
import style from "./style.module.css"


export type ButtonProps = {
	/** Cette variable optionnelle permet d'ajouter des enfants aux boutons */
	children?: ReactNode;

	/** Cette variable optionnelle permet de choisir les différentes variantes de bouton (text, outlined, contained) */
	variant?: "text" | "outlined" | "contained" | "google";

	/** cette variable optionnelle permet de changer la couleur du bouton */
	color?: "danger" | "primary" | "success" | "warning" | "info" | "light" | "dark";

	/** Cette variable optionnelle permet de changer le type du bouton */
	type?: "button" | "submit" | "reset";
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Cette fonction permet de définir les différentes classes tailwind pour les boutons
 */
const ButtonVariant = (variant: string): string => {
	switch (variant.toLowerCase()) {
		case "text":
			return style.buttonText;
		case "outlined":
			return style.buttonOutlined;
		case "contained":
			return style.buttonContained;
		default:
			return style.buttonText;
	}
}

/**
 * Cette fonction permet de définir les différentes couleurs tailwind pour les boutons
 */
const ColorVariant = (color: string): string => {
	switch (color.toLowerCase()) {
		case "danger":
			return style.buttonDanger;
		case "primary":
			return style.buttonPrimary;
		case "success":
			return style.buttonSuccess;
		case "warning":
			return style.buttonWarning;
		case "info":
			return style.buttonInfo;
		case "light":
			return style.buttonLight;
		case "dark":
			return style.buttonDark;
		default:
			return style.buttonDanger;
	}
}

export function ButtonGoogle({
						   variant = "outlined",
						   color = "danger",
						   type = "button",
						   children,
						   className,
						   ...rest
					   }: ButtonProps) {
	const buttonStyle = ButtonVariant(variant)
	const buttonColor = ColorVariant(color)

	const classes: string = twMerge(
		`${style.button} ${buttonColor} ${buttonStyle} ${rest.disabled ? "cursor-not-allowed disabled" : ""}`,
		className
	);

	const googleClasses: string = twMerge(
		`${style.loginWithGoogleBtn} `,
		className
	);

	return (
		<>
			{variant === "google" ?
				(
					// TODO: Fix this
					/* eslint-disable react/button-has-type */
					<button type={type} className={googleClasses} {...rest}>
						<span className={style.beforeSvg}><Google/></span>
						{children}
					</button>
					/* eslint-enable react/button-has-type */
				) : (
					// TODO: Fix this
					/* eslint-disable react/button-has-type */
					<button type={type} className={classes} {...rest}>
						{children}
					</button>
					/* eslint-enable react/button-has-type */
				)}
		</>
	);
}
