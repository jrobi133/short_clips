const db = require("../models");

const { signToken } = require("../utils/auth");

// Defining methods for the usersController
module.exports = {
  findAll: function (req, res) {
    db.User.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.User.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  create: async function (req, res) {
    let row = await db.User.create(req.body, { raw: true, plain: true }).catch(
      (err) => {
        console.log("failed to create", req.body, err, err.stack, err.message);
        return null;
      }
    );

    let { id, email, username, password } = row?.dataValues || row || {};
    if (!id) {
      return res.status(422).json(err);
    }

    //  with the removeSensitiveData function we remove the password from the token
    const token = signToken({ id, email, username, password });
    return res.status(200).json({ id, email, username, token });
  },

  login: async function (req, res) {
    let row = await db.User.findOne({
      where: {
        email: req.body.email,
      },
    }).catch((err) => {
      console.log("failed to create", req.body, err, err.stack, err.message);
      return null;
    });

    let { id, email, username, password } = row?.dataValues || row || {};
    if (!id) {
      return res.status(422).json(err);
    }

    //  with the removeSensitiveData function we remove the password from the token
    const token = signToken({ id, email, username, password });
    return res.status(200).json({ id, email, username, token });
  },

  update: function (req, res) {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
