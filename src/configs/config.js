const dotenv = require("dotenv");
const fs = require("fs");
const convertToCamelCase = require("../utils/toCamelCase");

class Config {
  constructor() {
    this.variables = {};
  }

  configure() {
    const envFile = fs.readFileSync(".env");
    const envConfig = dotenv.parse(envFile);
    for (const key in envConfig) {
      const camelCaseKey = convertToCamelCase(key);
      this.variables[camelCaseKey] = envConfig[key];
    }
  }

  getVariable(key) {
    return this.variables[key];
  }
}

module.exports = new Config();
