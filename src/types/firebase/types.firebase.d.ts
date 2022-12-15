type registerUserProps = {
	email: string;
	password: string;
	displayName: string;
};

interface loginProps extends Pick<registerUserProps, 'email' | 'password'> {}
