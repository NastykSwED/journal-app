import React, { useMemo, useEffect, useRef } from 'react';

import {
	DeleteOutline,
	SaveOutlined,
	UploadOutlined,
} from '@mui/icons-material';

import { Grid, Typography, Button, TextField, IconButton } from '@mui/material';

import { ImageGallery } from '../components';

import {
	RootState,
	useAppDispatch,
	useAppSelector,
	setActiveNote,
	startSavedNote,
	startUploadingFiles,
	startDeletingNote,
} from '../../store';

import { useNote } from '../../hooks';

import Swal from 'sweetalert2';

import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const dispatch = useAppDispatch();

	const {
		active: note,
		messageSaved,
		isSaving,
	} = useAppSelector((state: RootState) => state.journal);

	const { body, title, date, handleChange, noteState } = useNote(note!);

	const dateString = useMemo(() => {
		const newDate = new Date(date);
		return newDate.toUTCString();
	}, [date]);

	const handleSaveNote = () => {
		dispatch(startSavedNote());
	};

	const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length == 0) return;

		dispatch(startUploadingFiles(e.target.files!));
	};

	const handleDeleteNote = () => {
		dispatch(startDeletingNote());
	};

	useEffect(() => {
		dispatch(setActiveNote(noteState));
	}, [noteState]);

	useEffect(() => {
		if (messageSaved.length > 0) {
			Swal.fire('Nota actualizada', messageSaved, 'success');
		}
	}, [messageSaved]);

	return (
		<Grid
			container
			direction='row'
			justifyContent='space-between'
			alignItems='center'
			sx={{ mb: 1 }}
			className='animate__animated animate__fadeIn animate__faster'
		>
			<Grid item>
				<Typography fontSize={39} fontWeight='light'>
					{dateString}
				</Typography>
			</Grid>
			<Grid item>
				<input
					type='file'
					multiple
					ref={fileInputRef}
					onChange={handleInputFileChange}
					style={{ display: 'none' }}
				/>

				<IconButton
					aria-label='Upload Files Button'
					color='primary'
					disabled={isSaving}
					onClick={() => fileInputRef.current?.click()}
				>
					<UploadOutlined />
				</IconButton>

				<Button
					aria-label='Saving Note Button'
					disabled={isSaving}
					onClick={handleSaveNote}
					color='primary'
					sx={{ padding: 2 }}
				>
					<SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
					Guardar
				</Button>
			</Grid>

			<Grid container>
				<TextField
					type='text'
					variant='filled'
					fullWidth
					placeholder='Ingrese un título'
					label='Título'
					sx={{ border: 'none', mb: 1 }}
					name='title'
					value={title}
					onChange={handleChange}
				/>

				<TextField
					type='text'
					variant='filled'
					fullWidth
					multiline
					placeholder='¿Qué sucedió en el día de hoy?'
					minRows={5}
					name='body'
					value={body}
					onChange={handleChange}
				/>
			</Grid>

			<Grid container justifyContent='end'>
				<Button
					aria-label='Delete Note Button'
					onClick={handleDeleteNote}
					sx={{ mt: 2 }}
					color='error'
				>
					<DeleteOutline />
					Borrar
				</Button>
			</Grid>

			<ImageGallery images={note!.imagesUrls} />
		</Grid>
	);
};
