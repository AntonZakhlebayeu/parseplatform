function getMongoConnectionString(username, password, host, port, dbName) {
  return `mongodb://${username}:${password}@${host}:${port}/${dbName}`;
}

module.exports = getMongoConnectionString;
