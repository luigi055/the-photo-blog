import "simply-slide/dist/simply-slide.css";
import "./css/style.css";
import { setSlider } from "simply-slide";
import createImageSlide from "./components/slider";
import { fetchPhotosByPage } from "./services/unsplash-api";

function initializeSlider(element) {
	const { UNSPLASH_API_KEY } = process.env;
	let galleryPage = 0;

	document.addEventListener("DOMContentLoaded", function (event) {
		const slide = setSlider({
			node: element,
			controlsColor: "#f905",
			controlsActiveColor: "#f90",
			directionIconColor: "#333",
		});

		const btn = document.getElementById("more-images-btn");

		btn.addEventListener("click", async () => {
			galleryPage += 1;
			btn.setAttribute("disabled", "true");
			const originalText = btn.textContent;
			btn.textContent = "Loading...";

			const photos = await fetchPhotosByPage(galleryPage);

			photos.forEach((photo) => {
				slide.addLazy(createImageSlide(photo));
			});

			btn.removeAttribute("disabled");
			btn.textContent = originalText;
		});
	});
}

initializeSlider(document.getElementById("slider1"));
