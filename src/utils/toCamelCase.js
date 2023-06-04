function convertToCamelCase(value) {
  return value
    .toLowerCase()
    .replace(/_(\w)/g, (_, letter) => letter.toUpperCase());
}

module.exports = convertToCamelCase;
