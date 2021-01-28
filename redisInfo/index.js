"Use strict";

var redis = require("redis"),
    coRedis = require("co-redis"),
    db  = redis.createClient(),
    dbCo = coRedis(db);
exports.modules =dbCo;
