"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid = require("uuid");
const Post = require("../store/posts");
class PostRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    all(req, res) {
        Post.getAll().then((data) => {
            res.status(200).json({ data });
        }).catch((error) => {
            res.status(500).json({ error });
        });
    }
    create(req, res) {
        const { userId, postContent } = req.body;
        if (!userId || !postContent) {
            res.status(400).send();
            return;
        }
        const postId = uuid.v4();
        const createdAt = Date.now();
        Post.create(postId, userId, createdAt, postContent).then((data) => {
            res.status(200).json({ data });
        }).catch((error) => {
            res.status(500).json({ error });
        });
    }
    routes() {
        this.router.get('/', this.all);
        this.router.post('/new', this.create);
    }
}
exports.PostRouter = PostRouter;
const postRoutes = new PostRouter();
postRoutes.routes();
exports.default = postRoutes.router;
//# sourceMappingURL=post.js.map