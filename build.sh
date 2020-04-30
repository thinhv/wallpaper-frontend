#!/bin/bash

repoDomain="docker.io"
containerName="trucfx/weather-web"
version=$(cat ./current_version)
newVersion=${version%.*}.$((${version##*.}+1))
push=$1

echo "Building version $newVersion of $containerName"
docker build -t $containerName . && \
docker tag $containerName:latest $repoDomain/$containerName:$newVersion && \
docker tag $containerName:latest $repoDomain/$containerName:latest
if [ "$push" == "push" ]; then
	echo "Pushing $containerName:$newVersion to $repoDomain" && \
	$(aws ecr get-login --no-include-email) && \
	docker push $repoDomain/$containerName:$newVersion && \
	docker push $repoDomain/$containerName:latest && \
	echo "$newVersion" > ./current_version
fi
echo "All done!"
