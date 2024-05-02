var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const User = require('./models/User');
var indexRouter = require('./routes/index');
const sequelize = require('./db');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

async function setup() {
  const subu = await User.create({ firstname: "Subu", lastname: "Kandaswamy", email: "subu@gmail.com" });
  const sreehari = await User.create({ firstname: "Sreehari", lastname: "Guruprasad", email: "SG@gmail.com" });
  const dheeraj = await User.create({ firstname: "Dheeraj", lastname: "Vurukuti", email: "DV@gmail.com" })
}

sequelize.sync({force: true}).then(()=>{
  console.log("Sequelize Sync Completed...");
  setup().then(()=> console.log("User setup complete"))
})

module.exports = app;
