import React from 'react';
import * as styles from "./ButtonPrimary.module.scss"


const ButtonPrimary = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
	return (
		<button className={styles.buttonPrimary}>
			{props.children}
		</button>
	);
};

export default ButtonPrimary;