import knex from 'knex';
import __dirname from "./utils.js";

export const database = knex({
    client: 'sqlite3',
    connection: {
        filename: __dirname + '/db/ecommerce.sqlite'
    }
});

export const chats = knex({
    client: 'sqlite3',
    connection: {
        filename: __dirname + '/db/chats.sqlite'
    }
});