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
			switchTab(clickedTab);
		});

		// Button keydown event
		// -----------------------------------------------------------------------------
		this.#tabsLayout.addEventListener('keydown', event => {
			switch (event.key) {
				case 'ArrowUp': {
					event.preventDefault();
					movePrevious();
					break;
				}

				case 'ArrowLeft': {
					event.preventDefault();
					movePrevious();
					break;
				}

				case 'ArrowDown': {
					event.preventDefault();
					moveNext();
					break;
				}

				case 'ArrowRight': {
					event.preventDefault();
					moveNext();
					break;
				}

				case 'Home': {
					event.preventDefault();
					switchTab(this.#tabsButtons[0]);
					break;
				}

				case 'End': {
					event.preventDefault();
					switchTab(this.#tabsButtons[this.#tabsButtons.length - 1]);
					break;
				}

				default: {
					break;
				}
			}
		});

		// Run on Load
		// -------------------------------------------------------------
		addBackground();

		// Run on Resize
		// -------------------------------------------------------------
		window.addEventListener('resize', addBackground);

		// -----------------------------------------------------------------------------
		// FUNCTIONS
		// -----------------------------------------------------------------------------

		// Keyboard interaction
		// -----------------------------------------------------------------------------
		function movePrevious() {
			const currentTab = document.activeElement;
			const tabsButtons = document.querySelectorAll('.tabs__button');
			if (currentTab.parentElement.previousElementSibling) {
				switchTab(currentTab.parentElement.previousElementSibling.querySelector('a'));
			} else {
				switchTab(tabsButtons.at(-1));
			}
		}

		function moveNext() {
			const currentTab = document.activeElement;
			const tabsButtons = document.querySelectorAll('.tabs__button');
			if (currentTab.parentElement.nextElementSibling) {
				switchTab(currentTab.parentElement.nextElementSibling.querySelector('a'));
			} else {
				switchTab(tabsButtons[0]);
			}
		}

		function getInitialYPosition() {
			const tabsRectTop = document.querySelector('.tabs').getBoundingClientRect().top;
			return tabsRectTop + window.scrollY;
		}

		let activeTabsRectTop = getInitialYPosition.call(this);

		window.addEventListener('resize', () => {
			activeTabsRectTop = getInitialYPosition.call(this);
		});

		// Switch tabs Panels & selected buttons
		// -----------------------------------------------------------------------------
		function switchTab(newTab) {
			const activePanelId = newTab.getAttribute('href');
			const activePanel = element.querySelector(activePanelId);
			window.scroll(0, activeTabsRectTop);

			for (const tabsButton of element.querySelectorAll('.tabs__button')) {
				tabsButton.setAttribute('aria-selected', false);
				tabsButton.setAttribute('tabindex', '-1');
			}

			for (const tabsPanel of element.querySelectorAll('.tabs__panel')) {
				tabsPanel.setAttribute('hidden', true);
			}

			activePanel.removeAttribute('hidden', false);

			newTab.setAttribute('aria-selected', true);
			newTab.setAttribute('tabindex', '0');
			newTab.focus();
		}

		// Add opaque background to hide tabsPanels when scrolling
		// -----------------------------------------------------------------------------
		function addBackground() {
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
	}
}

export default Tabs;
