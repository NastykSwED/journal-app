import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: journalStateProps = {
	isSaving: false,
	messageSaved: '',
	notes: [],
	active: null,
};

export const journalSlice = createSlice({
	name: 'journal',
	initialState,
	reducers: {
		savingNewNote: state => {
			state.isSaving = true;
		},

		addNewEmptyNote: (state, { payload }: PayloadAction<onNote>) => {
			state.notes.push(payload);
			state.isSaving = false;
		},

		setActiveNote: (state, { payload }: PayloadAction<onNote>) => {
			state.active = payload;
			state.messageSaved = '';
		},

		setNotes: (state, { payload }: PayloadAction<onNote[]>) => {
			state.notes = payload;
		},

		setSaving: state => {
			state.isSaving = true;
			state.messageSaved = '';
		},

		updateNote: (state, { payload }: PayloadAction<onNote>) => {
			state.isSaving = false;
			state.notes = state.notes.map(note => {
				if (note.noteId === payload.noteId) {
					return payload;
				}

				return note;
			});

			state.messageSaved = `${payload.title}, actualizada correctamente`;
		},

		setPhotosToActiveNote: (
			state,
			{ payload }: PayloadAction<onImagesUrls>
		) => {
			state.active!.imagesUrls = [...state.active!.imagesUrls, ...payload];

			state.isSaving = false;
		},

		clearNotesLogout: state => {
			state.isSaving = false;
			state.messageSaved = '';
			state.notes = [];
			state.active = null;
		},
		deleteNoteById: (state, action: PayloadAction<onNoteId>) => {
			state.active = null;
			state.notes = state.notes.filter(note => note.noteId !== action.payload);
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	savingNewNote,
	addNewEmptyNote,
	setActiveNote,
	setNotes,
	setSaving,
	updateNote,
	deleteNoteById,
	setPhotosToActiveNote,
	clearNotesLogout,
} = journalSlice.actions;
