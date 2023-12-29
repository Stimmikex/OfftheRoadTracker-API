import dotenv from 'dotenv';
import express from "express";
import { param } from "express-validator";
import { 
    getTracksByAreaId, 
    getTracksByDate, 
    getTracksById,
    getTracksByYear, 
    getTracksByZoneId,
    getTotalTrackLengthByZoneId,
    getTotalTrackLengthOfZones,
} from '../../../../dataOut/Areas/Zones/Tracks/tracks.js'

dotenv.config();

export const routerTrack = express.Router();

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
    const features = [];
    const feCo = {
        "type": "FeatureCollection",
        "features" : features,
    }
    track.forEach((tr) => {
        const fe = {
            "properties": {
                "name": tr.name,
                "date": tr.date,
                "length": tr.length,
                "description": tr.description,
                "year": tr.year,
            },
            "geometry": {
                "type": tr.type,
                "coordinates": [
                    tr.coordinates_lat,
                    tr.coordinates_long,
                ]
            }
        }
        features.push(fe);
    })
    res.json(feCo);
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