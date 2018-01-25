import { db } from './db';


export function getAll(): Promise<any> {
    return db.manyOrNone('SELECT * FROM posts');
}

export function create(postId: string, userId: string, createdAt: number, postContent: string): Promise<void> {
    return db.none('INSERT INTO posts (dbid, user_dbid, created_at, post_content) VALUES ($1, $2, $3, $4)', [postId, userId, createdAt, postContent]);
}