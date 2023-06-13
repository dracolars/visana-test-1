const Trades = require("../models/trades");

// CRUD Methods

// GET All (with optional query)
const getAllTrades = async (req, res, next) => {
  try {
    let type = req.query.type ? req.query.type : false;
    let user_id = req.query.user_id ? req.query.user_id : false;
    let trades = false;
    if (user_id && type) {
      trades = await Trades.findAll({
        where: {
          user_id: user_id,
          type: type,
        },
      });
    } else if (type && !user_id) {
      trades = await Trades.findAll({
        where: {
          type: type,
        },
      });
    } else if (!type && user_id) {
      trades = await Trades.findAll({
        where: {
          user_id: user_id,
        },
      });
    } else {
      trades = await Trades.findAll({});
    }

    if (trades) {
      res.send(trades);
    }
  } catch (error) {
    console.log(error.message);
  }
};

// GET /trades:id
const getTradeById = async (req, res, next) => {
  try {
    let trade = await Trades.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (trade) {
      res.send(trade);
    } else {
      res.status(404).send("ID not found");
    }
  } catch (error) {
    console.log(error.message);
  }
};

// POST
const createTrade = async (req, res, next) => {
  try {
    const tradeObject = {
      type: req.query.type,
      user_id: Number(req.query.user_id),
      symbol: req.query.symbol,
      shares: Number(req.query.shares),
      price: Number(req.query.price),
      timestamp: Number(req.query.timestamp),
    };
    let newTrade = await Trades.create(tradeObject);
    res.status(201).send(newTrade);
  } catch (error) {
    console.log(error.message);
  }
};

// DELETE, PUT, AND PATCH
const handle405 = (req, res) => {
  res.status(405).send();
};

module.exports = {
  getAllTrades,
  getTradeById,
  createTrade,
  handle405,
};
