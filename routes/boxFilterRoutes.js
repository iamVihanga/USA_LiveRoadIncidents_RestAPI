const express = require("express");
const request = require("request-promise");
const router = express.Router();
const { baseurl } = require("../data").api_docs;

router.get("/", async (req, res) => {
  const { width, height, boxLat, boxLon, responseLimit } = req.query;
  let reqURI = `${baseurl}&width=${width}&height=${height}&box-lat=${boxLat}&box-lon=${boxLon}`;

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
