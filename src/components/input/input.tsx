import type {InputHTMLAttributes, ReactNode} from 'react';
import {useEffect, useRef} from 'react';
import cx from "classnames";
import styles from './style.module.css';

export type InputProps = {
	children?: ReactNode;
	type?: "text" | "password" | "email";
	inputClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>

export function Input({children, type = "text", className, inputClassName, ...rest}: InputProps) {

	const inputRef = useRef(null);

	const classes = cx(styles.group, className);

	useEffect(() => {
		if (inputRef.current?.value.length > 0) {
			inputRef.current.classList.add(styles.input_active)
		}
	}, [inputRef.current?.value.length]);

	return (
		<div className={classes}>
			<input type={type} {...rest} className={inputClassName} ref={inputRef}/>
			{/* <span className={styles.highlight}></span> */}
			<span className={styles.bar}/>
			{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
			<label>{children}</label>
		</div>
	);
}
