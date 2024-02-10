import { Client } from "pg";

const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

client.connect();

async function query(query: string, values?: Array<any>) {
    const { rows } = await client.query(query, values);

    return rows;
}
export default query;