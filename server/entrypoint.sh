#!/usr/bin/env bash

X_ENV=$(node -r ts-node/register -e 'console.log(require("./src/config").default.env)')
X_DB_HOST=$(node -r ts-node/register -e 'console.log(require("./src/config").default.database.host)')
X_DB_PORT=$(node -r ts-node/register -e 'console.log(require("./src/config").default.database.port)')
/wait-for-it.sh $X_DB_HOST:$X_DB_PORT
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Source the .env file
if [ -f .env ]; then
  source .env
fi

npm run start
