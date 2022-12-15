import { useMemo } from 'react';

import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	Grid,
	ListItemText,
} from '@mui/material';

import { TurnedInNot } from '@mui/icons-material';

import { setActiveNote, useAppDispatch } from '../../store';

export const SideBarItem = (props: SideBarItemProps) => {
	const { title = '', body, date, noteId, imagesUrls = [] } = props;

	const newTitle = useMemo(() => {
		return title.length > 17 ? title.substring(0, 17) + '...' : title;
	}, [title]);

	const dispatch = useAppDispatch();

	const handleActiveNote = () => {
		dispatch(setActiveNote({ title, body, noteId, date, imagesUrls }));
	};

	return (
		<ListItem disablePadding>
			<ListItemButton onClick={handleActiveNote}>
				<ListItemIcon>
					<TurnedInNot />
				</ListItemIcon>
				<Grid container>
					<ListItemText primary={newTitle} />
					<ListItemText secondary={body} />
				</Grid>
			</ListItemButton>
		</ListItem>
	);
};
