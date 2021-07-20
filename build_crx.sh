#!/bin/bash
if [ "$(uname -s)" == 'Darwin' ]; then
    APP_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
else
    echo "not supported os"
    exit 1
fi

ROOT_DIR="$(realpath $(dirname $0))"
PEM_PATH="${PEM_PATH:-$ROOT_DIR/spoya.pem}"
set -x
"$APP_PATH" --pack-extension=$ROOT_DIR/src --pack-extension-key=$PEM_PATH