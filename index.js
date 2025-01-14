const express = require("express");
const exphbs = require("express-handlebars");
const conn = require("./db/conn");

const Task = require('./models/Task')

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

const tasksRoutes = require('./routes/tasksRouter')

app.use(express.static("public"));

app.use(
    express.urlencoded({
      extended: true,
    })
  );
  
app.use(express.json());

app.use('/tasks', tasksRoutes)

conn.sync().then(() => {
    app.listen(3000);
  });
