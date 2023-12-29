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
export const getZoneById = async () => {}
export const getZoneByName = async () => {}
