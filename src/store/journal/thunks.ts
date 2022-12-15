import {
	AppDispatch,
	RootState,
	addNewEmptyNote,
	deleteNoteById,
	savingNewNote,
	setActiveNote,
	setNotes,
	setPhotosToActiveNote,
	setSaving,
	updateNote,
} from '../';

import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';

import { FirebaseDB } from '../../firebase';

import { fileUpload, loadNotes } from '../../helpers';

export const startNewNote = () => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		dispatch(savingNewNote());

		const { uid } = getState().auth;

		const newNote: onNote = {
			title: '',
			body: '',
			date: new Date().getTime(),
			imagesUrls: [],
		};

		const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

		await setDoc(newDoc, newNote);

		newNote.noteId = newDoc.id;

		dispatch(addNewEmptyNote(newNote));

		dispatch(setActiveNote(newNote));
	};
};

export const startLoadingNotes = () => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const { uid } = getState().auth;

		if (!uid) throw new Error('El UID del usuario no esta definido');

		const notes: onNote[] = await loadNotes(uid);

		dispatch(setNotes(notes));
	};
};

export const startSavedNote = () => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		dispatch(setSaving());

		const { uid } = getState().auth;

		const { active: note } = getState().journal;

		const noteToFireStore = { ...note };

		delete noteToFireStore.noteId;

		const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note!.noteId}`);

		await setDoc(docRef, noteToFireStore, { merge: true });

		dispatch(updateNote(note!));
	};
};

export const startUploadingFiles = (files: FileList) => {
	return async (dispatch: AppDispatch) => {
		dispatch(setSaving());

		const filesArray = [...files];

		const fileUploadPromises = [];

		for (const file of filesArray) {
			fileUploadPromises.push(fileUpload(file));
		}

		const photosUrls = await Promise.all(fileUploadPromises);

		dispatch(setPhotosToActiveNote(photosUrls));
	};
};

export const startDeletingNote = () => {
	return async (dispatch: AppDispatch, getState: () => RootState) => {
		const { uid } = getState().auth;

		const { active: note } = getState().journal;

		const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note!.noteId}`);

		await deleteDoc(docRef);

		dispatch(deleteNoteById(note!.noteId!));
	};
};
