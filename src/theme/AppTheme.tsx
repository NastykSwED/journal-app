import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider } from '@mui/material/styles';

import { purpleTheme } from './';

export const AppTheme = (props: AppThemeProps) => {
	const { children } = props;

	return (
		<ThemeProvider theme={purpleTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};
