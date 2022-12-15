import { Routes, Route, Navigate } from 'react-router-dom';

import { HomePage } from '../pages/HomePage';

export const JournalRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<HomePage />}></Route>

			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);
};
