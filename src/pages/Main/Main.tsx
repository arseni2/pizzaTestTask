import React from 'react';
import * as styles from "./Main.module.scss"
import {useSelector} from "react-redux";
import {getEmpls} from "@/redux/selector/EmplSelector";
import TableItem from "@/components/TableItem/TableItem";
import FilterForm from "@/components/FilterForm/FilterForm";
import CreateUpdateEmplForm from "@/components/CreateUpdateEmplForm/CreateUpdateEmplForm";

const Main = () => {
	const empls = useSelector(getEmpls)
	console.log(empls.length)
	console.log(empls)
	return (
		<>
			<h2>Форма создания</h2>
			<CreateUpdateEmplForm id={empls.length + 1}/>
			<FilterForm/>

			<div className={styles.tableContainer}>
				<table className={styles.table}>
					<thead className={styles.tableHead}>
					<tr>
						<th scope="col" className={styles.tableHeader}>Имя</th>
						<th scope="col" className={styles.tableHeader}>Должность</th>
						<th scope="col" className={styles.tableHeader}>Телефон</th>
					</tr>
					</thead>
					<tbody className={styles.tableBody}>
					{empls.map((empl, i) => {
						return <TableItem key={i} {...empl} />
					})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Main;