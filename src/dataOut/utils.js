import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
  DATABASE_URL: connectionString,
  NODE_ENV: nodeEnv = 'development',
} = process.env;

const ssl = nodeEnv !== 'development' ? { rejectUnauthorized: false } : false;

const pool = new pg.Pool({ connectionString, ssl });

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export async function query(q, values = []) {
  let client;

  try {
    client = await pool.connect();
    const result = await client.query(q, values);
    return result;
  } catch (err) {
    console.error('Error in query', err, q);
    throw new Error('An error occurred while executing the database query.');
  } finally {
    if (client) client.release();
  }
}