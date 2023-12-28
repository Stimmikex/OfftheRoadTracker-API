import dotenv from 'dotenv';
import express from "express";
import { getAreaById, getAllAreas } from '../../dataOut/Areas/areas'
import { getZonesByAreaId } from '../../dataOut/Areas/Zones/zones'

dotenv.config();

export const routerArea = express.Router();

routerArea.get("/", async (req, res) => {
    const events = await getAllAreas();
    res.json(events);
});

routerEvent.get("/:areaId", param("areaId"), async (req, res) => {
    const id = req.params.areaId;
    const area = await getAreaById(id);
    const zones = await getZonesByAreaId(id);
    res.json({area, zones});
  });