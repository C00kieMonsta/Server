import * as url from 'url';

// Parse method copied from https://github.com/brianc/node-postgres
// Copyright (c) 2010-2014 Brian Carlson (brian.m.carlson@gmail.com)
// MIT License

// parses a connection string
function parse(str: string) {
    let config: any;

    // unix socket
    if (str.charAt(0) === '/') {
        config = str.split(' ');
        return { host: config[0], database: config[1] };
    }

    // url parse expects spaces encoded as %20
    if (/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(str)) {
        str = encodeURI(str).replace(/\%25(\d\d)/g, '%$1');
    }

    const result: any = url.parse(str, true);
    config = {};

    config.port = result.port;

    if (result.protocol === 'socket:') {
        config.host = decodeURI(result.pathname);
        config.database = result.query.db;
        config.client_encoding = result.query.encoding;
        return config;
    }

    config.host = result.hostname;

    // result.pathname is not always guaranteed to have a '/' prefix (e.g. relative urls)
    // only strip the slash if it is present.
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
export const db = pgp({
    ...parse(process.env.DATABASE_URL),
    poolSize: 4,
    ssl: true,
});
