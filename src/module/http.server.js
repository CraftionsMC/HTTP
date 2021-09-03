/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Hello World')
})

server.listen(80)