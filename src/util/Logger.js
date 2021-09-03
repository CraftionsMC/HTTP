/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

const chalk = require('chalk')

class Logger {

    static __console_log = console.log;

    static init() {
        console.log = (m) => this.info(m);
    }

    static log(msg, level) {
        switch (level) {
            case 1:
                this.warn(msg);
                break
            case 2:
                this.error(msg);
                break
            default:
                this.info(msg)
        }
    }

    static info(msg) {
        this.__console_log(chalk.blue("[INFO]") + this.#getTimeStamp() + msg)
    }

    static error(msg) {
        this.__console_log(chalk.red("[INFO]") + this.#getTimeStamp() + msg)
    }

    static warn(msg) {
        this.__console_log(chalk.yellow("[INFO]") + this.#getTimeStamp() + msg)
    }

    static #getTimeStamp() {
        let d = new Date();
        return chalk.green(
            " "
            + d.getDay()
            + "/"
            + d.getMonth()
            + "/"
            + d.getFullYear()
            + " "
            + d.getHours()
            + ":"
            + d.getMinutes()
            + ":"
            + d.getSeconds()
            + ":"
            + d.getMilliseconds()
            + " "
        )
    }
}

module.exports = {Logger};