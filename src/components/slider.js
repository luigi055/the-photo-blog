const createImageSlide = (image) => {
	const slide = document.createElement("div");
	slide.classList.add("slider__slide");
	slide.innerHTML = `
					<img
						class="slider__slide__image blog__gallery__image"
						src="${image}"
						loading="lazy"
						alt=""
					/>
				`;

	return slide;
};

export default createImageSlide;
