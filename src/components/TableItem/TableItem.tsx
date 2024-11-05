import React from 'react';
import * as styles from "@/components/TableItem/TableItem.module.scss";
import {employeeType} from "@/api";
import {useNavigate} from "react-router-dom";

const TableItem = ({id, birthday, name, phone, isArchive, role}: employeeType) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`${id}`)
	}
	return (
		<tr className={styles.tableRow} onClick={handleClick}>
			<td className={styles.tableData}>{name}</td>
			<td className={styles.tableData}>{role}</td>
			<td className={styles.tableData}>{phone}</td>
		</tr>
	);
};

export default TableItem;