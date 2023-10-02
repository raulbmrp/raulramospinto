/**
 * Instantiates a module.
 *
 * @param {HTMLElement | NodeList} elements - The elements to be instantiated.
 * @param {String} path - The module file path.
 */
function instantiateModule(elements, path) {
	if (elements instanceof HTMLElement || (elements instanceof NodeList && elements.length > 0)) {
		import(path)
			.then(({default: Module}) => {
				if (elements instanceof HTMLElement) {
					elements = [elements];
				}

				for (const element of elements) {
					element.instance = new Module(element);
				}
			})
			.catch(error => {
				console.error(`Error loading module in "${path}":`, error);
			});
	}
}



// =============================================================================
// Instantiate the modules.
// =============================================================================

// List of modules.
// These identify both the module class and the file name.
// -----------------------------------------------------------------------------
const modules = {
	// High Priority
	// 'class': './filename.js',
	header: './modules/header.js',
	'social-list': './components/social-list.js',

	// Medium Priority
	// 'class': './filename.js',
	tabs: './modules/tabs.js',

	// Low Priority
	// 'class': './filename.js',
	homepage: './templates/homepage.js',
	cursor: './layout/cursor.js',
};


// Initiate instantiation.
// -----------------------------------------------------------------------------
for (const [className, path] of Object.entries(modules)) {
	instantiateModule(document.querySelectorAll(`.${className}`), path);
}
