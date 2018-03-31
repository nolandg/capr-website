sudo \
    MONGO_URL=mongodb://localhost:27017/capr \
    PORT=2015 \
    ROOT_URL=https://climateactionpowellriver.earth \
    METEOR_SETTINGS="$(cat settings.json)" \
pm2 start \
  /var/www/development/capr/builds/bundle/main.js \
  --name capr-website \
  --interpreter /home/noland/.nvm/versions/node/v8.9.3/bin/node
