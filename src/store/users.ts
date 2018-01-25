import { db } from './db';


export function getAll(): Promise<any> {
    return db.manyOrNone('SELECT * FROM users');
}
