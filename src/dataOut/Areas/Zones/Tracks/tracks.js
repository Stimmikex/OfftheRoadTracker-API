import { query } from '../../../utils.js'

export const getAllTracks = async () => {
    const q = `SELECT track.id, track.name, date, length, description, year, coordinates_lat, coordinates_long, coordinates_height, type.name AS type FROM track 
                    INNER JOIN geometry ON geometry.track_id = track.id
                    INNER JOIN type ON type.id = geometry.type_id 
                `
    try {
        const result = await query(q)
        return result.rows;
    } catch (e) {
        console.error('')
    }
}

export const getTracksByZoneId = async (zone_id) => {
    const q = `SELECT track.id, track.name, date, length, description, year, coordinates_lat, coordinates_long, coordinates_height, type.name AS type FROM track 
                    INNER JOIN geometry ON geometry.track_id = track.id
                    INNER JOIN type ON type.id = geometry.type_id 
                WHERE track.zone_id = $1`
    try {
        const result = await query(q, [zone_id])
        return result.rows;
    } catch (e) {
        console.error('')
    }
}
export const getTracksByYear = async (year) => {
    const q = `SELECT track.id, track.name, date, length, description, year, coordinates_lat, coordinates_long, coordinates_height, type.name AS type FROM track 
                    INNER JOIN geometry ON geometry.track_id = track.id
                    INNER JOIN type ON type.id = geometry.type_id 
                WHERE year = $1`
    try {
    const result = await query(q, [year])
    return result.rows;
    } catch (e) {
    console.error('')
    }
}

export const getTracksById = async (id) => {
    const q = `SELECT track.id, track.name, date, length, description, year, coordinates_lat, coordinates_long, coordinates_height, type.name AS type FROM track 
                    INNER JOIN geometry ON geometry.track_id = track.id
                    INNER JOIN type ON type.id = geometry.type_id 
                WHERE track.id = $1`
    try {
    const result = await query(q, [id])
    return result.rows[0];
    } catch (e) {
    console.error('')
    }
}

export const getTracksByAreaId = async (area_id) => {}

export const getTotalTrackLengthByZoneId = async (zone_id) => {
    const q = `SELECT SUM(length) AS SumLength FROM track WHERE zone_id = $1`
    try {
    const result = await query(q, [zone_id])
    return result.rows[0];
    } catch (e) {
    console.error('')
    }
}

export const getTotalTrackLengthOfZones = async () => {
    const q = `SELECT SUM(length) AS SumLength FROM track`
    try {
    const result = await query(q)
    return result.rows;
    } catch (e) {
    console.error('')
    }
}

export const getTracksByDate = async (date) => {
    const q = `SELECT track.id, track.name, date, length, description, year, coordinates_lat, coordinates_long, coordinates_height, type.name AS type FROM track 
            INNER JOIN geometry ON geometry.track_id = track.id
            INNER JOIN type ON type.id = geometry.type_id 
        WHERE date = $1`
    try {
    const result = await query(q, [date])
    return result.rows;
    } catch (e) {
    console.error('')
    }
}