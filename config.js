var config = {};

config.mongoUri = 'mongodb://localhost:27017/rtr';
config.cookieMaxAge = 30 * 24 * 3600 * 1000; 
config.zomatorKey = '254204de027f7c3f65fca58fd218d4eb';
config.coordinates = {
    lat: 49.2827,
    lon: -123.1207
}

module.exports = config;