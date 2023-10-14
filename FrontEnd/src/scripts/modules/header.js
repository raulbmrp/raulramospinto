class Header {
	/**
	 * The `.header` element.
	 * @type {HTMLElement}
	 */
	#header;

	/**
	 * The `.header__layout--menu` element.
	 * @type {HTMLElement}
	 */
	#menu;

	/**
	 * The `.header__burger` element.
	 * @type {HTMLButtonElement}
	 */
	#burger;

	/**
	 * The `.header__menu-list` elements.
	 * @type {HTMLElement}
	 */
	#headerMenuList;

	/**
	 * The `.header__menu-button` elements.
	 * @type {NodeList}
	 */
	#menuButtons;

	/**
	 * The `.cta` elements.
	 * @type {HTMLElement}
	 */
	#cta;

	/**
	 * The `.social-list__button` elements.
	 * @type {NodeList}
	 */
	#socialListButtons;

	/**
	 * The `.header__layout--menu` elements.
	 * @type {HTMLElement}
	 */
	#headerLayoutMenu;

	/**
	 * The `a` elements.
	 * @type {NodeList}
	 */
	#allMenuLinks;

	/**
	 * The `.header__menu-button--current` element.
	 * @type {HTMLElement}
	 */
	#menuButtonCurrent;

	/**
	 * The `.header__menu-shape` element.
	 * @type {HTMLElement}
	 */
	#menuShape;

	/**
	 * The `main` element.
	 * @type {HTMLElement}
	 */
	#main;

	/**
	 * The `footer` element.
	 * @type {HTMLElement}
	 */
	#footer;

	/**
	 * The `blur-circle` element.
	 * @type {NodeList}
	 */
	#blurCircles;

	/**
     * Flag to control the first load transition.
     * @type {boolean}
     */
	transitionOcurred = true;

	/**
     * ID of the last observed section.
     * @type {string}
     */
	lastObservedSection = true;

	/**
     * Flag to control the first load transition.
     * @type {boolean}
     */
	firstLoad = true;

	/**
     * Flag to control the Intersection Observer state.
     * @type {boolean}
     */
	observerActive = true;

	/**
	 * Instantiates the header.
	 * @param {HTMLElement} element - The `.header` element.
	 */
	constructor(element) {
		// Store elements in private fields.
		// -------------------------------------------------------------
		this.#header = element;
		this.#menu = this.#header.querySelector('.header__layout--menu');
		this.#burger = this.#header.querySelector('.header__burger');
		this.#menuShape = this.#header.querySelector('.header__menu-shape');
		this.#headerMenuList = this.#header.querySelector('.header__menu-list');
		this.#menuButtons = this.#header.querySelectorAll('.header__menu-button');
		this.#cta = this.#header.querySelector('.cta');
		this.#socialListButtons = this.#header.querySelectorAll('.social-list__button');
		this.#headerLayoutMenu = this.#header.querySelector('.header__layout--menu');
		this.#allMenuLinks = this.#headerLayoutMenu.querySelectorAll('a');
		this.#menuButtonCurrent = this.#header.querySelector('.header__menu-button--current');
		this.#main = document.querySelector('main');
		this.#footer = document.querySelector('footer');
		this.#blurCircles = document.querySelectorAll('.blur-circle');

		this.#burger.addEventListener('click', () => {
			this.openCloseMobileMenu();
		});

		this.#burger.addEventListener('keydown', event => {
			switch (event.key) {
				case ' ':
				case 'Enter':
				case 'ArrowDown':
				case 'Down': {
					event.preventDefault();
					this.openCloseMobileMenu();
					if (this.#burger.classList.contains('on')) {
						this.#allMenuLinks[0].focus();
					}
					break;
				}

				case 'Up':
				case 'ArrowUp': {
					event.preventDefault();
					this.openCloseMobileMenu();
					if (this.#burger.classList.contains('on')) {
						this.#allMenuLinks[this.#allMenuLinks.length - 1].focus();
					}

					break;
				}

				default: {
					break;
				}
			}
		});

		for (const link of this.#allMenuLinks) {
			link.addEventListener('keydown', event => {
				switch (event.key) {
					case 'Esc':
					case 'Escape': {
						event.preventDefault();
						this.#burger.focus();
						break;
					}

					default: {
						break;
					}
				}
			});
		}

		for (const menuButton of this.#menuButtons) {
			menuButton.addEventListener('click', () => {
				this.observerActive = false;
				this.#menuShape.style.justifyContent = Number.parseInt(menuButton.dataset.index, 10) > Number.parseInt(this.#menuButtonCurrent.dataset.index, 10) ? 'flex-end' : '';
				for (const button of this.#menuButtons) {
					button.classList.remove('header__menu-button--current');
				}

				menuButton.classList.add('header__menu-button--current');
				this.handleMenuShapeTransition(menuButton);
				this.#menuButtonCurrent = this.#header.querySelector('.header__menu-button--current');
				this.moveShape(menuButton);
				this.closeMobileMenu();

				setTimeout(() => {
					this.observerActive = true;
				}, 700);
			});
		}

		const observerOptions = {
			threshold: 0,
			rootMargin: '-288px 0px -288px 0px',
		};

		const intersectionObserver = new IntersectionObserver(entries => {
			for (const entry of entries) {
				if (entry.isIntersecting && this.observerActive) {
					const targetId = entry.target.id;
					const correspondingLink = this.#menu.querySelector(`[href="#${targetId}"]`);

					for (const button of this.#menuButtons) {
						button.classList.remove('header__menu-button--current');
					}

					correspondingLink.classList.add('header__menu-button--current');

					if (targetId !== this.lastObservedSection) {
						this.transitionOccurred = false;
						this.lastObservedSection = targetId;
					}

					if (!this.transitionOccurred && targetId !== 'intro' && !this.firstLoad) {
						for (const menuButton of this.#menuButtons) {
							this.handleMenuShapeTransition(menuButton);
						}
					} else {
						this.firstLoad = false;
					}

					this.#menuButtonCurrent = this.#header.querySelector('.header__menu-button--current');
					this.moveShape(this.#menuButtonCurrent);
					window.history.replaceState(null, null, `#${targetId}`);
					this.transitionOccurred = true;
				}
			}
		},
		observerOptions);

		for (const module of this.#main.querySelectorAll('section[id]')) {
			intersectionObserver.observe(module);
		}

		this.#allMenuLinks[this.#allMenuLinks.length - 1].addEventListener('keydown', event => {
			if (event.key === 'Tab' && !event.shiftKey) {
				event.preventDefault();
				this.#allMenuLinks[0].focus();
			}
		});

		for (const link of this.#allMenuLinks) {
			link.addEventListener('keydown', event => {
				if (event.key === 'Home') {
					event.preventDefault();
					this.#allMenuLinks[0].focus();
				}

				if (event.key === 'End') {
					event.preventDefault();
					this.#allMenuLinks[this.#allMenuLinks.length - 1].focus();
				}
			});
		}

		this.#allMenuLinks[0].addEventListener('keydown', event => {
			if (event.key === 'Tab' && event.shiftKey && this.#burger.classList.contains('on')) {
				event.preventDefault();
				this.#allMenuLinks[this.#allMenuLinks.length - 1].focus();
			}
		});

		// Run on Load
		// -------------------------------------------------------------
		this.moveShape(this.#menuButtonCurrent);
		this.urlChange();
		this.splitMenuButtonString();
		this.tabindexChange();

		// Run on Resize
		// -------------------------------------------------------------
		window.addEventListener('resize', () => {
			this.moveShape(this.#menuButtonCurrent);
			this.splitMenuButtonString();
			this.tabindexChange();
			this.closeMobileMenu();
		});

		// Run on Toggle Device Toolbar
		// -------------------------------------------------------------
		screen.orientation.addEventListener('change', () => {
			this.moveShape(this.#menuButtonCurrent);
		});

		// Run on URL Change
		// -------------------------------------------------------------

		window.addEventListener('hashchange', () => {
			this.urlChange();
			this.closeMobileMenu();
		});

		this.ariaOrientation(this.headerMenuList);
	}

	openCloseMobileMenu() {
		this.#header.classList.toggle('on');
		this.#burger.classList.toggle('on');
		this.#menu.classList.toggle('on');
		this.#main.classList.toggle('off');
		this.#footer.classList.toggle('off');
		for (const blurCircle of this.#blurCircles) {
			blurCircle.classList.toggle('menu-on');
		}

		if (this.#burger.classList.contains('on')) {
			this.#burger.ariaLabel = 'Close menu';
			this.#burger.setAttribute('aria-expanded', true);
			this.disableScroll();
		} else {
			this.#burger.ariaLabel = 'Open menu';
			this.#burger.removeAttribute('aria-expanded');
			this.enableScroll();
		}

		this.tabindexChange();
	}

	closeMobileMenu() {
		if (this.#burger.classList.contains('on')) {
			this.#burger.classList.remove('on');
			this.#menu.classList.remove('on');
			this.#header.classList.remove('on');
			this.#main.classList.remove('off');
			this.#footer.classList.remove('off');
			for (const blurCircle of this.#blurCircles) {
				blurCircle.classList.remove('menu-on');
			}

			this.enableScroll();
		}
	}

	handleMenuShapeTransition(target) {
		const transitionTime = 350;
		const menuShape = document.querySelector('.header__menu-shape');
		const menuShapeBg = document.querySelector('.header__menu-shape-bg');
		if (Number.parseInt(this.#menuButtonCurrent.dataset.index, 10) !== Number.parseInt(target.dataset.index, 10)) {
			menuShapeBg.style.transition = `width ${transitionTime / 2}ms ease`;
			menuShapeBg.style.width = '130%';
			setTimeout(() => {
				menuShapeBg.style.width = '100%';
			}, transitionTime / 2);
		}

		menuShape.style.transition = `all ${transitionTime}ms ease`;
	}

	urlChange() {
		const url = window.location.href;
		const menuButtonCurrentHref = this.#menuButtonCurrent.href;
		if (url !== menuButtonCurrentHref) {
			this.#menuButtonCurrent.classList.remove('header__menu-button--current');
		}

		for (const menuButton of this.#menuButtons) {
			if (menuButton.href === url) {
				menuButton.classList.add('header__menu-button--current');
				this.#menuButtonCurrent = document.querySelector('.header__menu-button--current');
				this.moveShape(this.#menuButtonCurrent);
			}
		}
	}

	moveShape(target) {
		if (window.matchMedia('(width >= 992px)').matches) {
			const buttonWidth = target.offsetWidth;
			const buttonShape = document.querySelector('.header__menu-shape');
			const buttonOffset = target.offsetLeft;
			buttonShape.style.width = `${buttonWidth}px`;
			buttonShape.style.left = `${buttonOffset}px`;
		}
	}

	splitMenuButtonString() {
		if (window.matchMedia('(width < 992px)').matches && window.matchMedia('(hover: hover)').matches) {
			for (const button of this.#menuButtons) {
				button.setAttribute('aria-label', button.textContent.trim());
				const words = button.textContent.trim().split(' ');
				const newContent = words.map(word => {
					const letters = [...word];
					return letters.map(
						(char, i) => `<span class="button__letter button__letter--${i}" style="--index:${i};">${char}</span>`,
					).join('');
				}).join(' ');
				button.innerHTML = newContent;
			}
		} else {
			for (const button of this.#menuButtons) {
				button.innerHTML = button.textContent;
				button.removeAttribute('aria-label');
			}
		}
	}

	tabindexChange() {
		if (window.matchMedia('(width < 992px)').matches) {
			if (this.#burger.getAttribute('aria-expanded') === 'true') {
				for (const button of this.#menuButtons) {
					button.setAttribute('tabindex', '0');
				}

				this.#cta.setAttribute('tabindex', '0');

				for (const socialButton of this.#socialListButtons) {
					socialButton.setAttribute('tabindex', '0');
				}
			} else {
				for (const button of this.#menuButtons) {
					button.setAttribute('tabindex', '-1');
				}

				this.#cta.setAttribute('tabindex', '-1');

				for (const socialButton of this.#socialListButtons) {
					socialButton.setAttribute('tabindex', '-1');
				}
			}
		} else {
			for (const button of this.#menuButtons) {
				button.setAttribute('tabindex', '0');
			}

			this.#cta.setAttribute('tabindex', '0');
		}
	}

	ariaOrientation() {
		if (window.matchMedia('(width < 992px)').matches) {
			this.#headerMenuList.setAttribute('aria-orientation', 'vertical');
		} else {
			this.#headerMenuList.setAttribute('aria-orientation', 'horizontal');
		}
	}

	disableScroll() {
		document.querySelector('body').classList.add('disable-scroll');
	}

	enableScroll() {
		document.querySelector('body').classList.remove('disable-scroll');
	}
}

export default Header;
