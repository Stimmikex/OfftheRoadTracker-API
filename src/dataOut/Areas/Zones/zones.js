import { query } from '../../utils.js'

export const getZonesByAreaId = async (id) => {
    const q = 'SELECT * FROM zone WHERE area_id = $1'
    try {
        const result = await query(q, [id])
        return result.rows;
    } catch (e) {
        console.error('')
    }
}
export const getZoneCoorinatesById = async () => {}

export const getZoneById = async (id) => {
    const q = `SELECT zone.name, coordinates_lat, coordinates_long, type_id, coordinates_height, type.name AS type FROM zone 
        INNER JOIN zone_fence ON zone_fence.zone_id = zone.id
        INNER JOIN type ON type.id = zone_fence.type_id
        WHERE zone_id = $1
    `
    try {
        const result = await query(q, [id])
        return result.rows;
    } catch (e) {
        console.error('')
    }
}

export const getAllZone = async () => {
    const q = `SELECT zone.name, coordinates_lat, coordinates_long, type_id, coordinates_height, type.name AS type FROM zone 
                INNER JOIN zone_fence ON zone_fence.zone_id = zone.id
                INNER JOIN type ON type.id = zone_fence.type_id
            `
    try {
        const result = await query(q)
        return result.rows;
    } catch (e) {
        console.error('')
    }
}

export const getCountTracksByZoneId = async (id) => {
    const q = 'SELECT COUNT(*) FROM track WHERE zone_id = $1'
    try {
        const result = await query(q, [id])
        return result.rows[0];
    } catch (e) {
        console.error('')
    }
}

export const getZoneByName = async () => {}
