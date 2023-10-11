class Homepage {
	/**
	 * The `homepage-page` element.
	 * @type {HTMLElement}
	 */
	#homepage;

	/**
	 * The `blur-circle--blue` element.
	 * @type {HTMLElement}
	 */
	#blurCircleBlue;

	/**
	 * The `blur-circle--orange` element.
	 * @type {HTMLElement}
	 */
	#blurCircleOrange;

	/**
	 * The `modules` element.
	 * @type {NodeList}
	 */
	#modules;

	/**
	 * Instantiates the Facts module.
	 * @param {HTMLElement} element - The `body` element.
	 */
	constructor(element) {
		// Store elements in private fields.
		// -----------------------------------------------------------------------------
		this.#homepage = element;
		this.#blurCircleBlue = this.#homepage.querySelector('.blur-circle--blue');
		this.#blurCircleOrange = this.#homepage.querySelector('.blur-circle--orange');
		this.#modules = this.#homepage.querySelectorAll('.module');

		const observerOptions = {
			threshold: 0,
			rootMargin: '-288px 0px -288px 0px',
		};

		const intersectionObserverBlurCircles = new IntersectionObserver(entries => {
			for (const entry of entries) {
				if (entry.isIntersecting && entry.target.classList.contains('intro')) {
					this.#blurCircleOrange.classList.remove('blur-circle--orange-about', 'blur-circle--orange-resume', 'blur-circle--orange-portfolio', 'blur-circle--orange-contact');
					this.#blurCircleBlue.classList.remove('blur-circle--blue-about', 'blur-circle--blue-resume', 'blur-circle--blue-portfolio', 'blur-circle--blue-contact');
					this.#blurCircleBlue.classList.add('blur-circle--blue-intro');
					this.#blurCircleOrange.classList.add('blur-circle--orange-intro');
				}

				if (entry.isIntersecting && entry.target.id === 'about') {
					this.#blurCircleOrange.classList.remove('blur-circle--orange-intro', 'blur-circle--orange-resume', 'blur-circle--orange-portfolio', 'blur-circle--orange-contact');
					this.#blurCircleBlue.classList.remove('blur-circle--blue-intro', 'blur-circle--blue-resume', 'blur-circle--blue-portfolio', 'blur-circle--blue-contact');
					this.#blurCircleBlue.classList.add('blur-circle--blue-about');
					this.#blurCircleOrange.classList.add('blur-circle--orange-about');
				}

				if (entry.isIntersecting && entry.target.id === 'resume') {
					this.#blurCircleOrange.classList.remove('blur-circle--orange-intro', 'blur-circle--orange-about', 'blur-circle--orange-portfolio', 'blur-circle--orange-contact');
					this.#blurCircleBlue.classList.remove('blur-circle--blue-intro', 'blur-circle--blue-about', 'blur-circle--blue-portfolio', 'blur-circle--blue-contact');
					this.#blurCircleBlue.classList.add('blur-circle--blue-resume');
					this.#blurCircleOrange.classList.add('blur-circle--orange-resume');
				}

				if (entry.isIntersecting && entry.target.id === 'portfolio') {
					this.#blurCircleOrange.classList.remove('blur-circle--orange-intro', 'blur-circle--orange-about', 'blur-circle--orange-resume', 'blur-circle--orange-contact');
					this.#blurCircleBlue.classList.remove('blur-circle--blue-intro', 'blur-circle--blue-about', 'blur-circle--blue-resume', 'blur-circle--blue-contact');
					this.#blurCircleBlue.classList.add('blur-circle--blue-portfolio');
					this.#blurCircleOrange.classList.add('blur-circle--orange-portfolio');
				}

				if (entry.isIntersecting && entry.target.id === 'contact') {
					this.#blurCircleOrange.classList.remove('blur-circle--orange-intro', 'blur-circle--orange-about', 'blur-circle--orange-resume', 'blur-circle--orange-portfolio');
					this.#blurCircleBlue.classList.remove('blur-circle--blue-intro', 'blur-circle--blue-about', 'blur-circle--blue-resume', 'blur-circle--blue-portfolio');
					this.#blurCircleBlue.classList.add('blur-circle--blue-contact');
					this.#blurCircleOrange.classList.add('blur-circle--orange-contact');
				}
			}
		},
		observerOptions);

		const intersectionObserverModules = new IntersectionObserver(entries => {
			for (const entry of entries) {
				if (!entry.isIntersecting) {
					continue;
				}

				entry.target.classList.toggle('show');
				intersectionObserverModules.unobserve(entry.target);
			}
		},
		observerOptions);

		for (const module of this.#modules) {
			intersectionObserverBlurCircles.observe(module);
			intersectionObserverModules.observe(module);
		}
	}
}

export default Homepage;
