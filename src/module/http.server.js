/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const os = require("os");
const {run} = require("./node");
const chalk = require("chalk");
const {Route} = require('./route')

const HOME_DIR = path.join(os.userInfo().homedir, ".craftions_http");

let conf;
let vhosts;

const server = http.createServer((req, res) => {

    let reqHost = req.headers.host;
    let reqPath = url.parse(req.url).path;

    console.log(chalk.yellow(reqHost) + " : " + chalk.blue(req.method + " ") + reqPath);

    res.setHeader("server", "Craftions HTTP")

    if (Route.hasRouteAt(reqPath)) {
        let r = Route.getRouteAt(reqPath);
        if(r.vhost.split(" ").includes(reqHost) || r.vhost === '') {
            Route.getRouteAt(reqPath).callback(req, res);
            return;
        }
    }

    let foundHost = false;

    vhosts.hosts.forEach(host => {
        if (reqHost === host.serverName || host.serverName.split(" ").includes(reqHost)) {
            foundHost = true;

            if (fs.existsSync(path.join(host.publicDir, reqPath))) {
                if (!fs.lstatSync(path.join(host.publicDir, reqPath)).isDirectory()) {
                    runFile(
                        host,
                        path.join(host.publicDir, reqPath),
                        req,
                        res
                    )
                } else {
                    runDir(
                        host,
                        path.join(host.publicDir, reqPath),
                        req,
                        res
                    )
                }
            } else {
                let f = false;
                for (let i = 0; i < host.indexFiles.length; i++) {
                    let fx = "." + host.indexFiles[i].split(".")[
                    host.indexFiles[i].split(".").length - 1
                        ];

                    if (fs.existsSync(path.join(host.publicDir, reqPath + fx))) {
                        f = true;
                        runFile(
                            host,
                            path.join(host.publicDir, reqPath + fx),
                            req,
                            res
                        )
                    }
                }

                if (!f)
                    res.end("The Resource was not found.")
            }
        }
    })

    if (!foundHost) {
        res.end("The VHOST was not found.")
    }
})

function runDir(host, reqPath, req, res) {
    let f = false;
    for (let i = 0; i < host.indexFiles.length; i++) {
        if (fs.existsSync(path.join(host.publicDir, reqPath, host.indexFiles[i]))) {
            f = true;
            runFile(
                host,
                path.join(host.publicDir, reqPath, host.indexFiles[i]),
                req,
                res
            )
            break;
        }
    }
    if (!f) {
        res.end("The Resource was not found.")
    }
}

function runFile(host, reqPath, req, res) {
    if (reqPath.endsWith(".nodex")) {
        if (host.enableNode)
            run(reqPath, req, res);
        else
            res.end(fs.readFileSync(reqPath));
    } else {
        res.end(fs.readFileSync(reqPath));
    }
}

module.exports = (CONFIG, VHOSTS) => {
    conf = CONFIG;
    vhosts = VHOSTS;
    console.log("Starting HTTP Server on " + CONFIG.http.host + ":" + CONFIG.http.port + "...")
    server.listen(CONFIG.http.port, CONFIG.http.host)
    console.log("Started HTTP Server on " + CONFIG.http.host + ":" + CONFIG.http.port)
}