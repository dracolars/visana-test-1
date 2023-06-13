const express = require("express");
const router = express.Router();
const {
  getAllTrades,
  getTradeById,
  createTrade,
  handle405,
} = require("../controllers/trades");

router.get("/", getAllTrades);
router.get("/:id", getTradeById);

router.post("/", createTrade);

router.delete("/:id", handle405);
router.put("/:id", handle405);
router.patch("/:id", handle405);

module.exports = router;
