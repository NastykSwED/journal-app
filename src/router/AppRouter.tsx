import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../auth';

import { CheckingAuth } from '../ui/';

import { useCheckAuth } from '../hooks';

import { JournalRoutes } from '../journal/routes/JournalRoutes';

export const AppRouter = () => {
	const { status } = useCheckAuth();

	if (status === 'checking') {
		return <CheckingAuth />;
	}

	return (
		<Routes>
			{status === 'authenticated' ? (
				<Route path='/*' element={<JournalRoutes />}></Route>
			) : (
				<Route path='/auth/*' element={<AuthRoutes />}></Route>
			)}

			<Route path='/*' element={<Navigate to={'/auth/login'} />} />
		</Routes>
	);
};
