import dotenv from 'dotenv';
import express from "express";
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { getGeoData } from '../../dataOut/GeoJson/inserted.js'

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const geojsonFilePath = join(__dirname, '../../../coords.geojson');

export const routerGeoJson = express.Router();

// Middleware to serve the GeoJSON file
routerGeoJson.get('/coords', async (req, res) => {
    try {
        // Read the GeoJSON file
        const data = await fs.readFile(geojsonFilePath, 'utf8');
    
        // Parse the GeoJSON data
        const geojsonData = JSON.parse(data);
    
        // Send the GeoJSON as the response
        res.json(geojsonData);
      } catch (err) {
        console.error('Error reading GeoJSON file:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

routerGeoJson.get('/coords/insert', async (req, res) => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const geojsonFilePath = join(__dirname, '../../../coords.geojson');

    const data = await getGeoData(geojsonFilePath);
    res.json(data)
});



routerGeoJson.get('/nocoords', async (req, res) => {
    try {
        // Read the GeoJSON file
        const data = await fs.readFile(geojsonFilePath, 'utf8');
    
        // Parse the GeoJSON data
        const geojsonData = JSON.parse(data);
    
        // Send the GeoJSON as the response
        res.json(geojsonData);
      } catch (err) {
        console.error('Error reading GeoJSON file:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

routerGeoJson.get('/nocoords/insert', async (req, res) => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const geojsonFilePath = join(__dirname, '../../../nocoords.geojson');

    const data = await getGeoData(geojsonFilePath);
    res.json(data)
});