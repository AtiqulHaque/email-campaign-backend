module.exports = {
  HOST: "beta-metigey.cpw4x2qhelvv.ap-south-1.rds.amazonaws.com",
  USER: "betametigy",
  PASSWORD: "betametigy123",
  DB: "metigy-campaign",
  PORT: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
