class BackToTop {
	/**
	 * The `.footer` element.
	 * @type {HTMLElement}
	 */
	#footer;

	/**
	 * The `.footer__back-to-top` element.
	 * @type {HTMLElement}
	 */
	#backToTop;

	/**
	 * Instantiates the cursor.
	 * @param {HTMLElement} element - The `.cursor` element.
	 */
	constructor(element) {
		// Store elements in private fields.
		// -------------------------------------------------------------
		this.#footer = element;
		this.#backToTop = this.#footer.querySelector('.footer__back-to-top');

		this.#backToTop.addEventListener('click', () => this.scrollToTop());
	}

	scrollToTop() {
		window.scrollTo(0, 0);
	}
}

export default BackToTop;
