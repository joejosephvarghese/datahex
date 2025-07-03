const express = require("express");
const authRoute = require("./auth.route");
const blogRoute = require("./blog.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
   {
    path: "/media",
    route: blogRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
