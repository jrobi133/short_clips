// create a model for the video table using sequelize
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class Video extends Model {}

Video.init(
  {
    writer: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    // writer: {
    //   type: DataTypes.File,
    //   ref: "User",
    // },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // privacy: {
    //   type: Number,
    // },
    // filePath: {
    //   type: String,
    // },
    // catogory: String,
    // views: {
    //   type: Number,
    //   default: 0,
    // },
    // duration: {
    //   type: String,
    // },
    // thumbnail: {
    //   type: String,
    // },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "video",
  }
);

module.exports = Video;
