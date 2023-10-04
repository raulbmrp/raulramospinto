/* eslint-disable unicorn/prefer-at */
class Tabs {
	/**
	 * The `tabs` element.
	 *
	 * @type {HTMLElement}
	 */
	#tabs;


	/**
	 * The `tabs__layout` element.
	 *
	 * @type {HTMLElement}
	 */
	#tabsLayout;


	/**
	 * The `tabs__button-container` elements.
	 *
	 * @type {HTMLElement}
	 */
	#tabsButtonsContainer;


	/**
	 * The `tabs__buttons-list` element.
	 *
	 * @type {HTMLElement}
	 */
	#tabsButtonsList;


	/**
	 * The `tabs__button` elements.
	 *
	 * @type {NodeList}
	 */
	#tabsButtons;


	/**
	 * The `tabs__item` elements.
	 *
	 * @type {NodeList}
	 */
	#tabsPanels;

	/**
	 * Instantiates the Facts module.
	 *
	 * @param {HTMLElement} element - The `.tabs` element.
	 */
	constructor(element) {
		// Store elements in private fields.
		// -----------------------------------------------------------------------------
		this.#tabs = element;
		this.#tabsLayout = this.#tabs.querySelector('.tabs__layout');
		this.#tabsButtonsContainer = this.#tabs.querySelector('.tabs__buttons-container');
		this.#tabsButtonsList = this.#tabs.querySelector('.tabs__buttons-list');
		this.#tabsButtons = this.#tabs.querySelectorAll('.tabs__button');
		this.#tabsPanels = this.#tabs.querySelectorAll('.tabs__panel');

		// Assemble ARIA roles.
		// -----------------------------------------------------------------------------
		this.#tabsButtonsList.setAttribute('role', 'tablist');
		for (const listItem of this.#tabsButtonsList.querySelectorAll('li')) {
			listItem.setAttribute('role', 'presentation');
		}

		// Loop through buttons and their indexes
		// -----------------------------------------------------------------------------
		for (const [index, tabsButton] of this.#tabsButtons.entries()) {
			tabsButton.setAttribute('role', 'tab');
			if (index === 0) {
				tabsButton.setAttribute('aria-selected', 'true');
			} else {
				tabsButton.setAttribute('tabindex', '-1');
				this.#tabsPanels[index].setAttribute('hidden', '');
			}
		}

		// Enable to reach the tab panel through keyboard navigation
		// -----------------------------------------------------------------------------
		for (const tabsPanel of this.#tabsPanels) {
			tabsPanel.setAttribute('role', 'tabpanel');
			tabsPanel.setAttribute('tabindex', '0');
		}

		// Button click event
		// -----------------------------------------------------------------------------
		this.#tabsButtonsList.addEventListener('click', event => {
			// Prevent default behavior of clicking on links and list items
			const clickedTab = event.target.closest('a');
			if (!clickedTab) {
				return;
			}

			event.preventDefault();
			this.switchTab(clickedTab);
		});

		// Button keydown event
		// -----------------------------------------------------------------------------
		this.#tabsLayout.addEventListener('keydown', event => {
			switch (event.key) {
				case 'ArrowUp': {
					event.preventDefault();
					this.movePrevious();
					break;
				}

				case 'ArrowLeft': {
					event.preventDefault();
					this.movePrevious();
					break;
				}

				case 'ArrowDown': {
					event.preventDefault();
					this.moveNext();
					break;
				}

				case 'ArrowRight': {
					event.preventDefault();
					this.moveNext();
					break;
				}

				case 'Home': {
					event.preventDefault();
					this.switchTab(this.#tabsButtons[0]);
					break;
				}

				case 'End': {
					event.preventDefault();
					this.switchTab(this.#tabsButtons[this.#tabsButtons.length - 1]);
					break;
				}

				default: {
					break;
				}
			}
		});

		// Run on Load
		// -------------------------------------------------------------
		this.addBackground();

		// Run on Resize
		// -------------------------------------------------------------
		window.addEventListener('resize', this.addBackground);

		// -----------------------------------------------------------------------------
		// FUNCTIONS
		// -----------------------------------------------------------------------------

		// Keyboard interaction
		// -----------------------------------------------------------------------------

		this.activeTabsRectTop();

		window.addEventListener('resize', () => {
			this.activeTabsRectTop();
		});
	}

	movePrevious() {
		const currentTab = document.activeElement;
		const tabsButtons = document.querySelectorAll('.tabs__button');
		if (currentTab.parentElement.previousElementSibling) {
			this.switchTab(currentTab.parentElement.previousElementSibling.querySelector('a'));
		} else {
			this.switchTab(tabsButtons.at(-1));
		}
	}

	moveNext() {
		const currentTab = document.activeElement;
		const tabsButtons = document.querySelectorAll('.tabs__button');
		if (currentTab.parentElement.nextElementSibling) {
			this.switchTab(currentTab.parentElement.nextElementSibling.querySelector('a'));
		} else {
			this.switchTab(tabsButtons[0]);
		}
	}

	activeTabsRectTop() {
		return this.#tabs.getBoundingClientRect().top + window.scrollY;
	}

	addBackground() {
		const tabsButtonsContainer = document.querySelector('.tabs__buttons-container');
		if (window.matchMedia('(width < 992px)').matches) {
			window.addEventListener('scroll', () => {
				const tabsButtonsContainerYPosition = tabsButtonsContainer.getBoundingClientRect().top;
				if (tabsButtonsContainerYPosition === 0) {
					tabsButtonsContainer.classList.add('on');
				} else {
					tabsButtonsContainer.classList.remove('on');
				}
			});
		}
	}

	switchTab(newTab) {
		const activePanelId = newTab.getAttribute('href');
		const activePanel = this.#tabs.querySelector(activePanelId);
		window.scroll(0, this.activeTabsRectTop());

		for (const tabsButton of this.#tabsButtons) {
			tabsButton.setAttribute('aria-selected', false);
			tabsButton.setAttribute('tabindex', '-1');
		}

		for (const tabsPanel of this.#tabsPanels) {
			tabsPanel.setAttribute('hidden', true);
		}

		activePanel.removeAttribute('hidden', false);

		newTab.setAttribute('aria-selected', true);
		newTab.setAttribute('tabindex', '0');
		newTab.focus();
	}
}

export default Tabs;
