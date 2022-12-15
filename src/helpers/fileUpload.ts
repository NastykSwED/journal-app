export const fileUpload = async (file: File) => {
	if (!file) throw new Error('No tenemos ningún archivo a subir');

	const cloudURL = `https://api.cloudinary.com/v1_1/${
		import.meta.env.VITE_UPLOAD_PRESET
	}/upload`;

	const formData = new FormData();

	formData.append('upload_preset', 'journal-app');
	formData.append('file', file);

	try {
		const resp = await fetch(cloudURL, {
			method: 'POST',
			body: formData,
		});

		if (!resp.ok) throw new Error('No se pudo subir las imágenes');

		const cloudResp = await resp.json();

		return cloudResp.secure_url;
	} catch (err) {
		throw new Error((err as Error).message);
	}
};
