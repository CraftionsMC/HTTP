/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

let conf;

const server = http.createServer((req, res) => {
    let urlPath = url.parse(req.url).path;
    res.setHeader("server", "Craftions HTTP")
})

module.exports = (CONFIG) => {
    conf = CONFIG;
    console.log("Starting HTTP Server on " + CONFIG.http.host + ":" + CONFIG.http.port + "...")
    server.listen(CONFIG.http.port, CONFIG.http.host)
    console.log("Started HTTP Server on " + CONFIG.http.host + ":" + CONFIG.http.port + "...")
}