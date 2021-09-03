/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const https = require('https');

const server = https.createServer((req, res) => {
    res.end("Hello SSL")
})

server.listen(443)