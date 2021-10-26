module.exports = {
  apps: [
    {
      name: "app",
      script: "./app.js",
      env: {
        NODE_ENV: "development",
      },
      env_test: {
        NODE_ENV: "test",
      },
      env_staging: {
        NODE_ENV: "staging",
      },
      env_production: {
        NODE_ENV: "production",
        DB_HOS: "beta-metigey.cpw4x2qhelvv.ap-south-1.rds.amazonaws.com",
        DB_USER: "betametigy",
        DB_PASSWORD: "betametigy123",
        DB_NAME: "metigy-campaign",
        DB_PORT: 3306,
      },
    },
  ],
};
