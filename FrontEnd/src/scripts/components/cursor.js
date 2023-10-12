class Cursor {
	/**
	 * The `a` elements.
	 * @type {NodeList}
	 */
	#links;

	/**
	 * The `button` elements.
	 * @type {NodeList}
	 */
	#buttons;

	/**
	 * The `p` elements.
	 * @type {NodeList}
	 */
	#paragraphs;

	/**
	 * The `h1`, `h2`, `h3`, `h4`, `h5`, `h6` elements.
	 * @type {NodeList}
	 */
	#headings;

	/**
	 * The `time` elements.
	 * @type {NodeList}
	 */
	#time;

	/**
	 * The `disabled` elements.
	 * @type {NodeList}
	 */
	#disabled;

	/**
	 * Instantiates the cursor.
	 * @param {HTMLElement} element - The `.cursor` element.
	 */
	constructor() {
		// Store elements in private fields.
		// -------------------------------------------------------------
		const cursor = document.querySelector('.cursor');
		this.#links = document.querySelectorAll('a');
		this.#buttons = document.querySelectorAll('button');
		this.#paragraphs = document.querySelectorAll('p');
		this.#headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
		this.#time = document.querySelectorAll('time');
		this.#disabled = document.querySelectorAll('.disabled');
		const allText = [...this.#paragraphs, ...this.#headings, ...this.#time];
		const linksButtons = [...this.#links, ...this.#buttons];

		document.addEventListener('mousemove', cursorFollow);
		document.addEventListener('mouseover', cursorFollow);
		document.addEventListener('drag', cursorFollow);
		document.addEventListener('dragleave', cursorFollow);
		document.addEventListener('mouseleave', cursorOff);

		hoverText(allText);
		cursorGrow(linksButtons);
		hoverDisabled(this.#disabled);

		function cursorFollow(track) {
			cursor.classList.add('on');
			cursor.style.top = track.clientY + 'px';
			cursor.style.left = track.clientX + 'px';
		}

		function cursorOff() {
			cursor.classList.remove('on');
		}

		function hoverText(targets) {
			for (const target of targets) {
				target.addEventListener('mouseleave', () => {
					cursor.classList.remove('hover-text');
				});
				target.addEventListener('mouseover', () => {
					cursor.classList.add('hover-text');
				});
			}
		}

		function cursorGrow(targets) {
			for (const target of targets) {
				target.addEventListener('mouseleave', () => {
					cursor.classList.remove('grow');
				});
				target.addEventListener('mouseover', () => {
					cursor.classList.add('grow');
				});
			}
		}

		function hoverDisabled(targets) {
			for (const target of targets) {
				target.addEventListener('mouseleave', () => {
					cursor.classList.remove('not-allowed');
				});
				target.addEventListener('mouseover', () => {
					cursor.classList.add('not-allowed');
				});
			}
		}
	}
}

export default Cursor;
