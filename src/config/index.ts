import dotenv from "dotenv";
dotenv.config();

interface DBConfig {
    user: string;
    password: string;
    host: string;
    database: string;
}

export type db_keys = "auth" | "todo" | "notes";

export const sql = {
    auth: {
        user: process.env.AUTH_DB_USER,
        password: process.env.AUTH_DB_PASSWORD,
        host: process.env.AUTH_DB_HOST,
        database: process.env.AUTH_DB_NAME
    },
    todo: {
        user: process.env.TODO_DB_USER,
        password: process.env.TODO_DB_PASSWORD,
        host: process.env.TODO_DB_HOST,
        database: process.env.TODO_DB_NAME
    },
    notes: {
        user: process.env.NOTES_DB_USER,
        password: process.env.NOTES_DB_PASSWORD,
        host: process.env.NOTES_DB_HOST,
        database: process.env.NOTES_DB_NAME
    }
} as { [key: string]: DBConfig };

if (!process.env.TOKEN_KEY) {
    console.log("Let's crash this bitch");
    process.exit(1);
}

export const token = {
    key: process.env.TOKEN_KEY,
    expiration: process.env.TOKEN_EXPIRATION
};
