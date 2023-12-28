import dotenv from 'dotenv';
import express from "express";
import { getAreaById, getAllAreas } from '../../dataOut/Areas/areas.js'
import { getZonesByAreaId } from '../../dataOut/Areas/Zones/zones.js'
import { param } from "express-validator";

dotenv.config();

export const routerArea = express.Router();

routerArea.get("/", async (req, res) => {
    const events = await getAllAreas();
    res.json(events);
});

routerArea.get("/:areaId", param("areaId"), async (req, res) => {
    const id = req.params.areaId;
    const area = await getAreaById(id);
    const zones = await getZonesByAreaId(id);
    res.json({area, zones});
  });