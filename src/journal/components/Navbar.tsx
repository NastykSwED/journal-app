import { LogoutOutlined } from '@mui/icons-material';

import MenuIcon from '@mui/icons-material/Menu';

import { IconButton, Toolbar, Grid, Typography } from '@mui/material';

import { SideBar } from '.';

import { useAppDispatch } from '../../store';

import { startLogout } from '../../store/auth';

import { AppBar } from '../custom-mui';

export const Navbar = (props: NavbarProps) => {
	const { open, handleDrawerClose, handleDrawerOpen } = props;

	const dispatch = useAppDispatch();

	const handleLogout = () => {
		dispatch(startLogout());
	};

	return (
		<>
			<AppBar position='fixed' open={open}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='Open Drawer'
						edge='start'
						onClick={handleDrawerOpen}
						sx={{ mr: 2, ...(open && { display: 'none' }) }}
					>
						<MenuIcon />
					</IconButton>

					<Grid
						container
						direction='row'
						justifyContent='space-between'
						alignItems='center'
					>
						<Typography variant='h6' noWrap component='div'>
							{' '}
							JournalApp{' '}
						</Typography>

						<IconButton aria-label='Logout Button' color='error' onClick={handleLogout}>
							<LogoutOutlined />
						</IconButton>
					</Grid>
				</Toolbar>
			</AppBar>
			<SideBar open={open} handleDrawerClose={handleDrawerClose} />
		</>
	);
};
