const express = require("express");
const request = require("request-promise");
const router = express.Router();
const cityList = require("../data").states;

// TrafficView API Config
const { baseurl } = require("../data").api_docs;

// routes
router.get("/", (req, res) => {
  res.json({
    count: cityList.length,
    statesList: cityList,
  });
});

router.get("/:stateName", async (req, res) => {
  const { stateName } = req.params;
  const { city, responseLimit } = req.query;

  let reqURI = `${baseurl}&state=${stateName}`;

  //   check if city query passed
  if (city) reqURI = reqURI + `&city=${city}`;
  // check if response limit passed
  if (responseLimit) {
    reqURI = reqURI + `&response-limit=${responseLimit}`;
  } else {
    res.json({
      message:
        "Response overloaded (can be), please pass responseLimit as a query.",
    });
  }

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
