var AsyncKeyStorage = require("storage-interface").AsyncKeyStorage,
    redis = require("redis");

/**
 * Initialize Redis storage.
 * @augments {AsyncKeyStorage}
 */
function RedisStorage() {
    this.client = redis.createClient();
}

AsyncKeyStorage(RedisStorage,
    // get(string, function)
    function(key, done) {
        this.client.get(key, function(err, result) {
            if (err) done(err);
            else done(null, JSON.parse(result));
        });
    },

    // set(string, *, function)
    function(key, value, done) {
        this.client.set(key, JSON.stringify(value), function(err) {
            if (err) done(err);
            else done();
        });
    },

    // remove(string, function)
    function(key, done) {
        this.client.del(key, function(err) {
            if (err) done(err);
            else done();
        });
    }
);

module.exports = RedisStorage;
