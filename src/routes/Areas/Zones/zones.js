import express from "express";
import dotenv from 'dotenv';
import { param } from "express-validator";
import {
    getAllZone,
    getZoneById, 
    getZoneByName, 
    getZoneCoorinatesById, 
 } from '../../../dataOut/Areas/Zones/zones.js'

dotenv.config();

export const routerZones = express.Router();

routerZones.get("/", async (req, res) => {
    const zone = await getAllZone();

    const groupedData = zone.reduce((acc, entry) => {
        if (!acc[entry.name]) {
            acc[entry.name] = [];
        }
        acc[entry.name].push([entry.coordinates_long, entry.coordinates_lat]);
        return acc;
    }, {});
    
    const features = Object.entries(groupedData).map(([name, coordinates]) => {
        return {
            type: "Feature",
            properties: { name },
            geometry: {
                type: "Polygon",
                coordinates: [coordinates]
            }
        };
    });

    res.json(features);
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

routerZones.get("/:zoneId", param("zoneId"), async (req, res) => {
    const id = req.params.zoneId;
    const zone = await getZoneById(id);
    res.json(zone);
});