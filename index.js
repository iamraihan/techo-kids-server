const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());
