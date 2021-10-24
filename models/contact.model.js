module.exports = (sequelize, Sequelize) => {
  const Contact = sequelize.define(
    "contacts",
    {
      contact_id: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      send_at: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      campaign_indentifier: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return Contact;
};
