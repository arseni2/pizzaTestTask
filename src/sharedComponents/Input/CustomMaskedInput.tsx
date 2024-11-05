import React, {DetailedHTMLProps, forwardRef, InputHTMLAttributes, useRef} from "react";
import * as styles from "./Input.module.scss"
import {withMask} from "use-mask-input";
import Input from "@/sharedComponents/Input/Input";

type propsType = {
	mask: string
}
const CustomMaskedInput = React.forwardRef((props: propsType & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref">, ref: React.ForwardedRef<HTMLInputElement>) => {
	const inputRef = withMask(props.mask, {});
	return (
		<Input
			ref={inputRef}
			className={styles.input}
			{...props}
		/>
	);
});

export default CustomMaskedInput;