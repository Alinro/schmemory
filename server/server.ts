import express, { Express } from "express";
import { toPng, toSvg } from "jdenticon";
import cors from "cors";

const app: Express = express();
app.use(cors());

const port = process.env.SERVER_PORT || 3002;

// Example: 'GET /png/billy/300' will return a 300x300 png for the identifier 'billy'
app.get("/png/:identifier/:size", (req, res) => {
  res.setHeader("Content-Type", "image/png");
  res.send(toPng(req.params.identifier, Number.parseInt(req.params.size, 10)));
});

// Example: 'GET /svg/billy/300' will return a 300x300 svg for the identifier 'billy'
app.get("/svg/:identifier/:size", (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(toSvg(req.params.identifier, Number.parseInt(req.params.size, 10)));
});

app.listen(port, () => console.log(`Image server running on port ${port}`));
