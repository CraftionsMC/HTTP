/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const {Route} = require("../module/route");
const nodeRunner = require("../module/node");
const phpRunner = require("../module/php");
const pythonRunner = require("../module/python");

function loadPlugin(path) {
    let plugin = require(path)
    plugin.create({
        Route: Route,
        NodeRun: nodeRunner.run,
        PhpRun: phpRunner.run,
        PythonRun: pythonRunner.run
    })
    console.log("Loaded \"" + plugin.name + "\" v" + plugin.version + " by " + plugin.author);
}

module.exports = {loadPlugin}