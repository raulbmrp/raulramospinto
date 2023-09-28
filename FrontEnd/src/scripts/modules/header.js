class Header {
	/**
	 * The `.header` element.
	 *
	 * @type {HTMLElement}
	 */
	#header;


	/**
	 * The `.header__layout--menu` element.
	 *
	 * @type {HTMLElement}
	 */
	#menu;


	/**
	 * The `.header__burger` element.
	 *
	 * @type {HTMLButtonElement}
	 */
	#burger;


	/**
	 * The `.header__menu-button` elements.
	 *
	 * @type {NodeList}
	 */
	#menuButtons;


	/**
	 * The `.header__menu-shape` element.
	 *
	 * @type {HTMLElement}
	 */
	#menuShape;


	/**
	 * The `.header__menu-shape-bg` element.
	 *
	 * @type {HTMLElement}
	 */
	#menuShapeBg;


	/**
	 * The `main` element.
	 *
	 * @type {HTMLElement}
	 */
	#main;


	/**
	 * The `body` element.
	 *
	 * @type {HTMLElement}
	 */
	#body;


	/**
	 * Instantiates the header.
	 *
	 * @param {HTMLElement} element - The `.header` element.
	 */
	constructor(element) {
		// Store elements in private fields.
		// -------------------------------------------------------------
		this.#header = element;
		this.#menu = this.#header.querySelector('.header__layout--menu');
		this.#burger = this.#header.querySelector('.header__burger');
		this.#menuShape = this.#header.querySelector('.header__menu-shape');
		this.#menuShapeBg = this.#header.querySelector('.header__menu-shape-bg');
		this.#menuButtons = this.#header.querySelectorAll('.header__menu-button');
		this.#main = document.querySelector('main');
		this.#body = document.querySelector('body');
		let menuButtonCurrent = this.#header.querySelector('.header__menu-button--current');


		// -------------------------------------------------------------
		// -------------------------------------------------------------
		// Burger Menu Toggle
		// -------------------------------------------------------------
		// -------------------------------------------------------------

		this.#burger.addEventListener('click', () => {
			this.#header.classList.toggle('on');
			this.#burger.classList.toggle('on');
			this.#menu.classList.toggle('on');
			this.#main.classList.toggle('off');
			this.#body.classList.toggle('menu-on');
			if (this.#burger.classList.contains('on')) {
				this.#burger.ariaLabel = 'Close menu';
				this.#burger.ariaExpanded = true;
			} else {
				this.#burger.ariaLabel = 'Open menu';
				this.#burger.ariaExpanded = false;
			}
		});


		// -------------------------------------------------------------
		// -------------------------------------------------------------
		// Menu Buttons Transition Effect on Desktop
		// -------------------------------------------------------------
		// -------------------------------------------------------------

		for (const menuButton of this.#menuButtons) {
			menuButton.addEventListener('click', () => {
				this.#menuShape.style.justifyContent = Number.parseInt(menuButton.dataset.index, 10) > Number.parseInt(menuButtonCurrent.dataset.index, 10) ? 'flex-end' : '';

				for (const button of this.#menuButtons) {
					button.classList.remove('header__menu-button--current');
				}

				menuButton.classList.add('header__menu-button--current');

				const transitionTime = 350;

				if (Number.parseInt(menuButtonCurrent.dataset.index, 10) !== Number.parseInt(menuButton.dataset.index, 10)) {
					this.#menuShapeBg.style.transition = `width ${transitionTime / 2}ms ease`;
					this.#menuShapeBg.style.width = '130%';
					setTimeout(() => {
						this.#menuShapeBg.style.width = '100%';
					}, transitionTime / 2);
				}

				this.#menuShape.style.transition = `all ${transitionTime}ms ease`;

				menuButtonCurrent = this.#header.querySelector('.header__menu-button--current');

				moveShape(menuButton);

				if (this.#burger.classList.contains('on')) {
					this.#burger.classList.remove('on');
					this.#menu.classList.remove('on');
					this.#main.classList.remove('off');
					this.#body.classList.remove('menu-on');
				}
			});
		}

		// -------------------------------------------------------------
		// -------------------------------------------------------------
		// Initialize Intersection Observer
		// -------------------------------------------------------------
		// -------------------------------------------------------------

		const observerOptions = {
			rootMargin: '-288px 0px -288px 0px', // Adjust the root margin as needed
		};

		const intersectionObserver = new IntersectionObserver(
			entries => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						const targetId = entry.target.id;
						const correspondingLink = this.#header.querySelector(`[href="#${targetId}"]`);

						// Remove the 'header__menu-button--current' class from all menu links
						for (const button of this.#menuButtons) {
							button.classList.remove('header__menu-button--current');
						}

						// Add the 'header__menu-button--current' class to the corresponding menu link
						correspondingLink.classList.add('header__menu-button--current');

						for (const menuButton of this.#menuButtons) {
							const transitionTime = 350;

							if (Number.parseInt(menuButtonCurrent.dataset.index, 10) !== Number.parseInt(menuButton.dataset.index, 10)) {
								this.#menuShapeBg.style.transition = `width ${transitionTime / 2}ms ease`;
								this.#menuShapeBg.style.width = '130%';
								setTimeout(() => {
									this.#menuShapeBg.style.width = '100%';
								}, transitionTime / 2);
							}

							this.#menuShape.style.transition = `all ${transitionTime}ms ease`;
						}

						menuButtonCurrent = this.#header.querySelector('.header__menu-button--current');

						moveShape(menuButtonCurrent);

						// Update the URL hash to match the module's ID
						window.history.replaceState(null, null, `#${targetId}`);
					}
				}
			},
			observerOptions,
		);

		// Observe each module
		for (const module of this.#main.querySelectorAll('section[id]')) {
			intersectionObserver.observe(module);
		}

		// Run on Load
		// -------------------------------------------------------------

		moveShape(menuButtonCurrent);
		urlChange();
		splitMenuButtonString();

		// Run on Resize
		// -------------------------------------------------------------

		window.addEventListener('resize', () => {
			moveShape(menuButtonCurrent);
			splitMenuButtonString();
			if (this.#burger.classList.contains('on')) {
				this.#burger.classList.remove('on');
				this.#menu.classList.remove('on');
				this.#main.classList.remove('off');
				this.#body.classList.remove('menu-on');
			}
		});

		// Run on Toggle Device Toolbar
		// -------------------------------------------------------------

		screen.orientation.addEventListener('change', () => {
			moveShape(menuButtonCurrent);
		});

		// Run on URL Change
		// -------------------------------------------------------------

		window.addEventListener('hashchange', () => {
			urlChange();
			if (this.#burger.classList.contains('on')) {
				this.#burger.classList.remove('on');
				this.#menu.classList.remove('on');
				this.#main.classList.remove('off');
				this.#body.classList.remove('menu-on');
			}
		});


		// -------------------------------------------------------------
		// Functions
		// -------------------------------------------------------------

		function urlChange() {
			const url = window.location.href;
			const menuButtons = document.querySelectorAll('.header__menu-button');
			const menuButtonCurrentHref = menuButtonCurrent.href;
			if (url !== menuButtonCurrentHref) {
				menuButtonCurrent.classList.remove('header__menu-button--current');
			}

			for (const menuButton of menuButtons) {
				if (menuButton.href === url) {
					menuButton.classList.add('header__menu-button--current');
					menuButtonCurrent = document.querySelector('.header__menu-button--current');
					moveShape(menuButtonCurrent);
				}
			}
		}

		function moveShape(target) {
			const buttonWidth = target.offsetWidth;
			const buttonShape = document.querySelector('.header__menu-shape');
			const buttonOffset = target.offsetLeft;
			buttonShape.style.width = `${buttonWidth}px`;
			buttonShape.style.left = `${buttonOffset}px`;
		}

		function splitMenuButtonString() {
			const buttonTexts = document.querySelectorAll('.header__menu-button');

			if (window.matchMedia('(width < 992px)').matches && window.matchMedia('(hover: hover)').matches) {
				for (const button of buttonTexts) {
					const words = button.textContent.trim().split(' '); // Split text into words
					const newContent = words.map(word => {
						const letters = [...word];
						return letters.map(
							(char, i) => `<span class="button__letter button__letter--${i}" style="--index:${i};">${char}</span>`,
						).join('');
					}).join(' '); // Join words back together with spaces
					button.innerHTML = newContent;
				}
			} else {
				for (const button of buttonTexts) {
					button.innerHTML = button.textContent;
				}
			}
		}
	}
}

export default Header;
