import { useState } from 'react';

import { Box } from '@mui/material';

import { DrawerHeader, Main } from '../custom-mui';

import { Navbar } from '../components/Navbar';

export const JournalLayout = (props: JournalLayoutProps) => {
	const { children } = props;

	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box
			sx={{ display: 'flex' }}
			className='animate__animated animate__fadeIn animate__faster'
		>
			<Navbar
				open={open}
				handleDrawerClose={handleDrawerClose}
				handleDrawerOpen={handleDrawerOpen}
			/>

			<Main open={open} sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />

				{children}
			</Main>
		</Box>
	);
};
