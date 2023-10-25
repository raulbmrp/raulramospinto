// /* eslint-disable unicorn/prefer-at */
class Project {
	/**
	 * The `.project-page` element.
	 * @type {HTMLElement}
	 */
	#project;

	/**
	 * The `.blur-circles` element.
	 * @type {HTMLElement}
	 */
	#blurCircle;

	/**
	 * The `.blur-circle--design` element.
	 * @type {HTMLElement}
	 */
	#blurCircleDesign;

	/**
	 * The `.blur-circle--code` element.
	 * @type {HTMLElement}
	 */
	#blurCircleCode;

	/**
	 * The `.project__cover` element.
	 * @type {HTMLElement}
	 */
	#projectCover;

	/**
	 * The `.button__back` element.
	 * @type {HTMLElement}
	 */
	#buttonBack;

	/**
	 * The `.project__content` element.
	 * @type {HTMLElement}
	 */
	#projectContent;

	/**
	 * The `.project__progress` element.
	 * @type {HTMLElement}
	 */
	#projectProgress;

	/**
	 * Instantiates the Facts module.
	 * @param {HTMLElement} element - The `body` element.
	 */
	constructor(element) {
		// Store elements in private fields.
		// -----------------------------------------------------------------------------
		this.#project = element;
		this.#blurCircle = this.#project.querySelectorAll('.blur-circle');
		this.#blurCircleDesign = this.#project.querySelector('.blur-circle--design');
		this.#blurCircleCode = this.#project.querySelector('.blur-circle--code');
		this.#projectCover = this.#project.querySelector('.project__cover');
		this.#buttonBack = this.#project.querySelector('.button__back');
		this.#projectContent = this.#project.querySelector('.project__content');
		this.#projectProgress = this.#project.querySelector('.project__progress');
		const divisions = [this.#projectCover, this.#projectContent];

		window.addEventListener('scroll', () => {
			this.progressUpdate();
			if (this.#projectContent.getBoundingClientRect().top <= 0) {
				this.#buttonBack.classList.add('fix');
			} else {
				this.#buttonBack.classList.remove('fix');
			}
		});

		window.addEventListener('scroll', () => {
			if (window.scrollY < 50) {
				for (const blurCircle of this.#blurCircle) {
					if (blurCircle.classList.contains('blur-circle--design')) {
						this.#blurCircleDesign.classList.remove('blur-circle--design-project-content');
						this.#blurCircleDesign.classList.add('blur-circle--design-project-cover');
					}

					if (blurCircle.classList.contains('blur-circle--code')) {
						this.#blurCircleCode.classList.remove('blur-circle--code-project-content');
						this.#blurCircleCode.classList.add('blur-circle--code-project-cover');
					}
				}
			}
		});

		const observerOptions = {
			threshold: 0,
			rootMargin: '-100px 0px -100px 0px',
		};

		const intersectionObserverProject = new IntersectionObserver(entries => {
			for (const entry of entries) {
				if (entry.isIntersecting && entry.target.classList.contains('project__cover')) {
					for (const blurCircle of this.#blurCircle) {
						if (blurCircle.classList.contains('blur-circle--design')) {
							this.#blurCircleDesign.classList.add('blur-circle--design-project-cover');
							this.#blurCircleDesign.classList.remove('blur-circle--design-project-content');
						}

						if (blurCircle.classList.contains('blur-circle--code')) {
							this.#blurCircleCode.classList.add('blur-circle--code-project-cover');
							this.#blurCircleCode.classList.remove('blur-circle--code-project-content');
						}
					}
				}

				if (entry.isIntersecting && entry.target.classList.contains('project__content')) {
					for (const blurCircle of this.#blurCircle) {
						if (blurCircle.classList.contains('blur-circle--design')) {
							this.#blurCircleDesign.classList.add('blur-circle--design-project-content');
							this.#blurCircleDesign.classList.remove('blur-circle--design-project-cover');
						}

						if (blurCircle.classList.contains('blur-circle--code')) {
							this.#blurCircleCode.classList.add('blur-circle--code-project-content');
							this.#blurCircleCode.classList.remove('blur-circle--code-project-cover');
						}
					}
				}
			}
		},
		observerOptions);

		for (const division of divisions) {
			intersectionObserverProject.observe(division);
		}
	}

	progressUpdate() {
		const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
		const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		const scrolled = (windowScroll / height) * 100;
		this.#projectProgress.style.width = scrolled + '%';
		this.#projectProgress.style.opacity = scrolled > 99.9 ? '0' : '1';
	}
}

export default Project;
