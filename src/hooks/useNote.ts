import { useState, useEffect } from 'react';

export const useNote = (initialNote: onNote) => {
	const [noteState, setNotesState] = useState(initialNote);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNotesState({
			...noteState,
			[e.target.name]: e.target.value,
		});
	};

	useEffect(() => {
		setNotesState(initialNote);
	}, [initialNote]);

	return {
		...noteState,
		noteState,
		handleChange,
	};
};
