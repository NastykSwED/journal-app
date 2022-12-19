export const initialAuthState: authStateTypes = {
	status: 'checking',
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: null,
};

export const authenticatedState: authStateTypes = {
	status: 'authenticated',
	uid: '12345ABC',
	email: 'demo@gmail.com',
	displayName: 'Demo user',
	photoURL: 'https://demo-image.jpg',
	errorMessage: null,
};

export const notAuthenticatedState: authStateTypes = {
	status: 'not-authenticated',
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: null,
};

export const demoUser = {
	uid: '12345ABC',
	email: 'demo@gmail.com',
	displayName: 'Demo user',
	photoURL: 'https://demo-image.jpg',
};
