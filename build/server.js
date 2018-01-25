"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const logger = require("morgan");
const post_1 = require("./router/post");
const user_1 = require("./router/user");
class Server {
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(logger('dev'));
        this.app.use(cors());
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }
    routes() {
        const router = express.Router();
        this.app.use('/', router);
        this.app.use('/api/v1/posts', post_1.default);
        this.app.use('/api/v1/users', user_1.default);
    }
}
exports.default = new Server().app;
//# sourceMappingURL=server.js.map