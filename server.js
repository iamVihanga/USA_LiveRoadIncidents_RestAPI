const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const statesRoutes = require("./routes/statesRoutes");
const nearMeRoutes = require("./routes/nearmeRoutes");
const boxFilterRoutes = require("./routes/boxFilterRoutes");
const latLonBoxFilterRoutes = require("./routes/latLonBoxFilterRoutes");
const cityRoutes = require("./routes/cityRoutes");
const roadRoutes = require("./routes/roadRoutes");

// middlewares
// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Welcome to USA RealTime Road Incidents REST API");
});
// ---- get data from states ----
app.use("/states", statesRoutes);
// ---- get data from near me ----
app.use("/near-me", nearMeRoutes);
// ---- get data from box filter ----
app.use("/box-filter", boxFilterRoutes);
// ---- get data from lat lon box filter ----
app.use("/latlon-box-filter", latLonBoxFilterRoutes);
// ---- get data from cities ----
// app.use("/city", cityRoutes);    ** City Route was removed - Cant get correct city names
// ---- get data from road ----
// app.use("/road", roadRoutes);    ** Road Router was removed - Cant get correct Road names

// listen to server
app.listen(PORT, () => console.log(`Server Started Listing on PORT - ${PORT}`));
