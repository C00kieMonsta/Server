import { db } from './db';


export function getAll(): Promise<any> {
    return db.manyOrNone('SELECT * FROM users');
}


export function create(userId: string, firstName: string, lastName: string, email: string, picture: string): Promise<void> {
    console.log('Store', userId, firstName, lastName, email, picture);
    return db.none('INSERT INTO users (dbid, first_name, last_name, email, picture) VALUES ($1, $2, $3, $4, $5)', [userId, firstName, lastName, email, picture]);
}