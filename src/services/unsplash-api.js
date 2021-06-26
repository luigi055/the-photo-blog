const UNSPLASH_API_URL = "https://api.unsplash.com/photos";

export async function fetchPhotosByPage(page) {
	const photosData = await (
		await fetch(
			`${UNSPLASH_API_URL}?page=${page}&client_id=${process.env.UNSPLASH_API_KEY}`
		)
	).json();
	const photos = photosData.map((photoData) => photoData.urls.small);

	return photos;
}
