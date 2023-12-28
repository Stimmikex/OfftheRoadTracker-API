import dotenv from 'dotenv';
import express from "express";
import { 
    getTracksByAreaId, 
    getTracksByDate, 
    getTracksById,
    getTracksByYear, 
    getTracksByZoneId,
    getTracksLengthByZoneId,
} from '../../../../dataOut/Areas/Zones/Tracks/tracks'

dotenv.config();

export const routerTrack = express.Router();

routerTrack.get("/area/:areaId", param("areaId"), async (req, res) => {
    const id = req.params.areaId;
    const track = await getTracksByAreaId(id);
    res.json(track);
});

routerTrack.get("/zone/length/:zoneId", param("zoneId"), async (req, res) => {
    const id = req.params.zoneId;
    const track = await getTracksLengthByZoneId(id);
    res.json(track);
});

routerTrack.get("/zone/:zoneId", param("zoneId"), async (req, res) => {
    const id = req.params.zoneId;
    const track = await getTracksByZoneId(id);
    res.json(track);
});

routerTrack.get("/date=:date", param("date"), async (req, res) => {
    const id = req.params.date;
    const track = await getTracksByDate(id);
    res.json(track);
});

routerTrack.get("/year=:year", param("year"), async (req, res) => {
    const id = req.params.year;
    const track = await getTracksByYear(id);
    res.json(track);
});

routerTrack.get("/:trackId", param("trackId"), async (req, res) => {
    const id = req.params.trackId;
    const track = await getTracksById(id);
    res.json(track);
});