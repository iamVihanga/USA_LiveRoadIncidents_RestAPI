const express = require("express");
const request = require("request-promise");
const router = express.Router();
const { baseurl } = require("../data").api_docs;

router.get("/", async (req, res) => {
  const { swLat, swLon, neLat, neLon, responseLimit } = req.query;
  let reqURI = `${baseurl}&sw-lat=${swLat}&sw-lon=${swLon}&ne-lat=${neLat}&ne-lon=${neLon}`;

  // Validate response Limit
  if (responseLimit) {
    reqURI = reqURI + `&response-limit=${responseLimit}`;
  } else {
    res.json({
      message:
        "Response overloaded (can be), please pass responseLimit as a query.",
    });
  }

  //   Request API
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
    res.json(error);
  }
});

module.exports = router;
