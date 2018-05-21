process.env.NODE_ENV = process.env.NODE_ENV || "local";

module.exports = require("./" + process.env.NODE_ENV.toLowerCase());
