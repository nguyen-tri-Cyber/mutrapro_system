import fs from 'fs';
import path from 'path';
import { getPool } from '../config/db.js';

const file = path.resolve(process.cwd(), 'src/scripts/init.sql');
const sqlText = fs.readFileSync(file, 'utf8');

const run = async () => {
  try{
    const pool = await getPool();
    await pool.request().batch(sqlText);
    console.log('Init SQL executed successfully.');
    process.exit(0);
  }catch(e){
    console.error(e);
    process.exit(1);
  }
};
run();
