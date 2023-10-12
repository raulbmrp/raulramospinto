class Homepage {
	/**
	 * The `homepage-page` element.
	 * @type {HTMLElement}
	 */
	#homepage;

	/**
	 * The `blur-circle--design` element.
	 * @type {HTMLElement}
	 */
	#blurCircleDesign;

	/**
	 * The `blur-circle--code` element.
	 * @type {HTMLElement}
	 */
	#blurCircleCode;

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
		this.#blurCircleDesign = this.#homepage.querySelector('.blur-circle--design');
		this.#blurCircleCode = this.#homepage.querySelector('.blur-circle--code');
		this.#modules = this.#homepage.querySelectorAll('.module');

		const observerOptions = {
			threshold: 0,
			rootMargin: '-100px 0px -100px 0px',
		};

		const intersectionObserverBlurCircles = new IntersectionObserver(entries => {
			for (const entry of entries) {
				if (entry.isIntersecting && entry.target.classList.contains('intro')) {
					this.#blurCircleDesign.classList.remove('blur-circle--design-about', 'blur-circle--design-resume', 'blur-circle--design-portfolio', 'blur-circle--design-contact');
					this.#blurCircleCode.classList.remove('blur-circle--code-about', 'blur-circle--code-resume', 'blur-circle--code-portfolio', 'blur-circle--code-contact');
					this.#blurCircleDesign.classList.add('blur-circle--design-intro');
					this.#blurCircleCode.classList.add('blur-circle--code-intro');
				}

				if (entry.isIntersecting && entry.target.id === 'about') {
					this.#blurCircleDesign.classList.remove('blur-circle--design-intro', 'blur-circle--design-resume', 'blur-circle--design-portfolio', 'blur-circle--design-contact');
					this.#blurCircleCode.classList.remove('blur-circle--code-intro', 'blur-circle--code-resume', 'blur-circle--code-portfolio', 'blur-circle--code-contact');
					this.#blurCircleDesign.classList.add('blur-circle--design-about');
					this.#blurCircleCode.classList.add('blur-circle--code-about');
				}

				if (entry.isIntersecting && entry.target.id === 'resume') {
					this.#blurCircleDesign.classList.remove('blur-circle--design-intro', 'blur-circle--design-about', 'blur-circle--design-portfolio', 'blur-circle--design-contact');
					this.#blurCircleCode.classList.remove('blur-circle--code-intro', 'blur-circle--code-about', 'blur-circle--code-portfolio', 'blur-circle--code-contact');
					this.#blurCircleDesign.classList.add('blur-circle--design-resume');
					this.#blurCircleCode.classList.add('blur-circle--code-resume');
				}

				if (entry.isIntersecting && entry.target.id === 'portfolio') {
					this.#blurCircleDesign.classList.remove('blur-circle--design-intro', 'blur-circle--design-about', 'blur-circle--design-resume', 'blur-circle--design-contact');
					this.#blurCircleCode.classList.remove('blur-circle--code-intro', 'blur-circle--code-about', 'blur-circle--code-resume', 'blur-circle--code-contact');
					this.#blurCircleDesign.classList.add('blur-circle--design-portfolio');
					this.#blurCircleCode.classList.add('blur-circle--code-portfolio');
				}

				if (entry.isIntersecting && entry.target.id === 'contact') {
					this.#blurCircleDesign.classList.remove('blur-circle--design-intro', 'blur-circle--design-about', 'blur-circle--design-resume', 'blur-circle--design-portfolio');
					this.#blurCircleCode.classList.remove('blur-circle--code-intro', 'blur-circle--code-about', 'blur-circle--code-resume', 'blur-circle--code-portfolio');
					this.#blurCircleDesign.classList.add('blur-circle--design-contact');
					this.#blurCircleCode.classList.add('blur-circle--code-contact');
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
