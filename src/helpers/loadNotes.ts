import { collection, getDocs } from 'firebase/firestore/lite';

import { FirebaseDB } from '../firebase/config';

export const loadNotes = async (uid: string) => {
	if (!uid) throw new Error('El UID del usuario no existe');

	const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);

	const docs = await getDocs(collectionRef);

	const notes: any[] = [];

	docs.forEach(doc => {
		const note = { noteId: doc!.id.toString(), ...doc.data() };

		notes.push(note);
	});

	return notes;
};
