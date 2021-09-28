install:
	docker run --rm --mount type=bind,source="/home/workshop/Projects/electromart-frontend",target=/pwd -w /pwd node:lts-alpine npm install

build:
	docker run --rm --mount type=bind,source="/home/workshop/Projects/electromart-frontend",target=/pwd -w /pwd node:lts-alpine npm run build