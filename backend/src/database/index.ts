import { Sequelize } from "sequelize";

const db = new Sequelize("culquiDB", "postgres", "Joseph0694!", {
    host: "serverless-pc.clsaek3ywo9f.us-east-1.rds.amazonaws.com",
    dialect: "postgres",
    port: 5432,
    ssl: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        },

    }
})
export default db;