import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import Input from "@/sharedComponents/Input/Input";
import Label from "@/sharedComponents/Label/Label";
import Select from "@/sharedComponents/Select/Select";
import ButtonPrimary from "@/sharedComponents/ButtonPrimary/ButtonPrimary";
import {useDispatch} from "react-redux";
import {actions} from "@/redux/reducer/EmplReducer";
import {employeeType} from "@/api";
import CustomMaskedInput from "@/sharedComponents/Input/CustomMaskedInput";
import * as styles from "./CreateUpdateEmplForm.module.scss"


const schema = z.object({
	name: z.string({required_error: "Поле обязательное"})
		.min(1, "Имя обязательно")
		.regex(/^[A-Za-zА-Яа-яЁё\s]+$/, "Имя должно содержать только буквы и пробелы")
		.refine((value) => /\s/.test(value), {
			message: "Имя должно содержать и фамилию (например, 'Имя Фамилия')",
		}),
	phone: z.string({required_error: "Поле обязательное"})
		.min(10, "Телефон должен содержать как минимум 10 цифр")
		.regex(/^\+?[0-9\s\(\)-]+$/, "Неверный формат телефона"),
	birthday: z.string({required_error: "Поле обязательное"})
		.refine((value) => {
			const dateRegex = /^\d{1,2}\.\d{1,2}\.\d{4}$/; // ДД.ММ.ГГГГ
			return dateRegex.test(value);
		}, {message: "Неверный формат даты рождения (дд.мм.гггг)"}),
	role: z.string({required_error: "Поле обязательное"}),
});
type propsType = {
	isUpdate?: boolean
}
const CreateUpdateEmplForm = (props: Partial<employeeType> & propsType) => {
	const dispatch = useDispatch();

	const {control, handleSubmit, formState: {errors}} = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			name: props.name || "",
			role: props.role || "driver",
			phone: props.phone || "",
			birthday: props.birthday || "",
		}
	});

	const onSubmit = (data: employeeType) => {
		data.id = props.id
		if(props.isUpdate) {
			dispatch(actions.updateEmpl({...data}))
			console.log('Submitted Data:', props.id);
			return
		}
		dispatch(actions.createEmpl({...data, isArchive: false}));
		console.log('Submitted Data:', data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.formGroup}>
				<Label>Имя</Label>
				<Controller
					name="name"
					control={control}
					render={({field}) => (
						<Input {...field} />
					)}
				/>
				{errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
			</div>

			<div className={styles.formGroup}>
				<Label>Должность</Label>
				<Controller
					name="role"
					control={control}
					render={({field}) => (
						<Select {...field}>
							<option value="driver">водитель</option>
							<option value="waiter">официант</option>
							<option value="cook">повар</option>
						</Select>
					)}
				/>
			</div>
			<div className={styles.formGroup}>
				<Label>Телефон</Label>
				<Controller
					name="phone"
					control={control}
					render={({field}) => (
						<CustomMaskedInput
							mask={"+9 (999) 999-999"}
							ref={field.ref}
							{...field}
							placeholder="Введите телефон"
						/>
					)}
				/>
				{errors.phone && <p className={styles.errorMessage}>{errors.phone.message}</p>}
			</div>

			<div className={styles.formGroup}>
				<Label>Дата рождения</Label>
				<Controller
					name="birthday"
					control={control}
					render={({field}) => (
						<CustomMaskedInput
							mask={"99.99.9999"}
							ref={field.ref}
							{...field}
							placeholder="дд.мм.гггг"
							type="text"
						/>
					)}
				/>
				{errors.birthday && <p className={styles.errorMessage}>{errors.birthday.message}</p>}
			</div>

			<ButtonPrimary type="submit">Сохранить</ButtonPrimary>
		</form>
	);
};

export default CreateUpdateEmplForm;
