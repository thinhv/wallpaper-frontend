#!/bin/bash

repoDomain="docker.io"
imageName="trucfx/weather-web"
version=$(cat ./current_version)

if [ ! -z "$1" ]; then
	version=$1
fi

if [ "$2" == "local" ]; then
	imageName=$imageName:$version
	echo "Using local image "$imageName
else
	imageName=$repoDomain/$imageName:$version
	echo "Using remote image "$imageName
	$(aws ecr get-login --no-include-email)
	docker pull $imageName
fi
if [[ $(docker network ls --no-trunc | grep weatherapp | wc -l) -eq "0" ]]; then
	echo "Creating network weatherapp"
	docker network create weatherapp --subnet=172.20.0.0/16
fi
if [[ $(docker ps -a --no-trunc | grep weather-web | wc -l) -eq "1" ]]; then
	echo "Removing container weather-web"
	docker rm weather-web
fi

docker run --name weather-web --network=weatherapp --ip=172.20.0.10 -v "$(pwd)/src/":/app/ -p 3000:3000 \
		--entrypoint '/bin/sh' $imageName -c 'npm install && npm start' --service-ports

