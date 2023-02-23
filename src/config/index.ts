import dotenv from "dotenv";
dotenv.config();

interface DBConfig {
    user: string;
    password: string;
    host: string;
    database: string;
}

export type db_keys = "auth" | "pets";

export const sql = {
    auth: {
        user: process.env.AUTH_DB_USER,
        password: process.env.AUTH_DB_PASSWORD,
        host: process.env.AUTH_DB_HOST,
        database: process.env.AUTH_DB_NAME
    },
    pets: {
        user: process.env.PETS_DB_USER,
        password: process.env.PETS_DB_PASSWORD,
        host: process.env.PETS_DB_HOST,
        database: process.env.PETS_DB_NAME
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
