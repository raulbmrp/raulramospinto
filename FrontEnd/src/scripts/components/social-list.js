class SocialList {
	/**
	 * The `.social-list` element.
	 *
	 * @type {HTMLElement}
	 */
	#socialList;


	/**
	 * The `.header__social-button` element.
	 *
	 * @type {HTMLAnchorElement}
	 */
	#socialButtons;


	/**
	 * Instantiates the social-list.
	 *
	 * @param {HTMLElement} element - The `.social-list` element.
	 */
	constructor(element) {
		// Store elements in private fields.
		// -----------------------------------------------------------------------------
		this.#socialList = element;
		this.#socialButtons = this.#socialList.querySelectorAll('.social-list__button');


		// -------------------------------------------------------------
		// -------------------------------------------------------------
		// Social Buttons circle animation
		// -------------------------------------------------------------
		// -------------------------------------------------------------

		for (const social of this.#socialButtons) {
			const circle = social.querySelector('circle');
			social.addEventListener('mouseenter', () => {
				circle.classList.remove('progress-inverse');
				circle.classList.add('progress');
			});
			social.addEventListener('mouseleave', () => {
				circle.classList.remove('progress');
				circle.classList.add('progress-inverse');
			});
		}
	}
}

export default SocialList;
