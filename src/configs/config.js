const dotenv = require("dotenv");
const fs = require("fs");
const convertToCamelCase = require("../utils/toCamelCase");

class Config {
  constructor() {
    this.variables = {};
  }

  configure() {
    dotenv.config();
    for (const key in process.env) {
      const camelCaseKey = convertToCamelCase(key);
      this.variables[camelCaseKey] = process.env[key];
    }
  }

  getVariable(key) {
    return this.variables[key];
  }
}

module.exports = new Config();
