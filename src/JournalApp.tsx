import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from './router/AppRouter';

import { store } from './store';

export const JournalApp = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<AppRouter></AppRouter>
			</BrowserRouter>
		</Provider>
	);
};
