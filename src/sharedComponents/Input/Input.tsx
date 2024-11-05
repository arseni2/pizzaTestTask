import React, {forwardRef} from 'react';
import * as styles from "./Input.module.scss"


const Input = forwardRef((props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, ref: React.ForwardedRef<HTMLInputElement>) => {
	return (
		<input ref={ref} className={styles.input} {...props}/>
	);
});

export default Input;