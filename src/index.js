/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const child_process = require('child_process');
const {Logger} = require('./util/Logger');

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

    fs.writeFileSync(path.join(HOME_DIR, "vhosts.json"), JSON.stringify({
        hosts: [
            {
                serverName: "localhost",

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

const CONFIG = require(path.join(HOME_DIR, "config.json"));

if(CONFIG.http.enable) {
    require('./module/http.server')(CONFIG);
}