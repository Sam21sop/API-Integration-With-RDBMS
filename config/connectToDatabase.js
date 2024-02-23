import { Sequelize, DataTypes } from "sequelize";



const connectToDB = async () => {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: `./db.sqlite`
    });

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    sequelize.define('User', {
        name: {
          type: DataTypes.STRING,
          defaultValue: "Sopan Bhere"
        },
        address:{
            type: DataTypes.NUMBER,
        }
      });
};

// export default connectToDB;