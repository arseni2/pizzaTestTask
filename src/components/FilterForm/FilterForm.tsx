import React, {useState} from 'react';
import ButtonPrimary from "@/sharedComponents/ButtonPrimary/ButtonPrimary";
import ButtonDanger from "@/sharedComponents/ButtonDanger/ButtonDanger";
import Label from "@/sharedComponents/Label/Label";
import Select from "@/sharedComponents/Select/Select";
import * as styles from "./FilterForm.module.scss"
import Input from "@/sharedComponents/Input/Input";
import {filterEmplsPayloadType} from "@/redux/reducer/EmplReducerTypes";
import {useDispatch} from "react-redux";
import {actions} from "@/redux/reducer/EmplReducer";


const FilterForm = () => {
	const dispatch = useDispatch();
	const [formValues, setFormValues] = useState<filterEmplsPayloadType>({
		role: 'all',
		sortBy: {
			birthdate: false,
			name: false,
			isArchived: false,
		},
	});

	const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setFormValues({ ...formValues, role: event.target.value });
	};

	const handleSortByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		setFormValues({
			...formValues,
			sortBy: {
				...formValues.sortBy,
				[name]: checked,
			},
		});
	};

	const handleResetClick = () => {
		setFormValues({
			role: 'all',
			sortBy: {
				birthdate: false,
				name: false,
				isArchived: false,
			},
		})

	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(actions.filterEmpls(formValues));
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Фильтрация</h2>

			<div className={styles.formGroup}>
				<Label>Должность</Label>
				<Select value={formValues.role} onChange={handleRoleChange}>
					<option value="all">все должности</option>
					<option value="driver">водитель</option>
					<option value="waiter">официант</option>
					<option value="cook">повар</option>
				</Select>
			</div>

			<div className={styles.formGroup}>
				<Label>Статус</Label>
				<label className={styles.checkboxLabel}>
					В архиве
					<Input
						type="checkbox"
						name="isArchived"
						checked={formValues.sortBy.isArchived}
						onChange={handleSortByChange}
					/>
				</label>
			</div>

			<div className={styles.formGroup}>
				<Label>Сортировать по</Label>
				<label className={styles.checkboxLabel}>
					Дата рождения
					<Input
						type="checkbox"
						name="birthdate"
						checked={formValues.sortBy.birthdate}
						onChange={handleSortByChange}
					/>
				</label>
				<label className={styles.checkboxLabel}>
					Имя
					<Input
						type="checkbox"
						name="name"
						checked={formValues.sortBy.name}
						onChange={handleSortByChange}
					/>
				</label>
			</div>

			<ButtonPrimary type="submit">Применить</ButtonPrimary>
			<ButtonDanger type="submit" onClick={handleResetClick}>Сбросить</ButtonDanger>
		</form>
	);
};


export default FilterForm;