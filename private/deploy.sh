sudo pm2 stop all
METEOR_PACKAGE_DIRS=\"../:../vulcan/packages\" meteor build --directory /var/www/development/builds
cd /var/www/development/builds/bundle/programs/server
npm install
sudo pm2 restart all
