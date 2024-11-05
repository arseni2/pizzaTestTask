import React from 'react';
import * as styles from "./Label.module.scss"


const Label = (props: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>) => {
	return (
		<label className={styles.label}>
			{props.children}
		</label>
	);
};

export default Label;