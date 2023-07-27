install:
	rm -rf yarn.lock node_modules
	git pull
	yarn install
	yarn build
	pm2 start "yarn start:dev" --name fe

build:
	rm -rf yarn.lock
	git pull
	yarn install
	yarn build
	pm2 restart fe
