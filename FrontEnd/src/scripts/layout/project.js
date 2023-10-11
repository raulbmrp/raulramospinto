// /* eslint-disable unicorn/prefer-at */
class Project {
	/**
	 * The `project-page` element.
	 * @type {HTMLElement}
	 */
	#project;

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
	 * The `project__layout` element.
	 * @type {HTMLElement}
	 */
	#projectLayout;

	/**
	 * The `project__layout` direct children elements.
	 * @type {HTMLCollection}
	 */
	#projectLayoutChildren;

	/**
	 * Instantiates the Facts module.
	 * @param {HTMLElement} element - The `body` element.
	 */
	constructor(element) {
		// Store elements in private fields.
		// -----------------------------------------------------------------------------
		this.#project = element;
		this.#blurCircleBlue = this.#project.querySelector('.blur-circle--blue');
		this.#blurCircleOrange = this.#project.querySelector('.blur-circle--orange');
		this.#projectLayout = this.#project.querySelector('.project__layout');
		this.#projectLayoutChildren = this.#projectLayout.children;

		window.addEventListener('scroll', () => {
			if (window.scrollY < 50) {
				this.blurCircleShow();
			}
		});

		const observerOptions = {
			threshold: 0,
			rootMargin: '-50px 0px -50px 0px',
		};

		const intersectionObserverProject = new IntersectionObserver(entries => {
			for (const entry of entries) {
				if (entry.isIntersecting && entry.target.classList.contains('project__cover')) {
					this.blurCircleShow();
				}

				if (entry.isIntersecting && entry.target.classList.contains('project__intro')) {
					this.#blurCircleBlue.style.setProperty('--blurCircleBlueOpacity', '0');
					this.#blurCircleOrange.style.setProperty('--blurCircleOrangeOpacity', '0');
				}
			}
		},
		observerOptions);

		for (const child of this.#projectLayoutChildren) {
			intersectionObserverProject.observe(child);
		}
	}

	blurCircleShow() {
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
}

export default Project;
