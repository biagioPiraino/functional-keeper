const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
 
module.exports = recordRoutes;

recordRoutes.route("/main").get(function (req, res) {
   let db_connect = dbo.getDb("sample_tracker");

   let currentDate, startDate, days, week;
   currentDate = new Date();
   startDate = new Date(currentDate.getFullYear(), 0, 1);
   days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
   week = Math.floor(days / 7);

   const query = { 'week' : week, 'year' : currentDate.getFullYear() };

   db_connect
     .collection("todoTracker")
     .find(query)
     .toArray(function (err, result) {
       if (err) throw err;
       res.json(result);
     });
  });