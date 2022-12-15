import { AddOutlined } from '@mui/icons-material';

import { IconButton } from '@mui/material';

import { JournalLayout } from '../layouts/';

import { NoteView, NothingSelectedView } from '../views';

import { useAppDispatch, useAppSelector, startNewNote } from '../../store';

export const HomePage = () => {
	const { isSaving, active } = useAppSelector(state => state.journal);

	const dispatch = useAppDispatch();

	const handleClickNewNote = () => {
		dispatch(startNewNote());
	};

	return (
		<JournalLayout>
			{!!active ? <NoteView /> : <NothingSelectedView />}

			<IconButton
				aria-label='Add New Note Button'
				onClick={handleClickNewNote}
				size='large'
				disabled={isSaving}
				sx={{
					color: 'white',
					backgroundColor: 'error.main',
					':hover': { backgroundColor: 'error.main', opacity: 0.9 },
					position: 'fixed',
					right: 50,
					bottom: 50,
				}}
			>
				<AddOutlined sx={{ fontSize: 30 }} />
			</IconButton>
		</JournalLayout>
	);
};
