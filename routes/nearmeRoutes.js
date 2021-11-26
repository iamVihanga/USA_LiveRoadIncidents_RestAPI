const express = require("express");
const router = express.Router();
const request = require("request-promise");
const { baseurl } = require("../data").api_docs;

router.get("/", async (req, res) => {
  let { lat, lon, radius, responseLimit } = req.query;
  radius = radius || 500;
  let reqURI = `${baseurl}&radius=${radius}&radius-lat=${lat}&radius-lon=${lon}`;

  if (responseLimit) reqURI = reqURI + `&response-limit=${responseLimit}`;

  try {
    const response = await request(reqURI);
    res.json(JSON.parse(response));
  } catch (err) {
    const error = {
      name: err.name,
      statusCode: err.statusCode,
      message: err.message,
      error: err.error,
    };
    res.json(err);
  }
});

module.exports = router;
// 35.48539859440438, -97.50014374807625
