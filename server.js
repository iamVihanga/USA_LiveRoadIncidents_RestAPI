const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const statesRoutes = require("./routes/statesRoutes");
const cityRoutes = require("./routes/cityRoutes");
const nearMeRoutes = require("./routes/nearmeRoutes");
const roadRoutes = require("./routes/roadRoutes");

// TrafficView API Config
const apikey = "3223fbc2692048f383d8b28d45445b43";
const baseurl = `http://api.trafficview.org/event/?api-key=${apikey}&format=rf-json&system-all=true`;

// middlewares
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Welcome to USA RealTime Road Incidents REST API");
});
// ---- get data from states ----
app.use("/states", statesRoutes);
// ---- get data from cities ----
app.use("/city", cityRoutes);
// ---- get data from near me ----
app.use("/near-me", nearMeRoutes);
// ---- get data from road ----
app.use("/road", roadRoutes);

// listen to server
app.listen(PORT, () => console.log(`Server Started Listing on PORT - ${PORT}`));
