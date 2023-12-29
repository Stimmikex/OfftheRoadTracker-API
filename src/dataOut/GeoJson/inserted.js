import { query } from '../utils.js'

import { promises as fs } from 'fs';


export const getGeoData = async (geojsonFilePath) => {
    try {
        // Read the GeoJSON file
        const data = await fs.readFile(geojsonFilePath, 'utf8');
    
        // Parse the GeoJSON data
        const geojsonData = JSON.parse(data);
    
        // Send the GeoJSON as the response
        geojsonData.features.forEach(async (el) => {
            if (el.properties.area != null) {
                const zoneId = "SELECT id FROM zone WHERE name = $1";
                const zoneArr = [el.properties.area]
                const typeId = "SELECT id AS type_id FROM type WHERE name = $1";
                const typeArr = ["Point"]
                const getZoneId = await query(zoneId, zoneArr)
                const getTypeId = await query(typeId, typeArr)
    
                const insertTrack = "INSERT INTO track (name, date, length, zone_id, description, year) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
                const trackArr = [
                  el.properties.name,
                  el.properties.date,
                  el.properties.length,
                  getZoneId.rows[0].id,
                  el.properties.description,
                  el.properties.year,
                ]
    
                const setTrack = await query(insertTrack, trackArr)
                console.info(`${el.properties.name}: Has been added`)
    
                if (el.geometry.coordinates != undefined) {
                    const insertGeometry = "INSERT INTO geometry (coordinates_lat, coordinates_long, type_id, track_id) VALUES ($1, $2, $3, $4)";
                    const geometryArr = [
                        el.geometry.coordinates[0],
                        el.geometry.coordinates[1],
                        getTypeId.rows[0].type_id,
                        setTrack.rows[0].id,
                    ]
        
                    await query(insertGeometry, geometryArr)
                    console.info(`Coordinates has been added for ${el.properties.name}`)
                } else {
                    console.error(`${el.properties.name} does not have coordinates`)
                }
            }
        });
        return geojsonData
      } catch (err) {
        console.error('Error reading GeoJSON file:', err);
      }
}
