import React from 'react';
import * as styles from "./ButtonDanger.module.scss"


const ButtonDanger = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
	return (
		<button className={styles.buttonDanger} {...props}>
			{props.children}
		</button>
	);
};

export default ButtonDanger;