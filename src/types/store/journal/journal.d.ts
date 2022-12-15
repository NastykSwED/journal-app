type journalStateProps = {
	isSaving: boolean;
	messageSaved: string;
	notes: onNote[];
	active: onNote | null;
};

type onNote = {
	noteId?: onNoteId;
	title: string;
	date: number;
	body: string;
	imagesUrls: onImagesUrls;
};

type onImagesUrls = string[];

type onNoteId = string;
