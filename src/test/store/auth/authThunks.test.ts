import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
	checkingCredentials,
	clearNotesLogout,
	login,
	logout,
} from '../../../store';

import {
	checkingAuthentication,
	startCreatingUserWithEmailPassword,
	startGoogleSignIn,
} from '../../../store/auth/thunks';

import { demoUser } from '../../fixtures/auxFixtures';
import { registerUserWithEmailPassword } from '../../../firebase/providers';
import {
	startLoginWithEmailPassword,
	startLogout,
} from '../../../store/auth/thunks';

import {
	loginWithEmailPassword,
	logoutFirebase,
	singInWithGoogle,
} from '../../../firebase/providers';

vi.mock('../../../firebase/providers');

describe('Testing AuthThunks', () => {
	const dispatch = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('Must invoke the checkingCredentials', async () => {
		await checkingAuthentication()(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
	});

	it('startGoogleSignIn should call checkingCredentials and successfully log you in.', async () => {
		const loginData = {
			ok: true,
			...demoUser,
		};

		vi.mocked(singInWithGoogle).mockResolvedValue(loginData);

		await startGoogleSignIn()(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());

		expect(dispatch).toHaveBeenCalledWith(
			login({
				email: loginData.email,
				displayName: loginData.displayName,
				uid: loginData.uid,
				photoURL: loginData.photoURL,
			})
		);
	});

	it('startGoogleSignIn should call checkingCredentials and logout with a error Message', async () => {
		const loginData = {
			ok: false,
			errorMessage: 'Erro Firebase',
		};

		vi.mocked(singInWithGoogle).mockResolvedValue(loginData);

		await startGoogleSignIn()(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());

		expect(dispatch).toBeCalledWith(
			logout({
				errorMessage: loginData.errorMessage,
			})
		);
	});

	it('startLoginWithEmailPassword should call checkingCredentials and successfully log you in', async () => {
		const loginData = {
			ok: true,
			...demoUser,
		};

		const formData = {
			email: loginData.email,
			password: '123456',
		};

		vi.mocked(loginWithEmailPassword).mockResolvedValue(loginData);

		await startLoginWithEmailPassword(formData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());

		expect(dispatch).toHaveBeenCalledWith(
			login({
				email: loginData.email,
				displayName: loginData.displayName,
				uid: loginData.uid,
				photoURL: loginData.photoURL,
			})
		);
	});

	it('startLoginWithEmailPassword should call checkingCredentials and logout with a error Message', async () => {
		const loginData = {
			ok: false,
			errorMessage: 'Error Firebase',
		};

		const formData = {
			email: demoUser.email,
			password: '123456',
		};

		vi.mocked(loginWithEmailPassword).mockResolvedValue(loginData);

		await startLoginWithEmailPassword(formData)(dispatch);

		expect(dispatch).toBeCalledWith(checkingCredentials());
		expect(dispatch).toBeCalledWith(
			logout({
				errorMessage: loginData.errorMessage,
			})
		);
	});

	it('startCreatingUserWithEmailPassword should call checkingCredentials and registerUserWithEmailPassword when the answer is correct', async () => {
		const loginData = {
			ok: true,
			...demoUser,
		};

		const formData = {
			email: demoUser.email,
			password: '123456',
			displayName: demoUser.displayName,
		};

		vi.mocked(registerUserWithEmailPassword).mockResolvedValue(loginData);

		await startCreatingUserWithEmailPassword(formData)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());

		expect(dispatch).toHaveBeenCalledWith(
			login({
				email: loginData.email,
				displayName: loginData.displayName,
				uid: loginData.uid,
				photoURL: loginData.photoURL,
			})
		);
	});

	it('startLogout must call logoutFirebase, clearNotes and logout', async () => {
		vi.mocked(logoutFirebase).mockResolvedValue();

		await startLogout()(dispatch);

		expect(logoutFirebase).toHaveBeenCalled();

		expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());

		expect(dispatch).toHaveBeenCalledWith(
			logout({
				errorMessage: null,
			})
		);
	});
});
