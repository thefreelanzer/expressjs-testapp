module.exports = (sequelize, Sequelize) => {
  const Sports = sequelize.define("sports", {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.STRING,
    },
  });

  return Sports;
};
