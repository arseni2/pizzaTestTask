import {combineReducers, legacy_createStore as createStore} from "redux";
import {employeesReducer} from "@/redux/reducer/EmplReducer";

let rootReducer = combineReducers({
	employeesReducer: employeesReducer
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export const store = createStore(rootReducer)