cleanbuild:
	docker run --rm --mount type=bind,source="/home/workshop/Projects/electromart-frontend",target=/pwd -w /pwd node:lts-alpine rm -rf node_modules build
	docker run --rm --mount type=bind,source="/home/workshop/Projects/electromart-frontend",target=/pwd -w /pwd node:lts-alpine sh /pwd/cleanbuild.sh