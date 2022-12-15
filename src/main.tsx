import React from 'react';

import ReactDOM from 'react-dom/client';

import { JournalApp } from './JournalApp';

import { AppTheme } from './theme';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<AppTheme>
			<JournalApp></JournalApp>
		</AppTheme>
	</React.StrictMode>
);
