'use strict';
module.exports = (sequelize, DataTypes) => {
  const job = sequelize.define('job', {
    jobTitle: DataTypes.STRING,
    company: DataTypes.STRING,
    location: DataTypes.STRING,
    url: DataTypes.STRING,
    postingDate: DataTypes.DATE,
    jobDescription: DataTypes.STRING,
    state: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  job.associate = function(models) {
    // associations can be defined here
    models.job.belongsTo(models.user);
  };
  return job;
};