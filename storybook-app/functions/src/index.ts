/* eslint-disable @typescript-eslint/no-var-requires */
import "module-alias/register";
const functions = require("firebase-functions");
import * as admin from "firebase-admin";
import { expressApp } from "../../src/express-app";
import { LINKS } from "@src/constants/links.constant";

admin.initializeApp();

expressApp.get("/echo", (req, res) => {
  functions.logger.log('/API_URL ');
  res.send("API_URL = " + JSON.stringify(LINKS, null, 2));
});
// Define your Express routes here
export const app = functions.https.onRequest(expressApp);
