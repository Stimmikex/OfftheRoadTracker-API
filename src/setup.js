// import pg from 'pg';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { promises as fs } from 'fs';

async function readFileAsync(sql) {
  try {
    const file = await fs.readFile(sql);
    return file;
  } catch (e) {
    throw new Error(e);
  }
}

dotenv.config();

const {
  DATABASE_URL: connectionString,
  NODE_ENV: nodeEnv = 'development',
} = process.env;

if (!connectionString) {
  console.error('Vantar DATABASE_URL');
  process.exit(1);
}

const ssl = nodeEnv !== 'development' ? { rejectUnauthorized: false } : false;

// const pool = new pg.Pool({ connectionString, ssl });

const pool = new mysql.createPool({ connectionString, ssl });

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// export async function query(q, v = []) {
//   const client = await pool.connect();

//   try {
//     const result = await client.query(q, v);
//     return result.rows;
//   } catch (e) {//eslint-disable-line
//     throw e;
//   } finally {
//     client.release();
//   }
// }

export async function query(q, v = []) {
  const connection = await pool.getConnection();

  try {
    const [rows] = await connection.query(q, v);
    return rows;
  } catch (e) {
    throw e;
  } finally {
    connection.release();
  }
}

async function main() {
  // eslint-disable-next-line no-template-curly-in-string
  console.info(`Set upp gagnagrunn á ${connectionString}`);

  try {
    const createTable = await readFileAsync('./sql/schema.sql');
    await query(createTable.toString('utf8'));
    console.info('Tafla búin til');
  } catch (e) {
    console.error('Villa við að búa til töflu:', e.message);
    return;
  }
}

main().catch((err) => {
  console.error(err);
});
