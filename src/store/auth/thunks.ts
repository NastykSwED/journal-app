import {
	loginWithEmailPassword,
	registerUserWithEmailPassword,
	singInWithGoogle,
	logoutFirabase,
} from '../../firebase';

import {
	AppDispatch,
	clearNotesLogout,
	checkingCredentials,
	logout,
	login,
} from '../';

export const checkingAuthentication = () => {
	return async (dispatch: AppDispatch) => {
		dispatch(checkingCredentials());
	};
};

export const startGoogleSignIn = () => {
	return async (dispatch: AppDispatch) => {
		dispatch(checkingCredentials());

		const result = await singInWithGoogle();

		const {
			displayName = null,
			uid = null,
			email = null,
			photoURL = null,
		} = result;

		if (!result.ok) {
			console.log('Error');

			return dispatch(
				logout({
					errorMessage: result.errorMessage!,
				})
			);
		}

		return dispatch(
			login({
				displayName,
				email,
				photoURL,
				uid,
			})
		);
	};
};

export const startCreatingUserWithEmailPassword = ({
	email,
	password,
	displayName,
}: startCreatingUserWithEmailPasswordProps) => {
	return async (dispatch: AppDispatch) => {
		dispatch(checkingCredentials());

		const {
			ok = null,
			uid = null,
			photoURL = null,
			errorMessage = null,
		} = await registerUserWithEmailPassword({
			displayName,
			email,
			password,
		});

		if (!ok)
			return dispatch(
				logout({
					errorMessage,
				})
			);

		dispatch(login({ uid, displayName, email, photoURL }));
	};
};

export const startLoginWithEmailPassword = ({
	email,
	password,
}: startLoginWithEmailPasswordProps) => {
	return async (dispatch: AppDispatch) => {
		dispatch(checkingCredentials());

		const result = await loginWithEmailPassword({
			email,
			password,
		});

		const { displayName = null, uid = null, photoURL = null } = result;

		if (!result.ok)
			return dispatch(
				logout({
					errorMessage: result.errorMessage!,
				})
			);

		dispatch(
			login({
				email,
				displayName,
				uid,
				photoURL,
			})
		);
	};
};

export const startLogout = () => {
	return async (dispatch: AppDispatch) => {
		await logoutFirabase();

		dispatch(clearNotesLogout());

		dispatch(
			logout({
				errorMessage: null,
			})
		);
	};
};
