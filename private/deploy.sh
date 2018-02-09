sudo pm2 stop all

source /home/noland/.nvm/nvm.sh
nvm use 8.9.4

cd /var/www/development/capr/vulcan/
git pull
npm install
cd /var/www/development/capr/capr-website/
git pull
npm install

METEOR_PACKAGE_DIRS=/var/www/development/capr/vulcan/packages meteor build --directory /var/www/development/capr/builds
cd /var/www/development/capr/builds/bundle/programs/server
/home/noland/.nvm/versions/node/v8.9.3/bin/npm install

sudo pm2 restart all

# To fix shit?
# yum install g++ build-essential
# npm install -g node-gyp
# cd /opt/Rocket.Chat/programs/server/node_modules/fibers/
# node-gyp rebuild
# cp build/Release/fibers.node bin/linux-x64-57/fibers.node
# systemctl start rocketchat.service
