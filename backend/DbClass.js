const request = require("request");
const tableName = "currency";
const sqlDate = require("./SqlClass");
var sql = new sqlDate();
//定义一个叫ExModel的类
class dbModel {
  //定义构造函数
  constructor() {}
  //计算汇率的方法
  async curr(data) {
    //获取data数组中的金额
    let amount = data["to_num"];
    var arr = [data["to_curr"], data["form_curr"], "USD", "ETH"];
    var a = [];
    var fieldName = "to_curr";
    for (let i in arr) {
      //通过async访问sql.class中的Find方法来执行sql语句查询数据
      async function selcurr() {
        try {
          var curr = await sql.Find(tableName, fieldName, arr[i]);
          return curr;
        } catch (err) {
          return err;
        }
      }
      var curr = await selcurr();
      //把curr中的currency循环添加到a数组中
      a.push(curr[0].currency);
    }
    if (a.length === arr.length) {
      var form_num = (amount / a[0]) * a[1];
      //ETH = ((amount/B1.exchangeRate)*USD.exchangeRate)/ETH.exchangeRate
      var eth = ((amount / a[0]) * a[2]) / a[3];
      var succ = JSON.stringify({ form_num: form_num, eth: eth });
      return succ;
    }
  }

  async checkTable(currApi) {
    this.currApi = currApi;
    //通过async访问sql.class中的showTable方法来执行sql语句 查询表是否存在
    async function selTable() {
      var show = await sql.showTable(tableName);
      return show;
    }
    var show = await selTable();
    //console.log(show);
    var table = show[0];
    if (!table) {
    }
    // 通过同步的方式取出api中的汇率数据
    async function apiDate() {
      const currApi =
        "http://data.fixer.io/api/latest?access_key=125b8e9f347400f271081b7bc9b92fa0";
      return new Promise(function curDate(resolve, reject) {
        request(currApi, function (err, res, body) {
          if (!err && res.statusCode == 200) {
            resolve(body);
          } else {
            reject(err);
          }
        });
      });
      var curDate = await curDate();
      return curDate;
    }
    var body = await apiDate();
    var res = eval("(" + body + ")");
    var api = res["rates"];
    //通过async访问sql.class中的createTable方法来执行sql语句 创建currency表
    if (!table) {
      async function creTable() {
        try {
          var craTable = await sql.createTable(tableName);
          return craTable;
        } catch (err) {
          return "创建表出错了";
        }
      }
      var table = await creTable();
    } else {
      return 0;
    }
    //查询表中是否有数据
    async function selDate() {
      var field = "to_curr";
      var to_curr = "ZWL";
      return (cur = await sql.Find(tableName, field, to_curr));
    }
    var cur = await selDate();

    if (cur.length === 0) {
      var feds = "form,to_curr,currency";
      for (let i in api) {
        var val = "'EUR','" + i + "','" + api[i] + "'";
        //通过async访问sql.class中的Add方法来执行sql语句 循环添加汇率数据
        async function insTable() {
          try {
            var iDate = await sql.Add(tableName, feds, val);
            return iDate;
          } catch (err) {
            return "添加汇率出错了";
          }
        }
        insTable();
      }
      return "汇率添加成功";
    } else {
      return "汇率已存在";
    }
  }

  async addEth(ethApi) {
    this.ethApi = ethApi;
    var field = "form";
    var condition = "ETH";
    //通过async访问sql.class中的Find方法来执行sql语句 查询是否有数据
    async function ETH() {
      var ethFiedl = await sql.Find(tableName, field, condition);
      return ethFiedl;
    }
    var selEth = await ETH();

    // 通过同步的方式取出api中的eth数据
    async function ethDate() {
      const ethApi =
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD";
      return new Promise(function ethDate(resolve, reject) {
        request(ethApi, function (err, res, body) {
          if (!err && res.statusCode == 200) {
            resolve(body);
          } else {
            reject(err);
          }
        });
      });
      var ethDate = await ethDate();
      return ethDate;
    }
    var body = await ethDate();
    var res = eval("(" + body + ")");
    var eth = res["USD"];
    var feds = "form,to_curr,currency";
    var val = "'ETH','ETH','" + eth + "'";
    //return selEth;
    if (selEth.length === 0) {
      //通过async访问sql.class中的Add方法来执行sql语句 添加ETH
      async function addETH() {
        try {
          var add = await sql.Add(tableName, feds, val);
          return add;
        } catch (err) {
          return "eth添加出现问题";
        }
      }
      var ethAdd = await addETH();
      return "ETH添加成功";
    } else {
      return 0;
    }
  }

  async cod(api) {
    this.api = api;
    var field1 = "currency";
    var fieldName = "to_curr";
    for (let i in api) {
      //通过async访问sql.class中的putCurr方法来执行sql语句 更新汇率
      async function upCurr() {
        try {
          var res = await sql.Put(tableName, field1, api[i], fieldName, i);
          //console.log(res);
          return res;
        } catch (err) {
          return "修改汇率出现问题";
        }
      }
      upCurr();
    }
    return "汇率更新成功";
  }

  async upEth(eth) {
    this.eth = eth;
    var field1 = "currency";
    var fieldName = "to_curr";
    var field2Val = "ETH";
    //通过async访问sql.class中的putETH方法来执行sql语句 更新ETH
    async function upETH() {
      try {
        var res = await sql.Put(tableName, field1, eth, fieldName, field2Val);
        return res;
      } catch (err) {
        return "更新ETH失败";
      }
    }
    upETH();
    return "ETH修改成功";
  }
}

module.exports = dbModel;
