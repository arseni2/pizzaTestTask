import React, {forwardRef} from 'react';
import * as styles from "./Select.module.scss"


type propsType = {
	children?: React.ReactElement[],
	value: string,
	onChange: (event: any) => void,
	name?: string
}
const Select = forwardRef((props: propsType, ref: React.ForwardedRef<HTMLSelectElement>) => {
	return (
		<select ref={ref} className={styles.select} {...props}>
			{props.children}
		</select>
	);
});

export default Select;