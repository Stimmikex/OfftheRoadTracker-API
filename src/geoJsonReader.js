import { promises as fs } from 'fs';

async function readFileAsync(sql) {
  try {
    const file = await fs.readFile(sql);
    return file;
  } catch (e) {
    throw new Error(e);
  }
}

const setupInserter = async (link, mesasge) => {
    try {
      const getData = await readFileAsync(link)
      console.log(getData);
      console.info(mesasge.suc)
    } catch (e) {
      console.error(mesasge.err)
      return;
    }
  }

setupInserter('../coords.geojson', 
{ "msg": 
    { 
    err : "Data was not inserted",
    suc : "Data was inserted wihtout any issues"
    }
})