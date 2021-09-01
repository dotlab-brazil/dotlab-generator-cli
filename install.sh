#!/bin/sh

# Install NodeJS 14.x
if which node > /dev/null
then
  echo "NodeJS is installed"
else
  echo "Installing NodeJS 14.x"
  curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi

# Install project dependencies
npm install