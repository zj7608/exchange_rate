//导入express包
const express = require("express");
const app = express();
const api = require("./api");
var dbModel = require("./DbClass");
app.use(express.json());
app.use(express.static("./src/index.html")); //设置默认访问页
app.use(api);

app.all("*", function (req, res, next) {
  //允许跨域
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length,Authorization,Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", "3.2.1");
  if (req.method == "OPTIONS") res.send(200);
  else next();
});

//进行循环次查询
//汇率默认基本货币为欧元
//进行对以太坊的计算 以太坊的基本货币为美元
app.post("/api", async (req, res) => {
  let data = req.body;
  let model = new dbModel();
  let succ = await model.curr(data);
  res.send(succ);
});

app.listen(8080, () => {
  console.log("127.0.0.1:8080");
});
