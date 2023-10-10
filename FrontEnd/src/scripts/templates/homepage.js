// /* eslint-disable unicorn/prefer-at */
class Homepage {
	/**
	 * The `homepage` element.
	 *
	 * @type {HTMLElement}
	 */
	#homepage;

	/**
	 * The `main` element.
	 *
	 * @type {HTMLElement}
	 */
	#main;

	/**
	 * The `blur-circle--blue` element.
	 *
	 * @type {HTMLElement}
	 */
	#blurCircleBlue;

	/**
	 * The `blur-circle--orange` element.
	 *
	 * @type {HTMLElement}
	 */
	#blurCircleOrange;

	/**
	 * The `modules` element.
	 *
	 * @type {NodeList}
	 */
	#modules;

	/**
	 * Instantiates the Facts module.
	 *
	 * @param {HTMLElement} element - The `body` element.
	 */
	constructor(element) {
		// Store elements in private fields.
		// -----------------------------------------------------------------------------
		this.#homepage = element;
		this.#main = this.#homepage.querySelector('.main');
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
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueTop', 'calc(50% + 10vh)');
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueLeft', 'calc(50% + 5vw)');
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueWidth', '50vh');
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueHeight', '50vh');
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueOpacity', '1');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeTop', 'calc(50% - 25vh)');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeLeft', 'calc(50% + 30vw)');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeWidth', '70vh');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeHeight', '70vh');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeOpacity', '1');
					if (window.matchMedia('(width >= 992px)').matches) {
						this.#blurCircleBlue.style.setProperty('--blurCircleBlueTop', 'calc(50% + 20vh)');
						this.#blurCircleBlue.style.setProperty('--blurCircleBlueWidth', '90vh');
						this.#blurCircleBlue.style.setProperty('--blurCircleBlueHeight', '90vh');
						this.#blurCircleOrange.style.setProperty('--blurCircleOrangeWidth', '120vh');
						this.#blurCircleOrange.style.setProperty('--blurCircleOrangeHeight', '120vh');
					}
				}

				if (entry.isIntersecting && entry.target.id === 'about') {
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueTop', 'calc(50% + 10vh)');
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueLeft', 'calc(50% + 40vw)');
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueWidth', '40vh');
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueHeight', '40vh');
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueOpacity', '1');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeTop', 'calc(50% - 5vh)');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeLeft', 'calc(50% + 25vw)');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeWidth', '35vh');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeHeight', '35vh');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeOpacity', '1');
					if (window.matchMedia('(width >= 992px)').matches) {
						this.#blurCircleBlue.style.setProperty('--blurCircleBlueWidth', '80vh');
						this.#blurCircleBlue.style.setProperty('--blurCircleBlueHeight', '80vh');
						this.#blurCircleOrange.style.setProperty('--blurCircleOrangeTop', 'calc(50% - 15vh)');
						this.#blurCircleOrange.style.setProperty('--blurCircleOrangeWidth', '50vh');
						this.#blurCircleOrange.style.setProperty('--blurCircleOrangeHeight', '50vh');
					}
				}

				if (entry.isIntersecting && entry.target.id === 'resume') {
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueTop', 'calc(50% + 10vh)');
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueLeft', 'calc(50% + 40vw)');
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueWidth', '80vh');
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueHeight', '80vh');
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueOpacity', '0');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeTop', 'calc(50% - 15vh)');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeLeft', 'calc(50% + 25vw)');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeWidth', '50vh');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeHeight', '50vh');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeOpacity', '0');
				}

				if (entry.isIntersecting && entry.target.id === 'portfolio') {
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueTop', 'calc(50% + 0vh)');
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueLeft', 'calc(50% - 10vw)');
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueWidth', '60vh');
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueHeight', '60vh');
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueOpacity', '0');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeTop', 'calc(50% - 5vh)');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeLeft', 'calc(50% + 10vw)');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeWidth', '60vh');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeHeight', '60vh');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeOpacity', '0');
					if (window.matchMedia('(width >= 992px)').matches) {
						this.#blurCircleBlue.style.setProperty('--blurCircleBlueTop', 'calc(50% - 0vh)');
						this.#blurCircleBlue.style.setProperty('--blurCircleBlueWidth', '60vh');
						this.#blurCircleBlue.style.setProperty('--blurCircleBlueHeight', '60vh');
						this.#blurCircleOrange.style.setProperty('--blurCircleOrangeTop', 'calc(50% - 5vh)');
						this.#blurCircleOrange.style.setProperty('--blurCircleOrangeWidth', '60vh');
						this.#blurCircleOrange.style.setProperty('--blurCircleOrangeHeight', '60vh');
					}
				}

				if (entry.isIntersecting && entry.target.id === 'contact') {
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueTop', 'calc(50% - 10vh)');
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueLeft', 'calc(50% - 10vw)');
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueWidth', '30vh');
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueHeight', '30vh');
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueOpacity', '1');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeTop', 'calc(50% - 15vh)');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeLeft', 'calc(50% + 10vw)');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeWidth', '30vh');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeHeight', '30vh');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeOpacity', '1');
					if (window.matchMedia('(width >= 992px)').matches) {
						this.#blurCircleBlue.style.setProperty('--blurCircleBlueTop', 'calc(50% - 0vh)');
						this.#blurCircleBlue.style.setProperty('--blurCircleBlueWidth', '60vh');
						this.#blurCircleBlue.style.setProperty('--blurCircleBlueHeight', '60vh');
						this.#blurCircleOrange.style.setProperty('--blurCircleOrangeTop', 'calc(50% - 5vh)');
						this.#blurCircleOrange.style.setProperty('--blurCircleOrangeWidth', '60vh');
						this.#blurCircleOrange.style.setProperty('--blurCircleOrangeHeight', '60vh');
					}
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
