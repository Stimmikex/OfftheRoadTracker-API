import dotenv from 'dotenv';
import express from "express";
import { param } from "express-validator";
import { 
    getAllTracks,
    getTracksByAreaId, 
    getTracksByDate, 
    getTracksById,
    getTracksByYear, 
    getTracksByZoneId,
    getTotalTrackLengthByZoneId,
    getTotalTrackLengthOfZones,
} from '../../../../dataOut/Areas/Zones/Tracks/tracks.js'
import { convertGeoJson } from '../../../../utility/tracks.js';

dotenv.config();

export const routerTrack = express.Router();

routerTrack.get("/", async (req, res) => {
    const track = await getAllTracks();
    res.json(convertGeoJson(track));
});

routerTrack.get("/area/:areaId", param("areaId"), async (req, res) => {
    const id = req.params.areaId;
    const track = await getTracksByAreaId(id);
    res.json(track);
});

routerTrack.get("/zone/length/", async (req, res) => {
    const track = await getTotalTrackLengthOfZones();
    res.json(track);
});

routerTrack.get("/zone/length/:zoneId", param("zoneId"), async (req, res) => {
    const id = req.params.zoneId;
    const track = await getTotalTrackLengthByZoneId(id);
    res.json(track);
});


routerTrack.get("/zone/:zoneId", param("zoneId"), async (req, res) => {
    const id = req.params.zoneId;
    const track = await getTracksByZoneId(id);
    res.json(convertGeoJson(track));
});

routerTrack.get("/date=:date", param("date"), async (req, res) => {
    const id = req.params.date;
    const track = await getTracksByDate(id);
    res.json(track);
});

routerTrack.get("/year=:year", param("year"), async (req, res) => {
    const id = req.params.year;
    const track = await getTracksByYear(id);
    res.json(convertGeoJson(track));
});

routerTrack.get("/:trackId", param("trackId"), async (req, res) => {
    const id = req.params.trackId;
    const track = await getTracksById(id);
    res.json(track);
});