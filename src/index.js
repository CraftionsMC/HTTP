/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const child_process = require('child_process');
const {Logger} = require("./util/Logger");

Logger.init();

