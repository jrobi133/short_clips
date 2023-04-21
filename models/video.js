const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class Video extends Model {}

Video.init(
  {
    writer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "thumbnail",
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

console.log("Video model loaded successfully");
module.exports = Video;
