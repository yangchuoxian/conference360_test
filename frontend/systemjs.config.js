/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
	// map tells the System loader where to look for things
	var map = {
		'frontend':                   'frontend', // 'dist',
		'@angular':                   'node_modules/@angular',
		'@angular2-material': 		  'node_modules/@angular2-material',
		'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
		'rxjs':                       'node_modules/rxjs'
	};
	// packages tells the System loader how to load when no filename and/or no extension
	var packages = {
		'frontend':                        		{ main: 'main.js',  defaultExtension: 'js' },
		'rxjs':                       			{ defaultExtension: 'js' },
		'angular2-in-memory-web-api': 			{ main: 'index.js', defaultExtension: 'js' },
		'@angular2-material/button':    		{ main: 'button.js', defaultExtension: 'js' },
		'@angular2-material/card':    			{ main: 'card.js', defaultExtension: 'js' },
		'@angular2-material/checkbox': 			{ main: 'checkbox.js', defaultExtension: 'js' },
		'@angular2-material/core':    			{ main: 'core.js', defaultExtension: 'js' },
		'@angular2-material/grid-list':  		{ main: 'grid-list.js', defaultExtension: 'js' },
		'@angular2-material/icon':  			{ main: 'icon.js', defaultExtension: 'js' },
		'@angular2-material/input':  			{ main: 'input.js', defaultExtension: 'js' },
		'@angular2-material/list':  			{ main: 'list.js', defaultExtension: 'js' },
		'@angular2-material/progress-bar':  	{ main: 'progress-bar.js', defaultExtension: 'js' },
		'@angular2-material/progress-circle':  	{ main: 'progress-circle.js', defaultExtension: 'js' },
		'@angular2-material/radio':  			{ main: 'radio.js', defaultExtension: 'js' },
		'@angular2-material/sidenav':  			{ main: 'sidenav.js', defaultExtension: 'js' },
		'@angular2-material/slide-toggle':  	{ main: 'slide-toggle.js', defaultExtension: 'js' },
		'@angular2-material/tabs':  			{ main: 'tabs.js', defaultExtension: 'js' },
		'@angular2-material/toolbar':  			{ main: 'toolbar.js', defaultExtension: 'js' }
	};
	var ngPackageNames = [
		'common',
		'compiler',
		'core',
		'http',
		'platform-browser',
		'platform-browser-dynamic',
		'router',
		'router-deprecated',
		'upgrade',
	];
	// Individual files (~300 requests):
	function packIndex(pkgName) {
		packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
	}
	// Bundled (~40 requests):
	function packUmd(pkgName) {
		packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };
	}
	// Most environments should use UMD; some (Karma) need the individual index files
	var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
	// Add package entries for angular packages
	ngPackageNames.forEach(setPackageConfig);
	var config = {
		map: map,
		packages: packages
	};
	System.config(config);
})(this);