/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

class Route {

    static routes = []

    static registerRoute(pathBegin, vhost, callback) {
        this.routes.push({
            pathBegin: pathBegin,
            vhost: vhost,
            callback: callback
        })
    }

    static hasRouteAt(path) {
        let rCode = false;

        this.routes.forEach(r => {
            console.log("/" + path.split("/")[1])
            if("/" + path.split("/")[1] === r.pathBegin) {
                rCode = true;
            }
        })
        return rCode;
    }

    static getRouteAt(path) {
        let route = null;

        this.routes.forEach(r => {
            if(path.startsWith(r.pathBegin)) {
                route = r;
            }
        })

        return route
    }
}

module.exports = {Route}