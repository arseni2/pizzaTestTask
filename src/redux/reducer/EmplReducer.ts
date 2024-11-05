import { employees, employeeType } from "@/api";
import { InferActionsTypes } from "@/redux/store";
import { filterEmplsPayloadType } from "@/redux/reducer/EmplReducerTypes";

let initialState = {
	employees: employees as employeeType[],
	allEmployees: employees as employeeType[],
};

type InitialStateType = typeof initialState;

export const employeesReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
	switch (action.type) {
		case 'EMPLS/FILTER':
			const { role, sortBy } = action.payload;

			const filteredEmployees = state.allEmployees.filter(employee => {
				const isRoleMatch = role === 'all' || employee.role === role;
				const isArchivedMatch = sortBy.isArchived ? employee.isArchive : !employee.isArchive;
				return sortBy.isArchived ? isRoleMatch && isArchivedMatch : isRoleMatch;
			});

			const sortedEmployees = filteredEmployees.sort((a, b) => {
				if (sortBy.name) {
					return a.name.localeCompare(b.name);
				}
				if (sortBy.birthdate) {
					return new Date(a.birthday).getTime() - new Date(b.birthday).getTime();
				}
				return 0;
			});

			return {
				...state,
				employees: sortedEmployees,
			};

		case 'EMPLS/CREATE':
			return {
				...state,
				employees: [...state.employees, action.payload],
				allEmployees: [...state.allEmployees, action.payload],
			}

		case "EMPLS/UPDATE":
			console.log("action.payload", action.payload)
			const updatedEmployees = state.allEmployees.map(employee =>
				employee.id === action.payload.id ? { ...employee, ...action.payload } : employee
			);

			console.log('Updated employees:', updatedEmployees);
			return {
				...state,
				employees: updatedEmployees,
				allEmployees: updatedEmployees,
			};

		default:
			return state;
	}
};

export const actions = {
	filterEmpls: (payload: filterEmplsPayloadType) => ({ type: 'EMPLS/FILTER', payload } as const),
	createEmpl: (payload: employeeType) => ({ type: 'EMPLS/CREATE', payload } as const),
	updateEmpl: (payload: employeeType) => ({ type: 'EMPLS/UPDATE', payload } as const),
};

type ActionsTypes = InferActionsTypes<typeof actions>;
