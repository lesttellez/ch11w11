const router = require("express").Router();
const fs = require("fs");

const routes = require("../apiRoutes/routes");

router.use(routes);

module.exports = router;