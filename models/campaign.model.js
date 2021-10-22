module.exports = (sequelize, Sequelize) => {
  const Campaign = sequelize.define(
    "campaigns",
    {
      campaigns_name: {
        type: Sequelize.STRING,
      },
      email_subject: {
        type: Sequelize.STRING,
      },
      email_body: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      unique_identifier: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
        allowNull: false,
      },
      update_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      schedule_time: {
        type: Sequelize.DATE,
      },
      total_contacts: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );

  return Campaign;
};
