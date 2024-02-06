import { Client } from "pg";

const client = new Client({
    host: "db-mycontacts",
    port: 5432,
    user: "root",
    password: "root",
    database: "postgres",
});

client.connect();

async function query(query: string, values?: Array<any>) {
    const { rows } = await client.query(query, values);

    return rows;
}
export default query;