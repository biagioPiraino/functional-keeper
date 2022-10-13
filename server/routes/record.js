const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
 
module.exports = recordRoutes;

recordRoutes.route("/main").get(function (req, res) {
  let db_connect = dbo.getDb("sample_tracker");
  const currentDateTime = retrieveCurrentDateTimeInfo();

  const query = { 
  'week' : currentDateTime.week, 
  'year' : currentDateTime.year };

  db_connect
    .collection("todoTracker")
    .find(query)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
  });
});

recordRoutes.route("/add").post(function (req, response) {
  let db_connect = dbo.getDb("sample_tracker");
  const currentDateTime = retrieveCurrentDateTimeInfo();

  let objectToAdd = {
    description: req.body.description,
    done: false,
    week: currentDateTime.week,
    year: currentDateTime.year,
    dayOfWeek: currentDateTime.dayOfWeek
  };

  db_connect.collection("todoTracker").insertOne(objectToAdd, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

function retrieveCurrentDateTimeInfo(){
  let currentDate, startDate, days, currentWeek;
  currentDate = new Date();
  startDate = new Date(currentDate.getFullYear(), 0, 1);
  days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
  currentWeek = Math.ceil(days / 7);

  const objToReturn = {
    date: currentDate,
    week: currentWeek,
    dayOfWeek: currentDate.getDay(),
    year: currentDate.getFullYear()
  };

  return objToReturn;
}