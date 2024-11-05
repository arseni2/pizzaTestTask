import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store as rStore } from '@/redux/store';
import { actions } from "@/redux/reducer/EmplReducer";
import React from "react";
import CreateUpdateEmplForm from "@/components/CreateUpdateEmplForm/CreateUpdateEmplForm";


const store = rStore;

jest.mock('@/sharedComponents/Input/Input', () => (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => <input data-testid="input" {...props} />);
jest.mock('@/sharedComponents/Label/Label', () => ({ children }: { children: React.ReactNode }) => <label>{children}</label>);
jest.mock('@/sharedComponents/Select/Select', () => ({ children }: { children: React.ReactNode }) => (
	<select data-testid="select">{children}</select>
));
jest.mock('@/sharedComponents/ButtonPrimary/ButtonPrimary', () => ({ children }: { children: React.ReactNode }) => (
	<button>{children}</button>
));
jest.mock('@/sharedComponents/Input/CustomMaskedInput', () => (props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & { mask: string }) => (
	<input {...props} data-testid="masked-input" />
));

jest.mock('@/redux/reducer/EmplReducer', () => ({
	actions: {
		createEmpl: jest.fn(),
		updateEmpl: jest.fn(),
	},
}));

interface CreateUpdateEmplFormProps {
	id?: number;
	name?: string;
	phone?: string;
	birthday?: string;
	role?: string;
	isUpdate?: boolean;
}

describe('CreateUpdateEmplForm component', () => {
	const setup = (props: CreateUpdateEmplFormProps = {}) => {
		render(
			<Provider store={store}>
				<CreateUpdateEmplForm {...props} />
			</Provider>
		);
	};

	test('renders the form correctly', () => {
		setup();

		expect(screen.getByLabelText(/Имя/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Должность/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Телефон/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Дата рождения/i)).toBeInTheDocument();
	});

	test('shows validation errors on submit with empty fields', async () => {
		setup();

		fireEvent.click(screen.getByText(/Сохранить/i));

		await waitFor(() => {
			expect(screen.getByText(/Поле обязательное/i)).toBeInTheDocument();
		});
	});

	test('validates form inputs and submits data', async () => {
		setup();

		fireEvent.change(screen.getByLabelText(/Имя/i), { target: { value: 'Иван Иванов' } });
		fireEvent.change(screen.getByLabelText(/Телефон/i), { target: { value: '+7 (999) 999-9999' } });
		fireEvent.change(screen.getByLabelText(/Дата рождения/i), { target: { value: '10.10.1990' } });
		fireEvent.change(screen.getByLabelText(/Должность/i), { target: { value: 'driver' } });

		fireEvent.click(screen.getByText(/Сохранить/i));

		await waitFor(() => {
			expect(actions.createEmpl).toHaveBeenCalledWith(expect.objectContaining({
				name: 'Иван Иванов',
				phone: '+7 (999) 999-9999',
				birthday: '10.10.1990',
				role: 'driver',
				isArchive: false,
			}));
		});
	});

	test('calls updateEmpl when isUpdate prop is true', async () => {
		setup({ id: 1, name: 'Иван Иванов', phone: '+7 (999) 999-9999', birthday: '10.10.1990', role: 'driver', isUpdate: true });

		fireEvent.click(screen.getByText(/Сохранить/i));

		await waitFor(() => {
			expect(actions.updateEmpl).toHaveBeenCalledWith(expect.objectContaining({
				id: 1,
				name: 'Иван Иванов',
				phone: '+7 (999) 999-9999',
				birthday: '10.10.1990',
				role: 'driver',
			}));
		});
	});
});