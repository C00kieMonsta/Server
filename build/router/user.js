"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid = require("uuid");
const User = require("../store/users");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    all(req, res) {
        User.getAll().then((data) => {
            res.status(200).json({ data });
        }).catch((error) => {
            res.status(500).json({ error });
        });
    }
    create(req, res) {
        const { firstName, lastName, email, picture } = req.body;
        console.log(req.body);
        const userId = uuid.v4();
        User.create(userId, firstName, lastName, email, picture).then((data) => {
            res.status(200).json({ data });
        }).catch((error) => {
            console.log(error);
            res.status(500).json({ error });
        });
    }
    routes() {
        this.router.get('/', this.all);
        this.router.post('/', this.create);
    }
}
exports.UserRouter = UserRouter;
const userRoutes = new UserRouter();
userRoutes.routes();
exports.default = userRoutes.router;
//# sourceMappingURL=user.js.map