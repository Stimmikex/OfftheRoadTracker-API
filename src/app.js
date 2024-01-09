import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { getAreaById, getAllAreas } from "./dataOut/Areas/areas.js"
import { getZonesByAreaId , getCountTracksByZoneId } from "./dataOut/Areas/Zones/zones.js"
import { routerArea } from "./routes/Areas/areas.js";
import { routerGeoJson } from "./routes/GeoJson/geojson.js";
import { routerZones } from "./routes/Areas/Zones/zones.js";
import { routerTrack } from "./routes/Areas/Zones/Tracks/tracks.js";
import path from "path";
import sassMiddleware from "node-sass-middleware";
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

const { FRONTEND_URL: frontUrl, DATABASE_URL: databaseUrl } = process.env;

if (!databaseUrl) {
  console.error("Vantar .env gildi");
  process.exit(1);
}

app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json({ limit: "50mb" }));

app.use(express.static("public"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `*`);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,OPTIONS,DELETE,PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, Authorization, Body"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
    return;
  }
  next();
});

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(cookieParser());

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname + '/public'));

console.log(path.join(__dirname, "../public/styles/styles.scss"))

app.use(
  sassMiddleware({
    src: path.join(__dirname, "../public/styles/styles.scss"),
    dest: path.join(__dirname, "./public/styles/styles.css"),
    debug: true,
    outputStyle: "compressed",
  })
);

app.get("/", async (req, res) => {
  try {
    const areas = await getAllAreas();
    const zonesPromises = areas.map(async (element) => {
      const areaname = element.name;
      const zones = await getZonesByAreaId(element.id);

      const zoneListItems = await Promise.all(zones.map(async (zone) => {
        const trackCount = await getCountTracksByZoneId(zone.id);
        return {
          id: zone.id,
          name: zone.name,
          trackCount: trackCount.count,
        };
      }));

      return {
        areaname: areaname,
        zoneListItems: zoneListItems,
      };
    });

    const zoneById = await Promise.all(zonesPromises);

    res.render("index", { zoneById });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.use("/geojson", routerGeoJson);
app.use("/area", routerArea);
app.use("/zone", routerZones);
app.use("/track", routerTrack);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.info(`Server running at http://localhost:${PORT}/`);
});
