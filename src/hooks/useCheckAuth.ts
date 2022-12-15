import { useEffect } from 'react';

import {
	useAppDispatch,
	useAppSelector,
	login,
	logout,
	startLoadingNotes,
} from '../store';

import { FirebaseAuth } from '../firebase';

import { onAuthStateChanged } from 'firebase/auth';

export const useCheckAuth = () => {
	const { status } = useAppSelector(state => state.auth);
	const dispatch = useAppDispatch();

	useEffect(() => {
		onAuthStateChanged(FirebaseAuth, async user => {
			if (!user)
				return dispatch(
					logout({
						errorMessage: null,
					})
				);

			const { uid, email, displayName, photoURL } = user;

			dispatch(login({ uid, email, displayName, photoURL }));

			dispatch(startLoadingNotes());
		});
	}, []);

	return {
		status,
	};
};
