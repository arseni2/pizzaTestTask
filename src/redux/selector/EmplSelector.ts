import {AppStateType} from "@/redux/store";

export const getEmpls = (state: AppStateType) => state.employeesReducer.employees

export const getEmplById = (id: number) => (state: AppStateType) => state.employeesReducer.allEmployees.find((empl) => empl.id === id)