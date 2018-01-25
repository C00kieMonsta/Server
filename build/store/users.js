"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
function getAll() {
    return db_1.db.manyOrNone('SELECT * FROM users');
}
exports.getAll = getAll;
function create(userId, firstName, lastName, email, picture) {
    return db_1.db.none('INSERT INTO users (dbid, first_name, last_name, email, picture) VALUES ($1, $2, $3, $4, $5)', userId, firstName, lastName, email, picture);
}
exports.create = create;
//# sourceMappingURL=users.js.map