const router = require("express").Router();

const userRoutes = require("./user-routes");

const thoughtRoutes = require("./thought-routes");

router.use("/users", userRoutes);

router.use("/thoughts", thoughtRoutes);

router.use((req, res) => {
    return res.send("API Index - error");
  });

module.exports = router;
