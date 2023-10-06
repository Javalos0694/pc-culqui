import { DataTypes } from 'sequelize'
import db from '../database'

const Card = db.define('card', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    card_number: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    cvv: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    expiration_month: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiration_year: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.TIME,
        field:'createdat',
        allowNull: false,
        defaultValue: db.literal("CURRENT_TIMESTAMP")
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isDeleted: {
        field:'isdeleted',
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    timestamps: false
})


export default Card;