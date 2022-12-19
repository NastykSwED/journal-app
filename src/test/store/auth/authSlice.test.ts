import { AnyAction } from '@reduxjs/toolkit';
import { describe, expect, it } from 'vitest';

import { authSlice, login, logout } from '../../../store/auth/authSlice';
import {
	initialAuthState,
	demoUser,
	authenticatedState,
	notAuthenticatedState,
} from '../../fixtures/auxFixtures';

describe('Testing AuthSlice', () => {
	it('It should return the initial state and be called "auth"', () => {
		expect(authSlice.name).toBe('auth');

		const state = authSlice.reducer(initialAuthState, {} as AnyAction);

		expect(state).toEqual(initialAuthState);
	});

	it('Authentication must be performed', () => {
		const state = authSlice.reducer(initialAuthState, login(demoUser));

		expect(state).toEqual(authenticatedState);
	});

	it('Should do the logout without arguments', () => {
		const state = authSlice.reducer(
			initialAuthState,
			logout({
				errorMessage: null,
			})
		);

		expect(state).toEqual(notAuthenticatedState);
	});

	it('Should do the logout with arguments and display a message error', () => {
		const errorMessage = 'Incorrect credentials';

		const state = authSlice.reducer(
			initialAuthState,
			logout({
				errorMessage: errorMessage,
			})
		);

		expect(state).toEqual({
			...notAuthenticatedState,
			errorMessage,
		});
	});
});
