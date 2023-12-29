import { query } from '../utils.js'

export const getAreaById = async (id) => {
    const q = 'SELECT * FROM area WHERE id = $1'
    try {
        const result = await query(q, [id])
        return result.rows[0];
    } catch (e) {
        console.error('')
    }
}

export const getAllAreas = async () => {
    const q = 'SELECT * FROM area'
    try {
        const result = await query(q)
        return result.rows;
    } catch (e) {
        console.error('')
    }
}