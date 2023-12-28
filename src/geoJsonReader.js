import { promises as fs } from 'fs';
import { query } from './dataOut/utils.js'

async function readFileAsync(sql) {
  try {
    const file = await fs.readFile(sql, 'utf8');
    return JSON.parse(file);
  } catch (e) {
    throw new Error(e);
  }
}

export const setupInserter = async (link, mesasge) => {
    try {
      const getData = await readFileAsync(link)
      console.info(mesasge.suc)
      return getData;
    } catch (e) {
      console.error(mesasge.err)
      return;
    }
  }

const data = await setupInserter('../coords.geojson', 
{ "msg": 
    { 
    err : "Data was not inserted",
    suc : "Data was inserted wihtout any issues"
    }
})

const insertRunning = async (dataman) => {
  dataman.features.forEach(async (el) => {
    const s = "SELECT id FROM area WHERE name = $1";
    const arrs = [
      el.properties.area,
    ]
    const sdata = await query(s, arrs)
    console.log(sdata.rows[0]);
    const q = "INSERT INTO track (name, date, length, area, description, year) VALUES ($1, $2, $3, $4, $5, $6)";
    const arrq = [
      el.properties.area,
    ]
    const s1 = "SELECT id FROM type WHERE type = $1";
    const q1 = "INSERT INTO geometry (type, coordinates) VALUES ($1, $2)";

    console.log(el.properties.name, )
    console.log(el.geometry.type, el.geometry.coordinates)
  });
}