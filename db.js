import pg from "pg";
import doteEnv from 'dotenv'

doteEnv.config()

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

export default pool

export const runTransaction = async (cb) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const res =  await cb(client);
        await client.query('COMMIT');
        return res
    } catch(e) {
        console.log(e)
        await client.query("ROLLBACK")
        throw new Error("transaction Error")
    } finally {
        client.release()
    }
}

export const runQuery = async (query, values, client) => {
    const dbInstance = client ?? pool
    try {
        return await dbInstance.query(query,values);
    } catch (e) {
        throw e
    }
}
