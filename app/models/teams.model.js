module.exports = (sequelize, Sequelize) => {
  const Teams = sequelize.define("teams", {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    is_active: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Teams;
};
