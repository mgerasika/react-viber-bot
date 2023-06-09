/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
const http = require("http");
const expressApp = express();

import "module-alias/register";
import bodyParser from "body-parser";
// import "module-alias/register";
const moduleAlias = require('module-alias');
const path = require('path');
//
// Register alias
//
moduleAlias.addAlias('@viber-common', path.resolve(__dirname, '../..') + '/viber-common/src');
moduleAlias.addAlias('@src', path.resolve(__dirname, '../..') + '../../dist/web-app/src');

import { createExpressCallback } from '../../viber-common/src/express-callback';
import { App } from "./viber-page/app.component";


expressApp.use(bodyParser.json()); // to support JSON-encoded bodies
expressApp.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
expressApp.use(express.json());
expressApp.use(express.urlencoded());
// app.use(express.multipart());

const expressCallback = createExpressCallback(<App />);
expressApp.post("/web_hook", expressCallback);

const PORT = process.env.PORT || 3009;
console.log('env', expressApp.get("env"));

const httpServer = http.createServer(expressApp);

httpServer.listen(PORT, () => {
  console.log(`Example http app listening on port ${PORT}`);
});


