/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const fs = require('fs');
const path = require("path");

function getIndexes(currentPath, absolutePath) {

    let x = "";

    if(!currentPath.endsWith("/"))
        currentPath += "/";

    fs.readdirSync(absolutePath).forEach(file => {
        if (!file.startsWith(".")) {
            x += "<a href='" + currentPath + file + "'>" + file + "</a><br>"
        }
    })

    return x;
}

module.exports = {getIndexes}