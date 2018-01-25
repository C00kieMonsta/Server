"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
function getAll() {
    return db_1.db.manyOrNone('SELECT * FROM posts');
}
exports.getAll = getAll;
function create(postId, userId, createdAt, postContent) {
    return db_1.db.none('INSERT INTO posts (dbid, user_dbid, created_at, post_content) VALUES ($1, $2, $3, $4)', postId, userId, createdAt, postContent);
}
exports.create = create;
//# sourceMappingURL=posts.js.map