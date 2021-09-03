/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const fs = require('fs')
const runner = require('child_process')

function run(absolutePath, req, res) {
    runner.exec("php " + absolutePath, (err, phpResponse, stderr) => {
        res.end(phpResponse);
    })
}

module.exports = {run};