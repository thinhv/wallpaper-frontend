#!/bin/bash

set -eo pipefail

echo "Starting weather web"

# use exec to transfer pid 1 to the upstream container
exec npm start
