"use strict";

// Set env variable once
const env = process.env.NODE_ENV;

// Set app port
const port = env === "production" ? 80 : 8080;

module.exports = { env, port };