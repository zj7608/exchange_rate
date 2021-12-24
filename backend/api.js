const express = require("express");
var dbModel = require("./DbClass");
const api = express.Router();
const upDate = require("./UpDateClass");
var upcurr = new upDate();
const schedule = require("node-schedule");
var dbmodel = new dbModel();

async function check() {
  var check = await dbmodel.checkTable();
  console.log("准备修改汇率");
  var addEth = await dbmodel.addEth();
  console.log("准备修改ETH");
  if (check === 0 && addEth === 0) {
    async function changeDate() {
      var cur = await upcurr.upCurr();
      console.log("数据修改成功");
      var eth = await upcurr.upEth();
      console.log("ETH修改成功");
    }
    changeDate();
  }
  const scheduleCronstyle = () => {
    schedule.scheduleJob("1 1 * * * *", () => {
      async function changeDate() {
        var cur = await upcurr.upCurr();
        console.log("定时数据修改成功");
        var eth = await upcurr.upEth();
        console.log("定时ETH修改成功");
      }
      changeDate();
    });
  };
  scheduleCronstyle();
}
check();
module.exports = api;
