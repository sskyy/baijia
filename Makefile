
MOCHA_OPTS = --check-leaks
REPORTER = spec

install:
	@npm install
	@bower install

development: install
	@NODE_ENV=development node server.js

.PHONY: test
