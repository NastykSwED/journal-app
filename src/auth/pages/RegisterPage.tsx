import React, { useState, useMemo } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import {
	Alert,
	Button,
	Grid,
	Link,
	TextField,
	Typography,
} from '@mui/material';

import { AuthLayout } from '../layouts';

import { useForm } from '../../hooks';

import {
	useAppDispatch,
	useAppSelector,
	startCreatingUserWithEmailPassword,
} from '../../store';

const initialFormState = {
	email: '',
	password: '',
	displayName: '',
};

const formValidations: formValidationsProps = {
	email: [
		(value: string) => value.includes('@'),
		'El correo debe de tener un @',
	],
	password: [
		(value: string) => value.length >= 6,
		'El password debe de tener mas de 6 letras',
	],
	displayName: [
		(value: string) => value.length >= 1,
		'El nombre es obligatorio',
	],
};

export const RegisterPage = () => {
	const [formSubmitted, setFormSubmitted] = useState(false);

	const dispatch = useAppDispatch();

	const { status, errorMessage } = useAppSelector(state => state.auth);
	const isCheckingAuthentication = useMemo(
		() => status === 'checking',
		[status]
	);

	const {
		displayName,
		email,
		password,
		handleChange,
		formState,
		isFormValid,
		emailValid,
		passwordValid,
		displayNameValid,
	} = useForm(initialFormState, formValidations);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		setFormSubmitted(!formSubmitted);

		if (!isFormValid) return;

		dispatch(
			startCreatingUserWithEmailPassword({
				displayName: formState.displayName!,
				email: formState.email!,
				password: formState.password!,
			})
		);
	};

	return (
		<AuthLayout title='Crear Cuenta'>
			<form
				onSubmit={handleSubmit}
				className='animate__animated animate__fadeIn animate__faster'
			>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Nombre'
							type={'text'}
							placeholder={'John Doe'}
							fullWidth
							name='displayName'
							value={displayName}
							onChange={handleChange}
							error={!!displayNameValid && formSubmitted}
							helperText={displayNameValid}
						></TextField>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Correo'
							type={'email'}
							placeholder={'correo@gmail.com'}
							fullWidth
							name='email'
							value={email}
							onChange={handleChange}
							error={!!emailValid && formSubmitted}
							helperText={emailValid}
						></TextField>
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Contraseña'
							type={'password'}
							placeholder={'Contraseña'}
							fullWidth
							name='password'
							value={password}
							onChange={handleChange}
							error={!!passwordValid && formSubmitted}
							helperText={passwordValid}
						></TextField>
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
							<Alert severity='error'>{errorMessage}</Alert>
						</Grid>

						<Grid item xs={12}>
							<Button
								disabled={isCheckingAuthentication}
								type='submit'
								variant='contained'
								fullWidth
								aria-label='Register Button'
							>
								Crear Cuenta
							</Button>
						</Grid>
					</Grid>

					<Grid container direction={'row'} justifyContent={'end'}>
						<Typography sx={{ mr: 1 }}>Ya tienes cuenta?</Typography>
						<Link component={RouterLink} color={'inherit'} to='/auth/login'>
							Ingresar
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
