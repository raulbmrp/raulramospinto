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

		for (const link of this.#soon) {
			link.addEventListener('click', event => {
				event.preventDefault();
			});
		}
	}
}

export default CardsGrid;
