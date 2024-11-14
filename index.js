const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "belaeat1610",
  connectionLimit: 5,
});

app.get("/test", async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      `SELECT event_name form db.golf_table where event_id='1'`
    );
    console.log(rows);
    const jsonS = JSON.stringify(rows);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(jsonS);
  } catch (e) {}
});

http.createServer(app).listen(1337, () => {
  console.log("Express server started 1337");
});
