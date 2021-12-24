const request = require("request");
const dbModel = require("./DbClass");
var dbmodel = new dbModel();

class upDate {
  constructor() {}

  async upCurr() {
    const currApi =
      "http://data.fixer.io/api/latest?access_key=125b8e9f347400f271081b7bc9b92fa0";
    var curUpDate = request(currApi, async function (err, res, body) {
      if (!err && res.statusCode == 200) {
        var res = eval("(" + body + ")");
        var api = res["rates"];
        try {
          var succ = await dbmodel.cod(api);
          return succ;
        } catch (err) {
          return err;
        }
      }
    });
    return curUpDate;
  }

  async upEth() {
    const ethApi =
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD";
    var ethUpDate = request(ethApi, async function (err, res, body) {
      if (!err && res.statusCode == 200) {
        var res = eval("(" + body + ")");
        var eth = res["USD"];
        try {
          var succ = await dbmodel.upEth(eth);
          return succ;
        } catch (err) {
          return err;
        }
      }
    });
    return ethUpDate;
  }
}

module.exports = upDate;
