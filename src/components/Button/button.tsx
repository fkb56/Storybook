import './Button.css';
import {ButtonHTMLAttributes} from "react";

export type ButtonProps = {
	/**
	 * Is this the principal call to action on the page?
	 */
	primary?: boolean;
	/**
	 * What background color to use
	 */
	backgroundColor?: string;
	/**
	 * How large should the button be?
	 */
	size?: 'small' | 'medium' | 'large',
	/**
	 * Button contents
	 */
	label: string
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Primary UI component for user interaction
 */
export const Button = ({primary, backgroundColor, size, label, ...props}: ButtonProps) => {
	const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
			style={backgroundColor && {backgroundColor}}
			{...props}
		>
			{label}
		</button>
	);
};

Button.defaultProps = {
	backgroundColor: null,
	primary: false,
	size: 'medium',
};
