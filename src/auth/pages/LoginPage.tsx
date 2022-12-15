import React, { useMemo } from 'react';

import {
	useAppDispatch,
	useAppSelector,
	startGoogleSignIn,
	startLoginWithEmailPassword,
} from '../../store';

import { Link as RouterLink } from 'react-router-dom';

import { Google } from '@mui/icons-material';

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

export const LoginPage = () => {
	const { status, errorMessage } = useAppSelector(state => state.auth);

	const dispatch = useAppDispatch();

	const { email, password, handleChange, formState } = useForm({
		email: '',
		password: '',
	});

	const isAuthenticating = useMemo(() => status === 'checking', [status]);

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(
			startLoginWithEmailPassword({
				email: formState.email!,
				password: formState.password!,
			})
		);
	};

	const handleGoogleSignIn = () => {
		dispatch(startGoogleSignIn());
	};

	return (
		<AuthLayout title='Login'>
			<form
				onSubmit={handleSubmit}
				className='animate__animated animate__fadeIn animate__faster'
			>
				<Grid container>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Email'
							type={'email'}
							placeholder={'email@google.com'}
							fullWidth
							name='email'
							value={email}
							onChange={handleChange}
						></TextField>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							label='Password'
							type={'password'}
							placeholder={'Password'}
							fullWidth
							name='password'
							value={password}
							onChange={handleChange}
						></TextField>
					</Grid>

					<Grid
						container
						display={!!errorMessage ? '' : 'none'}
						sx={{ mt: 1, mb: 1 }}
					>
						<Grid item xs={12}>
							<Alert severity='error'>{errorMessage}</Alert>
						</Grid>
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} sm={6}>
							<Button
								disabled={isAuthenticating}
								type='submit'
								variant='contained'
								fullWidth
								aria-label='Login Button'
							>
								Login
							</Button>
						</Grid>

						<Grid item xs={12} sm={6}>
							<Button
								aria-label='Google Login Button'
								disabled={isAuthenticating}
								onClick={handleGoogleSignIn}
								variant='contained'
								fullWidth
							>
								<Google />
								<Typography sx={{ ml: 1 }}>Google</Typography>
							</Button>
						</Grid>
					</Grid>

					<Grid container direction={'row'} justifyContent={'end'}>
						<Link component={RouterLink} color={'inherit'} to='/auth/register'>
							Crear una cuenta
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
