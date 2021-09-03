/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const http = require('http');
const path = require('path');
const os = require("os");
const httputil = require('../util/httputil')

const HOME_DIR = path.join(os.userInfo().homedir, ".craftions_http");

const server = http.createServer(httputil.processRequest)

module.exports = (CONFIG, VHOSTS) => {
    httputil.init(CONFIG, VHOSTS)
    console.log("Starting HTTP Server on " + CONFIG.http.host + ":" + CONFIG.http.port + "...")
    server.listen(CONFIG.http.port, CONFIG.http.host)
    console.log("Started HTTP Server on " + CONFIG.http.host + ":" + CONFIG.http.port)
}