const express = require("express");
const router = express.Router();
const request = require("request-promise");
const { baseurl } = require("../data").api_docs;

router.get("/:roadName", async (req, res) => {
  const { roadName } = req.params;
  const { responseLimit } = req.query;
  let reqURI = `${baseurl}&road=${roadName}`;

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
    res.json(error);
  }
});

module.exports = router;
