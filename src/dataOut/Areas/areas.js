import { query } from './utils.js'

export const getAreaById = async (id) => {
    const q = ''
    try {
        const result = await query(q, [id])
        return result.rows;
    } catch (e) {
        console.error('')
    }
}

export const getAllAreas = async () => {
    const q = ''
    try {
        const result = await query(q)
        return result.rows;
    } catch (e) {
        console.error('')
    }
}