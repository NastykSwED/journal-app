import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

const authState: authStateTypes = {
	status: 'checking',
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState: authState,
	reducers: {
		login: (
			state: authStateTypes,
			action: PayloadAction<loginPayloadTypes>
		) => {
			const { payload } = action;

			state.status = 'authenticated';
			state.uid = payload.uid;
			state.email = payload.email;
			state.displayName = payload.displayName;
			state.photoURL = payload.photoURL;
			state.errorMessage = null;
		},

		logout: (
			state: authStateTypes,
			action: PayloadAction<logoutPayloadTypes>
		) => {
			state.status = 'not-authenticated';
			state.uid = null;
			state.email = null;
			state.displayName = null;
			state.photoURL = null;
			state.errorMessage = action.payload.errorMessage;
		},

		checkingCredentials: (state: authStateTypes) => {
			state.status = 'checking';
		},
	},
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
