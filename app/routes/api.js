/**
 * @author EmmanuelOlaojo
 * @since 8/30/17
 */

let express = require("express");
let apiRouter = express.Router();
let uAuthRouter = require("./auth/user.auth.routes");

apiRouter.use("/u", uAuthRouter);

module.exports = apiRouter;