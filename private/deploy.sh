sudo pm2 stop all
METEOR_PACKAGE_DIRS=/var/www/development/capr/vulcan/packages meteor build --directory /var/www/development/builds
cd /var/www/development/builds/bundle/programs/server
/home/noland/.nvm/versions/node/v8.9.3/bin/npm install
sudo pm2 restart all
