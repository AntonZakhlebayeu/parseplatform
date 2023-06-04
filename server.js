const app = require("./app");
const config = require("./src/configs/config");

const port = config.getVariable("port");

app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});
