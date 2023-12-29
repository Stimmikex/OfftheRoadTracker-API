import express from "express";
import dotenv from 'dotenv';
import { param } from "express-validator";
import { 
    getZoneById, 
    getZoneByName, 
    getZoneCoorinatesById, 
 } from '../../../dataOut/Areas/Zones/zones.js'

dotenv.config();

export const routerZones = express.Router();

routerZones.get("/:zoneId", param("zoneId"), async (req, res) => {
    const id = req.params.zoneId;
    const zone = await getZoneById(id);
    res.json(zone);
});

routerZones.get("/name/:zoneName", param("zoneName"), async (req, res) => {
    const id = req.params.zoneName;
    const zone = await getZoneByName(id);
    res.json(zone);
});

routerZones.get("/coordinates/:zoneId", param("zoneId"), async (req, res) => {
    const id = req.params.zoneId;
    const zone = await getZoneCoorinatesById(id);
    res.json(zone);
});