import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
// import Main from '@/pages/Main/Main';
// import Edit from '@/pages/Edit/Edit';
import React from "react";
import {App} from "@/App";

jest.mock('@/pages/Main/Main', () => () => <div>Main Page</div>);
jest.mock('@/pages/Edit/Edit', () => () => <div>Edit Page</div>);

describe('App component', () => {
	test('renders Main component on "/" route', () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<App />
				</MemoryRouter>
		);

		expect(screen.getByText('Main Page')).toBeInTheDocument();
	});

	test('renders Edit component on "/:id" route', () => {
		render(
			<MemoryRouter initialEntries={['/123']}>
				<App />
				</MemoryRouter>
		);

		expect(screen.getByText('Edit Page')).toBeInTheDocument();
	});
});
