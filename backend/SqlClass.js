const db = require("./dbconfig");

class sqlDate {
  constructor() {}

  async showTable(tableName) {
    //查询表是否存在
    this.tableName = tableName;
    try {
      var data = await db.query("SHOW TABLES LIKE '%" + tableName + "%'");
      return data;
    } catch (err) {
      return "查询表语句出错=>", err;
    }
  }

  async createTable(tableName) {
    //创建一个currency表
    this.tableName = tableName;
    try {
      var data = await db.query(
        "CREATE TABLE " +
          tableName +
          " (id int(11) primary key not null auto_increment,form varchar(5) not null ,to_curr varchar(5) not null ,currency varchar(20) not null)"
      );
      return data;
    } catch (err) {
      return "创建表出错=>", err;
    }
  }

  async Add(tableName, feds, val) {
    //向currency表里添加汇率
    this.tableName = tableName;
    this.feds = feds;
    this.val = val;
    try {
      var data = await db.query(
        "INSERT INTO " + tableName + "( " + feds + ") VALUES ( " + val + " )"
      );
      return data;
    } catch (err) {
      return "添加数据出错=>", err;
    }
  }

  async Find(tableName, fieldName, cond) {
    //查询
    this.tableName = tableName;
    this.fieldName = fieldName;
    this.cond = cond;
    try {
      var data = await db.query(
        "SELECT * FROM " +
          tableName +
          " WHERE " +
          fieldName +
          " = '" +
          cond +
          "'"
      );
      return data;
    } catch (err) {
      return "查询语句出错=>", err;
    }
  }

  async Put(tableName, field1, val1, field2, val2) {
    //更新汇率
    this.tableName = tableName;
    this.field1 = field1;
    this.val1 = val1;
    this.fieldName = field2;
    this.val2 = val2;
    try {
      var data = await db.query(
        "UPDATE " +
          tableName +
          " SET " +
          field1 +
          " = '" +
          val1 +
          "' WHERE " +
          field2 +
          " = '" +
          val2 +
          "'"
      );
      return data;
    } catch (err) {
      return "修改语句出错=>", err;
    }
  }
}

module.exports = sqlDate;
