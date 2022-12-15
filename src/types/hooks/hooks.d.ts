type formProps = {
	username?: string;
	email?: string;
	password?: string;
	displayName?: string;
	[key: string]: string | undefined;
};

type formValidationProps = {
	displayNameValid: string | null;
	emailValid: string | null;
	passwordValid: string | null;
	[key: string]: string | null;
};

type formValidationsProps = {
	email: [(value: string) => boolean, string];
	password: [(value: string) => boolean, string];
	displayName: [(value: string) => boolean, string];
	[key: string]: [(value: string) => boolean, string];
};
