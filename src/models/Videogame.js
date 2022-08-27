const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('videogame', {
    fakeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    id:{
      type: DataTypes.VIRTUAL,
      get(){
        return "db-"+this.fakeId;
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    released: {
      type: DataTypes.STRING,
      isDate: true
    },
    rating: {
      type: DataTypes.FLOAT,
      max: 5,
      min: 0
    }, 
    platforms: {
      type: DataTypes.STRING,
      allowNull: false
    },
    background_image: {
      type: DataTypes.STRING,
      defaultValue: "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2019/09/Xbox-360-PS-3.jpg"
    }
  },{
    timestamps: false,
  });
};