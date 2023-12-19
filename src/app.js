import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

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
  res.header("Access-Control-Allow-Origin", `${frontUrl}`);
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

app.use(cookieParser());

app.get("/", async (req, res) => {
  const events = await getEvents();
  res.json(events);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.info(`Server running at http://localhost:${PORT}/`);
});
