import pool from './db.js'
import { dirname, join} from 'path'
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, 'schema.sql');

(async () => {
    try {
        const schema = await readFile(filePath, 'utf-8')
        const res = await pool.query(schema)
        console.log("Tables Created succesfully")
    } catch (e) {
        console.error("Error creating tables ", e)
    } finally {
        await pool.end()
        process.exit()
    }
})()
