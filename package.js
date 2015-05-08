Package.describe({
	name: 'marcantuan:state-stopper',
	version: '0.0.1',
	// Brief, one-line summary of the package.
	summary: 'Automated stopper of any state resolved value',
	// URL to the Git repository containing the source code for this package.
	git: 'https://github.com/auterium/state-stopper.git',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: null
});

Package.onUse(function(api) {
	api.versionsFrom('METEOR@0.9.0.1');
	api.addFiles('state-stopper.js');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('marcantuan:state-stopper');
	api.addFiles('state-stopper-tests.js');
});
