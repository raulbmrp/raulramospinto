class Cursor {
	/**
	 * The `.cursor` element.
	 *
	 * @type {HTMLElement}
	 */
	#cursor;


	/**
	 * Instantiates the cursor.
	 *
	 * @param {HTMLElement} element - The `.cursor` element.
	 */
	constructor() {
		// Store elements in private fields.
		// -------------------------------------------------------------
		const cursor = document.querySelector('.cursor');
		const links = document.querySelectorAll('a');
		const buttons = document.querySelectorAll('button');
		const paragraphs = document.querySelectorAll('p');
		const heading1 = document.querySelectorAll('h1');
		const heading2 = document.querySelectorAll('h2');
		const heading3 = document.querySelectorAll('h3');
		const heading4 = document.querySelectorAll('h4');
		const heading5 = document.querySelectorAll('h5');
		const heading6 = document.querySelectorAll('h6');
		const time = document.querySelectorAll('time');
		const disabled = document.querySelectorAll('.disabled');


		// -------------------------------------------------------------
		// -------------------------------------------------------------
		// Cursor Follow mouse
		// -------------------------------------------------------------
		// -------------------------------------------------------------

		window.addEventListener('mousemove', cursorFollow);
		window.addEventListener('scroll', cursorFollow);
		document.addEventListener('mouseleave', cursorOff);

		function cursorFollow(track) {
			cursor.classList.add('on');
			cursor.style.top = track.pageY + 'px';
			cursor.style.left = track.pageX + 'px';
		}

		function cursorOff() {
			cursor.classList.remove('on');
		}

		// -------------------------------------------------------------
		// -------------------------------------------------------------
		// Cursor Text on hovers
		// -------------------------------------------------------------
		// -------------------------------------------------------------

		const allText = [...paragraphs, ...heading1, ...heading2, ...heading3, ...heading4, ...heading5, ...heading6, ...time];

		hoverText(allText);

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

		// -------------------------------------------------------------
		// -------------------------------------------------------------
		// Cursor Grows on hovers
		// -------------------------------------------------------------
		// -------------------------------------------------------------

		const linksButtons = [...links, ...buttons];

		cursorGrow(linksButtons);

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

		// -------------------------------------------------------------
		// -------------------------------------------------------------
		// Cursor Disabled on hovers
		// -------------------------------------------------------------
		// -------------------------------------------------------------


		hoverDisabled(disabled);

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
