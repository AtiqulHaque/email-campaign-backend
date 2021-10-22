module.exports = {
  HOST: "rds-campaign.ccwrcwjkxjrb.ap-southeast-1.rds.amazonaws.com",
  USER: "campaignadmin",
  PASSWORD: "123qweqaz",
  DB: "metigy-campaign",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
