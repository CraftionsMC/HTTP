/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const {run} = require("./module/node");
const {Logger} = require('./util/logger');
const {Route} = require('./module/route');

const VERSION = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'))).version
const HOME_DIR = path.join(os.userInfo().homedir, ".craftions_http");

Logger.__console_log("\n" +
    "\n" +
    "   __________  ___    ____________________  _   _______\n" +
    "  / ____/ __ \\/   |  / ____/_  __/  _/ __ \\/ | / / ___/\n" +
    " / /   / /_/ / /| | / /_    / /  / // / / /  |/ /\\__ \\ \n" +
    "/ /___/ _, _/ ___ |/ __/   / / _/ // /_/ / /|  /___/ / \n" +
    "\\____/_/_|_/_/__|_/_/_____/_/ /___/\\____/_/ |_//____/  \n" +
    "   / / / /_  __/_  __/ __ \\                            \n" +
    "  / /_/ / / /   / / / /_/ /                            \n" +
    " / __  / / /   / / / ____/                             \n" +
    "/_/ /_/ /_/   /_/ /_/                                  \n" +
    "                                                       \n" +
    "\n" +
    "Version: " + VERSION +
    "\n" +
    "By: Ben Siebert" +
    "\n"
)

console.log("Config Home Directory: " + HOME_DIR)

if (!fs.existsSync(HOME_DIR)) {
    console.log("The Config Home Directory does not exist! Creating new one...", 1)

    fs.mkdirSync(HOME_DIR);

    fs.mkdirSync(path.join(HOME_DIR, "vhosts"));

    fs.mkdirSync(path.join(HOME_DIR, "vhosts/localhost"));

    fs.writeFileSync(path.join(HOME_DIR, "vhosts/localhost/index.html"), "<h1>Hello World</h1>");

    fs.writeFileSync(path.join(HOME_DIR, "vhosts.json"), JSON.stringify({
        hosts: [
            {
                serverName: "localhost 127.0.0.1",
                publicDir: path.join(HOME_DIR, "vhosts/localhost/"),
                indexFiles: [
                    "index.nodex",
                    "index.html"
                ],
                enableNode: true
            }
        ]
    }));

    fs.mkdirSync(path.join(HOME_DIR, "plugins"));

    fs.writeFileSync(path.join(HOME_DIR, "config.json"), JSON.stringify({
        http: {
            enable: true,
            port: 80,
            host: "0.0.0.0"
        },
    }))

}

fs.readdirSync(path.join(HOME_DIR, "plugins")).forEach(f => {
    if (f.endsWith(".js")) {
        let plugin = require(path.join(HOME_DIR, "plugins", f))
        plugin.create({
            Route: Route,
            NodeRun: run
        })
        console.log("Loaded \"" + plugin.name + "\" v" + plugin.version + " by " + plugin.author);
    }
})

const CONFIG = require(path.join(HOME_DIR, "config.json"));
const VHOSTS = require(path.join(HOME_DIR, "vhosts.json"))

if (CONFIG.http.enable) {
    require('./module/http.server')(CONFIG, VHOSTS);
}