/* eslint-disable @typescript-eslint/no-var-requires */
const http = require("http");
import "module-alias/register";
import { expressApp } from './express-app';

const PORT = process.env.PORT || 3009;
console.log('env', expressApp.get("env"));

const httpServer = http.createServer(expressApp);

httpServer.listen(PORT, () => {
  console.log(`Example http app listening on port ${PORT}`);
});


