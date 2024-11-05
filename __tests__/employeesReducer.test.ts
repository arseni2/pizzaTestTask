import { employeeType } from "@/api";
import { filterEmplsPayloadType } from "@/redux/reducer/EmplReducerTypes";
import {actions, employeesReducer} from "@/redux/reducer/EmplReducer";

describe("employeesReducer", () => {
	const initialEmployees: employeeType[] = [
		{ id: 1, name: "Alice", role: "developer", birthday: "1990-01-01", isArchive: false, phone: "123" },
		{ id: 2, name: "Bob", role: "designer", birthday: "1985-05-20", isArchive: true, phone: "123"},
	];

	const initialState = {
		employees: initialEmployees,
		allEmployees: initialEmployees,
	};

	it("should filter employees by role and archived status", () => {
		const payload: filterEmplsPayloadType = {
			role: "developer",
			sortBy: { isArchived: false, name: true, birthdate: false },
		};

		const action = actions.filterEmpls(payload);
		const newState = employeesReducer(initialState, action);

		expect(newState.employees).toEqual([
			{ id: 1, name: "Alice", role: "developer", birthday: "1990-01-01", isArchive: false, phone: "123" },
		]);
	});

	it("should add a new employee", () => {
		const newEmployee: employeeType = {
			id: 3,
			name: "Charlie",
			role: "manager",
			birthday: "1992-08-10",
			phone: "123",
			isArchive: false,
		};

		const action = actions.createEmpl(newEmployee);
		const newState = employeesReducer(initialState, action);

		expect(newState.employees).toHaveLength(3);
		expect(newState.employees).toContainEqual(newEmployee);
	});

	it("should update an existing employee", () => {
		const updatedEmployee: employeeType = {
			id: 1,
			name: "Alice",
			role: "senior developer",
			birthday: "1990-01-01",
			phone: "123",
			isArchive: false,
		};

		const action = actions.updateEmpl(updatedEmployee);
		const newState = employeesReducer(initialState, action);

		expect(newState.employees).toContainEqual(updatedEmployee);
		expect(newState.employees).not.toContainEqual(initialEmployees[0]);
	});
});