import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Language = sequelize.define(
    "language",{
             id:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
         },
            name:{
            type: DataTypes.STRING,
            allowNull: false,
        
         },
            
          paradigm:{
            type: DataTypes.STRING,
            allowNull: false,

         }, release_year:{
            type: DataTypes.INTEGER,
            allowNull: false,   
        }
        }
)   
export default Language