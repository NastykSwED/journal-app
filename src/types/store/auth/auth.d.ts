type authStateTypes = {
	status?: string;
	uid: string | null;
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
	errorMessage: string | null;
};

type loginPayloadTypes = Pick<authStateTypes, onLoginPayloadTypes>;

type onLoginPayloadTypes = 'uid' | 'email' | 'displayName' | 'photoURL';

type logoutPayloadTypes = Pick<authStateTypes, 'errorMessage'>;

type startLoginWithEmailPasswordProps = {
	email: string;
	password: string;
};

type startCreatingUserWithEmailPasswordProps = {
	email: string;
	password: string;
	displayName: string;
};
