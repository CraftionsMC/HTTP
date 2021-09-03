/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const fs = require('fs')

function run(absolutePath, req, res) {
    require(absolutePath)(req, res);
    delete require.cache[require.resolve(absolutePath)]
}

module.exports = {run};