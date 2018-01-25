"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
function parse(str) {
    let config;
    if (str.charAt(0) === '/') {
        config = str.split(' ');
        return { host: config[0], database: config[1] };
    }
    if (/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(str)) {
        str = encodeURI(str).replace(/\%25(\d\d)/g, '%$1');
    }
    const result = url.parse(str, true);
    config = {};
    config.port = result.port;
    if (result.protocol === 'socket:') {
        config.host = decodeURI(result.pathname);
        config.database = result.query.db;
        config.client_encoding = result.query.encoding;
        return config;
    }
    config.host = result.hostname;
    let pathname = result.pathname;
    if (pathname && pathname.charAt(0) === '/') {
        pathname = result.pathname.slice(1) || null;
    }
    config.database = pathname && decodeURI(pathname);
    const auth = (result.auth || ':').split(':');
    config.user = auth[0];
    config.password = auth.splice(1).join(':');
    ['db', 'database', 'encoding', 'client_encoding', 'host', 'port', 'user', 'password', 'ssl'].forEach((key) => {
        delete result.query[key];
    });
    Object.getOwnPropertyNames(result.query).forEach((key) => {
        let value = result.query[key];
        if (Array.isArray(value)) {
            value = value[value.length - 1];
        }
        config[key] = value;
    });
    return config;
}
const pgp = require('pg-promise')();
exports.db = pgp(Object.assign({}, parse(process.env.DATABASE_URL), { poolSize: 4, ssl: true }));
//# sourceMappingURL=db.js.map