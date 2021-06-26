import "simply-slide/dist/simply-slide.css";
import "./css/style.css";
import { setSlider } from "simply-slide";
import createImageSlide from "./components/slider";
import { fetchPhotosByPage } from "./services/unsplash-api";

function initializeSlider(element) {
	document.addEventListener("DOMContentLoaded", function (event) {
		const slide = setSlider({
			node: element,
			directionIconColor: "#25252599",
			controlsColor: "#a0e7e599",
		});

		const btn = document.getElementById("more-images-btn");

		btn.addEventListener("click", async () => {
			const randomGalleryPage = Math.floor(Math.random() * 1000);
			btn.setAttribute("disabled", "true");
			const originalText = btn.textContent;
			btn.textContent = "Loading...";

			const photos = await fetchPhotosByPage(randomGalleryPage);

			photos.forEach((photo) => {
				slide.addLazy(createImageSlide(photo));
			});

			btn.removeAttribute("disabled");
			btn.textContent = originalText;
		});
	});
}

initializeSlider(document.getElementById("slider1"));
