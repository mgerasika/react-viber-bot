/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
export const expressApp = express();
require("module-alias/register");
require("dotenv").config();
import bodyParser from "body-parser";
const moduleAlias = require('module-alias');
const path = require('path');
moduleAlias.addAlias('@src', path.resolve(__dirname, '../..') + '../../dist/web-app/src');

import { App } from "./viber-page/app.component";
import { ENV } from "./env.constant";
import { API_URLS } from "./constants/api-urls.constant";
import { createExpressCallback } from "react-viber";

expressApp.use(bodyParser.json()); // to support JSON-encoded bodies
expressApp.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
expressApp.use(express.json());
expressApp.use(express.urlencoded());

expressApp.get('/', (req:any, res:any) => {
	res.send(Object.values(API_URLS).join(", ") + " viberHook = " + ENV.VIBER_WEB_HOOK + ' proxyHook=' + ENV.PROXY_WEB_HOOK);
});

const expressCallback = createExpressCallback(<App />);
	expressApp.post(API_URLS.proxy_web_hook, expressCallback);

