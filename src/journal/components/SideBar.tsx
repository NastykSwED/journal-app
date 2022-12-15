import { SideBarItem } from './';

import { useAppSelector } from '../../store';

import {
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

import {
	Divider,
	Drawer,
	List,
	Toolbar,
	Typography,
	IconButton,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';

import { DrawerHeader, drawerWidth } from '../custom-mui';

export const SideBar = (props: SideBarProps) => {
	const { open, handleDrawerClose } = props;

	const { displayName } = useAppSelector(state => state.auth);

	const { notes } = useAppSelector(state => state.journal);

	const theme = useTheme();

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
				},
			}}
			variant='persistent'
			anchor='left'
			open={open}
		>
			<DrawerHeader>
				<Toolbar>
					<Typography variant='h6' noWrap component='div'>
						{displayName}
					</Typography>
				</Toolbar>

				<IconButton aria-label='Close Drawer' onClick={handleDrawerClose}>
					{theme.direction === 'ltr' ? (
						<ChevronLeftIcon />
					) : (
						<ChevronRightIcon />
					)}
				</IconButton>
			</DrawerHeader>

			<Divider />

			<List>
				{notes?.map(note => (
					<SideBarItem key={note.noteId} {...note} />
				))}
			</List>
		</Drawer>
	);
};
