// /* eslint-disable unicorn/prefer-at */
class CardsGrid {
	/**
	 * The `cards-grid` element.
	 *
	 * @type {HTMLElement}
	 */
	#cardsGrid;

	/**
	 * The `soon` element.
	 *
	 * @type {NodeList}
	 */
	#soon;


	/**
	 * Instantiates the Facts module.
	 *
	 * @param {HTMLElement} element - The `.tabs` element.
	 */
	constructor(element) {
		// Store elements in private fields.
		// -----------------------------------------------------------------------------
		this.#cardsGrid = element;
		this.#soon = this.#cardsGrid.querySelectorAll('.soon');

		for (const disabledLink of this.#soon) {
			disabledLink.addEventListener('click', event => {
				event.preventDefault();
			});
			disabledLink.setAttribute('tabindex', '-1');
			disabledLink.addEventListener('keydown', event => {
				event.preventDefault();
			});
		}
	}
}

export default CardsGrid;
