install:
	docker run --rm --mount type=bind,source="$(pwd)",target=/pwd -w /pwd node:lts-alpine npm install

build:
	docker run --rm --mount type=bind,source="$(pwd)",target=/pwd -w /pwd node:lts-alpine npm run build